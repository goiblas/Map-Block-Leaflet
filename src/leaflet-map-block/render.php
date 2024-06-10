<?php 
	$id = uniqid('lmb_');
	$content = trim(preg_replace('/\s\s+/', ' ', $attributes['content']));
	
	$classes = 'map_block_leaflet';
	if(array_key_exists('align', $attributes)) {
		switch ($attributes['align']) {
			case 'wide':
			$classes .= ' alignwide';
			break;
			case 'full':
			$classes .= ' alignfull';
			break;
		}
	}
?>

<div id="<?= $id ?>" class="<?= $classes ?>" style="height: <?= $attributes['height'] ?>px"></div>
<script>
	( function(){
		function is_loading() {
			return document.body.classList.contains("loading");
		}
		
		function initilize() {
			const map = L.map("<?= $id ?>").setView(["<?= $attributes['lat'] ?>", "<?= $attributes['lng'] ?>"], "<?= $attributes['zoom'] ?>");
	
			L.tileLayer("<?=  $attributes['themeUrl'] ?>", {
				attribution: '<?= $attributes['themeAttribution'] ?>'
			}).addTo(map);
	
		<?php if($attributes['disableScrollZoom']) { ?>
			map.scrollWheelZoom.disable();
		<?php } ?>

		<?php if(isset($attributes['markerImage'])) { ?>
			const iconWidth = <?= $attributes['markerSize'] ?>;
			const iconHeight = <?= $attributes['markerImage']['height'] / $attributes['markerImage']['width'] * $attributes['markerSize'] ?>;

			const icon = L.icon({
				iconUrl: "<?= $attributes['markerImage']['url'] ?>",
				iconSize: [iconWidth, iconHeight],
				iconAnchor: [iconWidth / 2, iconHeight],
				popupAnchor: [0, -iconHeight / 1.25]
			});
		<?php } else { ?>
			const icon = new L.Icon.Default();
		<?php } ?>

		<?php if ( !empty( $content ) ){ ?>
			const content = "<?= esc_js( $content ) ?>";
			L.marker(["<?= $attributes['lat'] ?>", "<?= $attributes['lng'] ?>"], { icon: icon}).addTo(map)
				.bindPopup( content.replace(/\r?\n/g, "<br />") )
		<?php } else { ?>
			L.marker(["<?= $attributes['lat'] ?>", "<?= $attributes['lng'] ?>"], { icon: icon}).addTo(map);
		<?php } ?>

			const timer = 100;
			function checkRender() {
				if( is_loading()) {
					setTimeout(function(){
						checkRender();
					}, timer);
				} else {
					map.invalidateSize(true);
				}
			}

			const container = document.getElementById("<?= $id ?>");
			const observer = ResizeObserver && new ResizeObserver(function() {
				map.invalidateSize(true);
			});

			observer && observer.observe(container);
		}

		document.addEventListener("DOMContentLoaded", initilize);
	} )();
</script>