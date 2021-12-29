<?php
/**
 *
 * @author      Jesús Olazagoitia (@goiblas)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Map Block Leaflet
 * Description: Map Block Leaflet -- Allows embed maps in your contents, good alternative to Google Maps without the need for api key
 * Version:     2.2.0
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

function map_block_leaflet_register() {
	if(!function_exists('register_block_type')) {
		return;
	}

	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	// Enqueue lib assets
	$lib_script_path = '/lib/leaflet.js';
	$lib_style_path = '/lib/leaflet.css';
	$lib_version = '1.7.1';

	wp_register_style( 'lib-css-map-block-leaflet', plugins_url($lib_style_path, __FILE__), array(), $lib_version );
	wp_register_script( 'lib-js-map-block-leaflet', plugins_url($lib_script_path, __FILE__), array(), $lib_version, false );
	wp_register_style( 'lib-css-map-block-leaflet-cluster', plugins_url("/lib/MarkerCluster.css", __FILE__), array("lib-css-map-block-leaflet"), $lib_version );
	wp_register_script( 'lib-js-map-block-leaflet-cluster', plugins_url("/lib/leaflet.markercluster.js", __FILE__), array("lib-js-map-block-leaflet"), $lib_version, false );

	// Enqueue the bundled block JS file
	wp_register_script(
		'js-editor-map-block-leaflet',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	// register editor styles
	wp_register_style(
		'css-editor-map-block-leaflet',
		plugins_url( 'build/index.css', __FILE__ ),
        [],
		$asset_file['version']
	);

	// Register map-block-leaflet
    register_block_type( 'map-block-leaflet/map-block-leaflet', array(
		'editor_script' => 'js-editor-map-block-leaflet',
		'editor_style' => 'css-editor-map-block-leaflet',
		'render_callback' => 'map_block_leaflet_render',
		'script' => 'lib-js-map-block-leaflet',
		'style' => 'lib-css-map-block-leaflet',
		'attributes' => [
			'lat' => [
				'type' => 'number',
				'default' => 40.416775
			],
			'lng'  => [
				'type'  => 'number',
				'default' => -3.703790
			],
			'themeUrl' => [
				'type' => 'string',
				'default' =>  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
			],
			'themeAttribution' => [
				'type' => 'string',
				'default' => '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
			],
			'height' => [
				'type' => 'number',
				'default' => 220
			],
			'disableScrollZoom'=> [
				'type' => 'boolean',
				'default' => true
			],
			'zoom' => [
				'type' => 'number',
				'default' => 15
			],
			'themeId' => [
				'type' => 'number',
				'default' => 1
			],
			'content' => [
				'type' => 'string',
				'default' => ''
			]
		]
	 ) );

	// Register map-block-leaflet-multimarker
    register_block_type( 'map-block-leaflet/map-block-leaflet-multimarker', array(
		'editor_script' => 'js-editor-map-block-leaflet',
		'editor_style' => 'css-editor-map-block-leaflet',
		'render_callback' => 'map_block_leaflet_multi_marker_render',
		'script' => 'lib-js-map-block-leaflet-cluster',
		'style' => 'lib-css-map-block-leaflet-cluster',
		'attributes' => [
			'markers' => [
				'type' => 'array',
				'default' => []
			],
			'themeUrl' => [
				'type' => 'string',
				'default' =>  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
			],
			'themeAttribution' => [
				'type' => 'string',
				'default' => '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
			],
			'height' => [
				'type' => 'number',
				'default' => 220
			],
			'themeId' => [
				'type' => 'number',
				'default' => 1
			],
		]
	 ) );
}
add_action('init', 'map_block_leaflet_register');

/**
 * Render in frontend leaflet map
 */
