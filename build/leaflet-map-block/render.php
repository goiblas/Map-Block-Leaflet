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
			var map = L.map("<?= $id ?>").setView(["<?= $attributes['lat'] ?>", "<?= $attributes['lng'] ?>"], "<?= $attributes['zoom'] ?>");
	
			L.tileLayer("<?=  $attributes['themeUrl'] ?>", {
				attribution: '<?= $attributes['themeAttribution'] ?>'
			}).addTo(map);
	
		<?php if($attributes['disableScrollZoom']) { ?>
			map.scrollWheelZoom.disable();
		<?php } ?>
	
		<?php if ( !empty( $content ) ){ ?>
			var content = "<?= esc_js( $content ) ?>";
			L.marker(["<?= $attributes['lat'] ?>", "<?= $attributes['lng'] ?>"]).addTo(map)
				.bindPopup( content.replace(/\r?\n/g, "<br />") )
		<?php } else { ?>
			L.marker(["<?= $attributes['lat'] ?>", "<?= $attributes['lng'] ?>"]).addTo(map);
		<?php } ?>

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

			var container = document.getElementById("<?= $id ?>");
			var observer = ResizeObserver && new ResizeObserver(function() {
				map.invalidateSize(true);
			});

			observer && observer.observe(container);
		}

		document.addEventListener("DOMContentLoaded", initilize);
	} )();
</script>