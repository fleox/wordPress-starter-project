# Wordpress base project with dev tools : composer, cli, twig, docker ...

This project provides a solid foundation for developers to create a WordPress website. It includes:

- Docker configuration with PHP-FPM 8.2, NGINX, MariaDB
- Installation and updating of WordPress, plugins, and dependencies via Composer.
- MVC pattern with TWIG template engine.
- CLI tool that allows you to interact with WordPress via the command line

## Getting Started

First copy .env.exemple and rename it to .env

``` bash
docker compose build
docker compose up -d
```
Go to [http://localhost:8082/](http://localhost:8082/)

## Composer with Bedrock

<p align="center">
  <a href="https://roots.io/bedrock/">
    <img alt="Bedrock" src="https://cdn.roots.io/app/uploads/logo-bedrock.svg" height="100">
  </a>
</p>

Bedrock is an open source project for WordPress boilerplate with Composer, easier configuration, and an improved folder structure

The Bedrock structure provides more flexibility in the use of WordPress and its configuration across multiple environments.

The web directory will serve as the root for our web server. This allows placing "critical" files one level above the web root and avoids exposing dependencies and sensitive files.

The web/wp directory will contain the core of WordPress and is automatically generated from Composer. This allows better control over the WordPress version and the ability to apply constraints on the versions supported by the project.

The config directory will contain the configuration of our WordPress with the possibility to change the configuration depending on the environment used.

The .env file allows configuring the project in the absence of environment variables (this is where we will put the configuration of our database, for example).

Work on themes and plugins will be done in the web/app/themes, web/app/mu-plugins, and web/app/plugins directories.

```
site/
├── .env
├── config/
│   ├── environments/
│   │   ├── development.php
│   │   ├── staging.php
│   │   └── production.php
│   └── application.php   # Primary wp-config.php
├── vendor/               # Composer dependencies
└── web/                  # Virtual host document root
    ├── app/              # WordPress content directory
    │   ├── mu-plugins/
    │   ├── plugins/
    │   ├── themes/
    │   └── uploads/
    └── wp/               # WordPress core
```

You can add any dependency with composer:
``` bash
#exemple for symfony-var-dumper
composer require --dev symfony-var-dumper
```
you can now dd('what_you_want') inside your php code.

An additional repository is also automatically added to your composer.json file, allowing you to manage your plugins as dependencies for your project. To install a wordpress plugin, simply search for it on [Wpackagist](https://wpackagist.org/) and install it just as you would for a regular dependency :

``` bash
#exemple with wp-migrate-db
composer require wpackagist-plugin/wp-migrate-db
```
## Use Twig for templating with Timber
[Timber](https://timber.github.io/docs/v2/) is a library/plugin that allows you to design your themes using the Twig template engine.

With Timber, you write your HTML with the Twig Template Engine. This cleans up your theme code. Your PHP file can focus on providing the data or logic and your Twig files can focus 100% on the HTML and display.

In the web>app>themes directory, you will find "starter-theme-2.x," which is a Timber starter kit.

You can activate it in the WordPress admin and play around with it.

## wp-cli
WP-CLI is a tool that allows you to interact with WordPress via the command line and perform a set of operations without leaving your terminal (as well as automate certain operations, for example, during deployment).

See the [listing of all currently available WP-CLI commands](https://developer.wordpress.org/cli/commands/).

``` bash
# use wp-cli in project :
docker compose exec app_worpress bash 
php wp-cli.phar --info
```

## Webpack Encore
Webpack Encore allows using Webpack while abstracting its configuration layer, making it "simpler" to use for a PHP developer. For example, it's very easy to set up configurations to use Sass, Babel, and even PurgeCss.

In you theme, you must have following structure:

```
themes/
├── your_theme/
│   ├── assets/
│   │   ├── js
│   │   ├── scss
```
``` bash
# To compile CSS and JS files :
docker compose exec node bash 
yarn encore dev
```
To load them in your templates, you must add the following code to the functions.php file of your theme. This will read the manifest.json and send the URLs to Twig.

``` php
add_action('timber/context', 'add_manifest_to_context');

function add_manifest_to_context($context) {
    $manifest_path = get_template_directory() . '/static/manifest.json';
    if (file_exists($manifest_path)) {
        $context['manifest'] = json_decode(file_get_contents($manifest_path), true);
    }
    return $context;
}
```
Inside twig (for exemple here in base.html.twig) :
``` twig
{% if manifest %}
		{% if manifest['bootstrap.css'] %}
			<link rel="stylesheet" href="{{ manifest['bootstrap.css'] }}">
		{% endif %}
		{% if manifest['main.js'] %}
			<script src="{{ manifest['main.js'] }}"></script>
		{% endif %}
		{% if manifest['bootstrap.js'] %}
			<script src="{{ manifest['bootstrap.js'] }}"></script>
		{% endif %}
		{% if manifest['runtime.js'] %}
			<script src="{{ manifest['runtime.js'] }}"></script>
		{% endif %}
{% endif %}
```