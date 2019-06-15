<?php
/**
 *
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Map Block Leaflet
 * Description: Map Block Leaflet -- Allows embed maps in your contents, good alternative to Google Maps without the need for api key
 * Version:     1.5.0
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

function map_block_leaflet_load_textdomain() {
	load_plugin_textdomain( 'map-block-leaflet', false, basename( __DIR__ ) . '/languages' );
}
add_action( 'init', 'map_block_leaflet_load_textdomain' );


function map_block_leaflet_enqueue_external_assets() {
	$script_path = 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.js';
	$style_path = 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css';

	wp_enqueue_style( 'css-map-block-leaflet', $style_path, array(), '1.5.1' );
	wp_enqueue_script( 'js-map-block-leaflet', $script_path, array(), '1.5.1', false );
}

function map_block_leaflet_register() {
	if(!function_exists('register_block_type')) {
		return;
	}

	if(is_admin()) {
		map_block_leaflet_enqueue_external_assets();
	}

	// Enqueue assets blocks
	$block_path = '/assets/js/editor.blocks.js';
	$style_path = '/assets/css/blocks.editor.css';

	// Enqueue the bundled block JS file
	wp_register_script(
		'js-editor-map-block-leaflet',
		plugins_url($block_path, __FILE__),
		[ 'wp-i18n', 'wp-element', 'wp-editor', 'wp-blocks', 'wp-components' ],
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

	// register editor styles
	wp_register_style(
		'css-editor-map-blcok-leaflet',
		plugins_url($style_path, __FILE__),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $style_path )
	);

	// Register map-block-leaflet
    register_block_type( 'map-block-leaflet/map-block-leaflet', array(
		'editor_script' => 'js-editor-map-block-leaflet',
		'editor_style' => 'css-editor-map-blcok-leaflet',
		'render_callback' =>  'map_block_leaflet_reder'
	 ) );
}
add_action('init', 'map_block_leaflet_register');


/**
 * Render in frontend leaflet map
 */
function map_block_leaflet_reder($settings) {

	// defualt value is not the settings :(
	$latitude = $settings['lat'] ? $settings['lat'] : '40.416775';
	$longitude = $settings['lng'] ? $settings['lng']:  '-3.703790';
	$zoom = $settings['zoom'] ? $settings['zoom']: '15';

	$url = $settings['themeUrl'] ?  $settings['themeUrl'] : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
	$attribution = $settings['themeAttribution'] ?  $settings['themeAttribution'] : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
	$content = trim(preg_replace('/\s\s+/', ' ', $settings['content'])); ;
	$height = $settings['height'] ? $settings['height'] : 220;
	$scrollWheelZoomDisabled = $settings['disableScrollZoom'] ? $settings['disableScrollZoom'] : true;

	$classes = 'map_block_leaflet';
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
		( function(){

		var map = L.map(\''. $id .'\').setView([' . $latitude . ', '. $longitude .'], \''. $zoom .'\');

			L.tileLayer(\''. $url . '\', {
				attribution: \''. $attribution .'\'
			}).addTo(map);
			
	';
	if($scrollWheelZoomDisabled) {
		$output .= 'map.scrollWheelZoom.disable();';
	}
	if ( !empty( $content ) ){
		$output .= '
			L.marker([' . $latitude . ', '. $longitude .']).addTo(map)
				.bindPopup(\''. $content .'\')';
	} else {
		$output .= 'L.marker([' . $latitude . ', '. $longitude .']).addTo(map)';
	}

	$output .= '
		function is_loading() {
			return document.body.classList.contains("loading");
		}
		var timer = 100;
		function checkRender() {
			if( is_loading()) {
				setTimeout(function(){
					checkRender();
				} ,timer);
			} else {
				map.invalidateSize(true);
			}
		}
		if( is_loading()) {
			checkRender();
		}
	';
	$output .= '})();</script>';
	
	return $output;
}

function leaflet_map_block_frontend_scripts() {
	if( is_singular()) {
		if( has_block( 'map-block-leaflet/map-block-leaflet' ) ) {
			map_block_leaflet_enqueue_external_assets();
		}
	} else {
		map_block_leaflet_enqueue_external_assets();
	}
}
add_action( 'wp_enqueue_scripts', 'leaflet_map_block_frontend_scripts' );
