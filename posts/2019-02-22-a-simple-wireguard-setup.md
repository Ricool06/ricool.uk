---
path: "/a-simple-wireguard-setup"
date: "2019-02-22"
title: "A Simple Wireguard Setup"
---
I've got a long train journey to make today. As much as Britain's train companies are reputed for their reliability, outstanding customer service, and consumer-focused attitudes (🙃), there's little that would lead me to believe that their public WiFi is even half as trustworthy.

The de-facto solution to protecting your privacy on an unsecured network is to use a VPN. Most VPN protocols have their flaws, and since the Snowden docs (as well as plenty of IT security professionals) began claiming that OpenVPN is the way to go, it seemed the only option if you wanted to be sure of your privacy. OpenVPN isn't perfect, however, and is often noted as difficult to set up and use. "A little more time to set up, a lot more security. Is that so bad?" I hear you say. Well no, as long as you're dead sure you've configured it correctly. Because failing to do so means you've lost the security you'd hoped for in the first place. Ease of use _is a security concern in itself_.

In recent times, however, a new contender has reached the heights of internet privacy vogue: Wireguard. Wireguard claims to be ["the most secure, easiest to use, and simplest VPN solution in the industry"](https://www.wireguard.com). At the moment, Wireguard is under heavy development, hasn't gone through as many rigorous security audits, and is certainly not as battle-tested as OpenVPN. Regardless, the initial impression from the open source community is good. It has been praised for its principles of simplicity to limit attack surface, and the rejection of [cryptographic agility](https://en.wikipedia.org/wiki/Crypto_agility).

With boundless optimism, fuelled in part by the dreadful prospect of having to [set up OpenVPN again](https://github.com/Ricool06/deploy-dev-environment), I set off on my Wireguard adventure.

## The Setup
Make sure you have a remote server that you have SSH access to. This blog won't be covering that.

### The Server
The first step was to install Wireguard. On Ubuntu, this means adding a 3rd party apt repo.

```
sudo add-apt-repository ppa:wireguard/wireguard
sudo apt update
sudo apt install wireguard
```

This not only installs all the binaries used to configure and run Wireguard, but also builds and installs a kernel module that allows you to create network interfaces that work with Wireguard. A bit more on how this works later.

Run `wg --help` just to make sure it has been installed.

The next step is to create the private key that will be stored only on the server, and then derive a public key from the private key. The public key will be used by the client (my laptop in this case) to encrypt data before sending it off to the server where it is decrypted by the server's private key. Simple.

In your terminal:
```
wg genkey | tee /path/to/new/privatekeyfile | wg pubkey > /path/to/new/publickeyfile
```

If you haven't used much of the command line in Linux before, I'll go through what that line does:
* `wg genkey` generates (you guessed it) a private key, and chucks the output into `stdout`.
* `|` is just a Unix pipe. Just like real pipes, it has an input, and an output. The output of the command before the pipe is the input to the command after.
* `tee` is a utility for splitting input into two outputs. In this case, the private key gets written to the file `/path/to/new/privatekeyfile` and then piped to the next command.
* Finally, `wg pubkey > /path/to/new/publickeyfile` takes the private key piped to it from `stdout` and derives a public key from it, which is then written to the file `/path/to/new/publickeyfile`.

Now we have a private key and a public key, it's time to configure the server. First, get the name of the network interface all of your server's internet traffic currently goes through by running `nmcli status` and looking at the green lines that have the "connected" state.

```
DEVICE       TYPE       STATE        CONNECTION
eth0         ethernet   connected    Wired connection 2
docker0      bridge     connected    docker0
wlp3s0       wifi       unavailable  --
lo           loopback   unmanaged    --
```

If your server is connected to the internet through a wired connection, it will often be called something like `etho0` or `ens3` or `enps29u1u2` or something along those lines. If it is connected wirelessly,

Create a file called `wg0.conf` in `/etc/wireguard/` and throw in the following, making sure to replace the placeholders with your specific info. _Note:_ the name of this config file is important, as Wireguard will create a network interface with the same name!

```
[Interface]
PrivateKey = <insert the contents of your private key file here>
ListenPort = 51820
PostUp   = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -A FORWARD -o wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o <insert the interface you found earlier> -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -D FORWARD -o wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o <insert the interface you found earlier> -j MASQUERADE
Address = 192.168.2.1/24
```

* The `ListenPort` line states the port that Wireguard should listen for connections on.
* The `PostUp` and `PostDown` lines provide commands that Wireguard should run on starting and stopping. These lines add rules for routing all traffic received through the wg0 interface to the internet.
* The `Address` line assigns the server an IP (192.168.2.1) in the virtual network we are creating.

That's it for the server configuration. Now it's just time to start Wireguard using `wg-quick up wg0`. If you want to shut down Wireguard later, just run `wg-quick down wg0`.

Now just copy the public key you generated earlier, ready for the next bit...

### The Client
To set up your client machine, install Wireguard as shown previously, then run the command to generate a public and private key pair again:
```
wg genkey | tee /path/to/new/privatekeyfile | wg pubkey > /path/to/new/publickeyfile
```

Create a file `/etc/wireguard/wg0client.conf` with the following contents:
```
[Interface]
PrivateKey = <insert the client's private key>
Address = 192.168.2.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = <insert the server's public key>
Endpoint = <insert the server's public address (not the one you set earlier)>:51820
AllowedIPs = 0.0.0.0/0
```

Much of what we saw in the server config is replicated here, with a few exceptions:
* The `DNS` setting ensures DNS works suing Google's DNS server. Not sure why but my client wouldn't work without it. Remove and see what happens for you if you're curious.
* The `Endpoint` setting specifies the IP address/hostname of the server. This must be the internet-accessible, public address. This is not the virtual network address we set earlier in the server config.
* The `AllowedIPs` setting uses the IPv4 wildcard to capture connection attempts to any IP address and route them through the Wireguard interface.

The client is configured. Easy peasy.
One more thing to do. Wireguard is a peer-to-peer VPN, so the "server" we created needs to know some info about the client too, namely, its public key and virtual network address. This is so that the server knows it should allow connections from your client, and so it knows how to encrypt data that your client wishes to receive through the VPN.

### Back to the Server!
Stop the disconnect Wireguard if it's currently running with `wg-quick down wg0`. Edit the `/etc/wireguard/wg0.conf` file created earlier to include the following lines:
```
[Peer]
PublicKey = <client's public key>
AllowedIPs = 192.168.2.2/24
```

Reconnect Wireguard again with `wg-quick up wg0`.

### Start the client
Run `wg-quick up wg0client` then see if you can browse the web. If your configuration matches mine, barring any other issues, you should have a VPN. You should not be experiencing DNS leaks either, but you can always test it [here](www.dnsleak.com).

### Review
Wireguard is monumentally easier to set up. The need for the server to know about clients before connection is a bit inconvenient if you want to write some repeatable scripts using Ansible or Docker to set up a VPN, but I've seen some examples online that apparently don't need a premade `[Peers]` section in the server config so this is probably an artefact of creating all this the night before my train journey.

Anyway, I hope this was a helpful post, and helps you stay safe on public WiFi networks.
