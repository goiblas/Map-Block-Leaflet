<?php
/**
 *
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Leaflet Map Block
 * Description: Leaflet Map Block -- Allows embed maps in your contents, good alternative to Google Maps without the need for api key
 * Version:     1.0.0
 * Author:      Jesús Olazagoitia
 * Author URI:  https://twitter.com/goiblas
 * Text Domain: leaflet-map-block
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */


//  Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue block editor only JavaScript and CSS.
 */
function lcb_enqueue_block_editor_assets() {
	// Make paths variables so we don't write em twice ;)
	$block_path = '/assets/js/editor.blocks.js';
    $style_path = '/assets/css/blocks.editor.css';
    
    // Enqueue the bundled block JS file
	wp_enqueue_script(
		'lcb-blocks-js',
		plugins_url($block_path, __FILE__),
		[ 'wp-i18n', 'wp-element', 'wp-editor', 'wp-blocks', 'wp-components' ],
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

	// Enqueue optional editor only styles
	wp_enqueue_style(
		'lcb-blocks-editor-css',
		plugins_url($style_path, __FILE__),
		[ 'wp-blocks' ],
		filemtime( plugin_dir_path( __FILE__ ) . $style_path )
	);
}

add_action( 'enqueue_block_editor_assets', 'lcb_enqueue_block_editor_assets' );


/**
 * Enqueue front end and editor JavaScript and CSS assets.
 */
function lcb_enqueue_assets() {
	$style_path = '/assets/css/blocks.style.css';
	wp_enqueue_style(
		'lcb-blocks',
		plugins_url( $style_path, __FILE__ ),
		[ 'wp-blocks' ],
		filemtime(  plugin_dir_path( __FILE__ ) . $style_path )
	);
}
add_action( 'enqueue_block_assets', 'lcb_enqueue_assets' );



/**
 * Enqueue frontend JavaScript and CSS assets.
 */
function lcb_enqueue_frontend_assets() {

	// If in the backend, bail out.
	if ( is_admin() ) {
		return;
	}

	$block_path = '/assets/js/frontend.blocks.js';
	wp_enqueue_script(
		'lcb-blocks-frontend',
		plugins_url(  $block_path, __FILE__),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);
}

add_action( 'enqueue_block_assets', 'lcb_enqueue_frontend_assets' );


/**
 * include Leaflet maps block 
 */
include __DIR__ . '/inc/leaflet-maps-block.php';
