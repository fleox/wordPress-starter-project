<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 */

// Load Composer dependencies.
require_once __DIR__ . '/../../../../vendor/autoload.php';

require_once __DIR__ . '/src/StarterSite.php';

Timber\Timber::init();

// Sets the directories (inside your theme) to find .twig files.
Timber::$dirname = [ 'templates', 'views' ];

add_action('timber/context', 'add_manifest_to_context');

function add_manifest_to_context($context) {
    $manifest_path = get_template_directory() . '/static/manifest.json';
    if (file_exists($manifest_path)) {
        $context['manifest'] = json_decode(file_get_contents($manifest_path), true);
    }

    return $context;
}

new StarterSite();