function map_block_leaflet_render($settings) {
	$content = trim(preg_replace('/\s\s+/', ' ', $settings['content']));

	$classes = 'map_block_leaflet';
	if(array_key_exists('align', $settings)) {
		switch ($settings['align']) {
			case 'wide':
			$classes .= ' alignwide';
			break;
			case 'full':
			$classes .= ' alignfull';
			break;
		}
	}

	$id = uniqid('lmb_');
	$output = '<div id=\''. $id .'\' class="'.$classes .'" style="height: '. $settings['height'] . 'px"></div>';
	$output .= '
		<script>
		( function(){

		var map = L.map(\''. $id .'\').setView([' . $settings['lat'] . ', '. $settings['lng'] .'], \''. $settings['zoom'] .'\');

			L.tileLayer(\''. $settings['themeUrl'] . '\', {
				attribution: \''. $settings['themeAttribution'] .'\'
			}).addTo(map);

	';
	if($settings['disableScrollZoom']) {
		$output .= 'map.scrollWheelZoom.disable();';
	}
	if ( !empty( $content ) ){
		$output .= '
			var content = \''. esc_js($content) .'\';
			L.marker([' . $settings['lat'] . ', '. $settings['lng'] .']).addTo(map)
				.bindPopup( content.replace(/\r?\n/g, "<br />") )';
	} else {
		$output .= 'L.marker([' . $settings['lat'] . ', '. $settings['lng'] .']).addTo(map)';
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
				}, timer);
			} else {
				map.invalidateSize(true);
			}
		}
		if( is_loading()) {
			checkRender();
		} else {
			document.addEventListener("DOMContentLoaded", function() {
				map.invalidateSize(true);
			});
		}

    var container = document.getElementById(\'' . $id . '\');
    var observer = ResizeObserver && new ResizeObserver(function() {
      map.invalidateSize(true);
    });

    observer && observer.observe(container);
	';
	$output .= '})();</script>';

	return $output;
}

/**
 * Render in frontend leaflet map multimarker
 */
function map_block_leaflet_multi_marker_render($settings) {

	$classes = 'map_block_leaflet';
	if(array_key_exists('align', $settings)) {
		switch ($settings['align']) {
			case 'wide':
			$classes .= ' alignwide';
			break;
			case 'full':
			$classes .= ' alignfull';
			break;
		}
	}

	$id = uniqid('lmb_');

	return '
	<div id=\''. $id .'\' class="'.$classes .'" style="height: '. $settings['height'] . 'px"></div>
	<script>
		document.addEventListener("DOMContentLoaded", function() {
			var markets = '. json_encode($settings['markers']).';
			var center = [51.505, -0.09];

			var layer = L.tileLayer(\''. $settings['themeUrl'] . '\', {
				attribution: \''. $settings['themeAttribution'] .'\'
			})

			var map = L.map('. $id .', { center: center, layers: [layer]});
			map.scrollWheelZoom.disable();

			if(markets.length > 0) {
				var markers = L.markerClusterGroup();

				markets.forEach( function(market) {
					L.marker([market.latlng.lat, market.latlng.lng]).bindPopup(market.content).addTo(markers)
				})

				map.addLayer(markers);
				map.fitBounds(markers.getBounds(), {padding: [50, 50]})
			}

      var container = document.getElementById(\'' . $id . '\');
      var observer = ResizeObserver && new ResizeObserver(function() {
        map.invalidateSize(true);
      });

      observer && observer.observe(container);
		});
	</script>
	';
}

/**
 * Dequeue assets from plugin block leaflet if isn't in page
 */
function map_block_leaflet_dequeue_lib_script()
{
  $id = get_the_ID();
  if (!has_block('map-block-leaflet/map-block-leaflet', $id)) {
    wp_dequeue_script('lib-js-map-block-leaflet');
    wp_dequeue_script('lib-js-map-block-leaflet-cluster');
    wp_dequeue_script('js-editor-map-block-leaflet');

    wp_dequeue_style('css-editor-map-block-leaflet');
    wp_dequeue_style('lib-css-map-block-leaflet');
    wp_dequeue_style('lib-css-map-block-leaflet-cluster');
  }
}

add_action('wp_enqueue_scripts', 'map_block_leaflet_dequeue_lib_script');
