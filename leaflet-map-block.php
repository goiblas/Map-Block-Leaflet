<?php
/**
 *
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Map Block Leaflet
 * Description: Map Block Leaflet -- Allows embed maps in your contents, good alternative to Google Maps without the need for api key
 * Version:     1.1.0
 * Author:      Jesús Olazagoitia
 * Author URI:  https://goiblas.com
 * Text Domain: leaflet-map-block
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */


//  Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

function lmb_block_load_textdomain() {
	load_plugin_textdomain( 'leaflet-map-block', false, basename( __DIR__ ) . '/languages' );
}
add_action( 'init', 'lmb_block_load_textdomain' );


function lmb_register_leaflet_map_block() {
	if(!function_exists('register_block_type')) {
		return;
	}
	
	// external assets
	$style_path = 'https://unpkg.com/leaflet@1.0.2/dist/leaflet.css';
	$script_path = 'https://unpkg.com/leaflet@1.0.2/dist/leaflet.js';
    
    wp_register_style( 'css-gutenberg-leaflet-maps-block', $style_path);
	wp_enqueue_style('css-gutenberg-leaflet-maps-block');

	wp_enqueue_script(	'js-gutenberg-leaflet-maps-block', $script_path );


	// Enqueue assets blocks
	$block_path = '/assets/js/editor.blocks.js';
	$style_path = '/assets/css/blocks.editor.css';

	// Enqueue the bundled block JS file
	wp_enqueue_script(
		'lmb-block-editor-js',
		plugins_url($block_path, __FILE__),
		[ 'wp-i18n', 'wp-element', 'wp-editor', 'wp-blocks', 'wp-components' ],
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

	// Enqueue editor styles
	wp_enqueue_style(
		'lmb-block-editor-css',
		plugins_url($style_path, __FILE__),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $style_path )
	);

	// Register leaflet-map-block
    register_block_type( 'leaflet-map-block/leaflet-map-block', array(
		'editor_script' => 'js-gutenberg-leaflet-maps-block',
		'editor_style' => 'lmb-block-editor-css',
		'style' => 'css-gutenberg-leaflet-maps-block',
		'render_callback' =>  'lmb_render_leaflet_map',
	 ) );
}

add_action('init', 'lmb_register_leaflet_map_block');



/**
 * Render in frontend leaflet map
 */
function lmb_render_leaflet_map($settings) {

	// defualt value is not the settings :(
	$latitude = $settings['lat'] ? $settings['lat'] : '40.416775';
	$longitude = $settings['lng'] ? $settings['lng']:  '-3.703790';
	$zoom = $settings['zoom'] ? $settings['zoom']: '15';

	$url = $settings['themeUrl'] ?  $settings['themeUrl'] : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
	$attribution = $settings['themeAttribution'] ?  $settings['themeAttribution'] : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
	$content = trim(preg_replace('/\s\s+/', ' ', $settings['content'])); ;
	$height = $settings['height'] ? $settings['height'] : 220;
	

$classes = 'lmb-render-leaflet-map';
	switch ($settings['align']) {
		case 'wide':
			$classes .= ' alignwide';
			break;
		case 'full':
			$classes .= ' alignfull';
			break;
	}


	$id = uniqid('lmb_');
	$output .= '<div id=\''. $id .'\' class="'.$classes .'" style="height: '. $height . 'px"></div>';
	$output .= '
		<script>
		var map = L.map(\''. $id .'\').setView([' . $latitude . ', '. $longitude .'], \''. $zoom .'\');

			L.tileLayer(\''. $url . '\', {
				attribution: \''. $attribution .'\'
			}).addTo(map);
	';

	if ( !empty( $content ) ){
		$output .= '
			L.marker([' . $latitude . ', '. $longitude .']).addTo(map)
				.bindPopup(\''. $content .'\')';
	} else {
		$output .= 'L.marker([' . $latitude . ', '. $longitude .']).addTo(map)';
	}

	$output .= '</script>';
	
	return $output;
}
