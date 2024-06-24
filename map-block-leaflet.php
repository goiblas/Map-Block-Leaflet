<?php
/**
 *
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Map Block Leaflet
 * Description: Map Block Leaflet -- Allows embed maps in your contents, good alternative to Google Maps without the need for api key
 * Version:     3.2.1
 * Author:      Jesús Olazagoitia
 * Author URI:  https://goiblas.com
 * Text Domain: map-block-leaflet
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */


//  Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

function map_block_leaflet_register() {
	// Enqueue lib assets
	$lib_script_path = '/lib/leaflet.js';
	$lib_style_path = '/lib/leaflet.css';
	$lib_version = '1.9.4';

	wp_register_style( 'lib-css-map-block-leaflet', plugins_url($lib_style_path, __FILE__), array(), $lib_version );
	wp_register_script( 'lib-js-map-block-leaflet', plugins_url($lib_script_path, __FILE__), array(), $lib_version, false );

	// Register blocks
	register_block_type( __DIR__ . '/build/leaflet-map-block');
	register_block_type( __DIR__ . '/build/multi-marker');
}

add_action('init', 'map_block_leaflet_register');