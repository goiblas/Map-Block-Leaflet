<?php
if (! defined('ABSPATH')) {
    exit;
}

function lcb_leaflet_map_enqueue_assets() {
	$style_path = 'https://unpkg.com/leaflet@1.0.2/dist/leaflet.css';
	$script_path = 'https://unpkg.com/leaflet@1.0.2/dist/leaflet.js';
    
    wp_register_style( 'css-gutenberg-leaflet-maps-block', $style_path);
	wp_enqueue_style('css-gutenberg-leaflet-maps-block');

	wp_enqueue_script(
		'js-gutenberg-leaflet-maps-block', $script_path
	);

}
add_action( 'enqueue_block_assets', 'lcb_leaflet_map_enqueue_assets' );

function lcb_register_leaflet_map_block() {
    if(!function_exists('register_block_type')) {
        return;
    }
    register_block_type( 'leaflet-map-block/leaflet-map-block', [
		'render_callback' =>  'lcb_render_leaflet_map',
	] );
}

add_action('plugins_loaded', 'lcb_register_leaflet_map_block');

function lcb_render_leaflet_map($settings) {

	// defualt value is not the settings :(
	$latitude = $settings['latitude'] ? $settings['latitude'] : '40.416775';
	$longitude = $settings['longitude'] ? $settings['longitude']:  '-3.703790';
	$content = $settings['content'];

	$id = uniqid('lcb_');
	$output .= '<div id=\''. $id .'\'></div>';
	$output .= '
		<script>
		var map = L.map(\''. $id .'\').setView([' . $latitude . ', '. $longitude .'], 13);

			L.tileLayer(\'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\', {
				attribution: \'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors\'
			}).addTo(map);
	';

	if ( !empty( $content ) ){
		$output .= '
			L.marker([' . $latitude . ', '. $longitude .']).addTo(map)
				.bindPopup(\''. $content .'\')
				.openPopup();';
	}

	$output .= '</script>';
	
	return $output;
}