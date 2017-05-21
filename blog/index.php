<!DOCTYPE html>
<html lang="en">

    <head>
        <title>I make stuff</title>

        <!-- Meta tags -->
        <meta charset="UTF-8">
        <meta name="description" content="Ricool's dev blog I guess.">
        <meta name="author" content="Ricool">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Links -->
        <link href="https://fonts.googleapis.com/css?family=Roboto|Slabo+27px" rel="stylesheet">
        <link rel="stylesheet" href="/css/main.css">
        <link rel="icon" type="image/svg" href="img/liontraceroar.svg">

        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />

    </head>

    <body>
        <!-- Hero Banner -->
        <section class="hero is-fullheight is-primary is-bold">

            <!-- Mobile nav menu icon (burger menu) -->
            <div class="hero-head">
                <nav class="nav nav-right is-hidden-tablet">
                    <span id="nav-toggle" class="nav-toggle"><!--Add the is-active class to toggle the menu "icon" between an x and a burger -->
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>

                    <!--<div class="nav-right nav-menu is-active">
                        <a class="nav-item is-tab is-hidden-tablet is-active">Blog</a>
                        <a class="nav-item is-tab is-hidden-tablet">Projects</a>
                    </div>-->
                </nav>
            </div>

            <!-- Side menu -->
            <aside id="side-menu" class="menu is-hidden-tablet">
                <ul class="menu-list">
                    <li><a class="nav-menu-item subtitle is-3" href="/blog">Blog</a></li>
                    <li><a class="nav-menu-item subtitle is-3" href="/projects">Projects</a></li>
                    <li><a class="nav-menu-item subtitle is-3" href="/login">Login</a></li>
                </ul>
            </aside>

            <!-- Main hero image and title content -->
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="circle">
                        <figure class="image is-square">
                            <img src="/img/liontraceroar.svg">
                        </figure>
                    </div>
                    <hr>
                    <h1 class="title is-1">Ricool</h1>
                    <h5 class="subtitle is-5">Programmer, student, and probably drinking tea.</h5>
                </div>
            </div>

            <!-- Desktop & tablet nav bar at bottom -->
            <div class="hero-foot is-hidden-mobile">
                <nav class="nav-menu">
                    <div class="container">
                        <div class="nav-center">
                            <div class="nav-item">
                                <a class="nav-item is-tab is-active" href="/blog">Blog</a>
                                <a class="nav-item is-tab" href="/projects">Projects</a>
                                <a class="nav-item is-tab" href="/login">Login</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </section>
		<!-- Scripts -->
		<script src="js/ui.js"></script>
    </body>

</html>
