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
* The `PostUp` and `PostDown` lines provide commands that wireguard should run on starting and stopping. These lines add rules for routing all traffic received through the wg0 interface to the internet.
* The `Address` line assigns the server an IP (192.168.2.1) in the virtual network we are creating.

That's it for the server configuration. Now it's just time to start Wireguard using `wg-quick up wg0`. If you want to shut down Wireguard later, just run `wg-quick down wg0`.

Now just copy the public key you generated earlier, ready for the next bit...

### The Client

