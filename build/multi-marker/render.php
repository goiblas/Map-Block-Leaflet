<?php 
	$id = uniqid('lmb_');	
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
    document.addEventListener("DOMContentLoaded", function() {
        var markers = <?= json_encode($attributes['markers']) ?>;
        
        var center = [51.505, -0.09];

        var layer = L.tileLayer("<?=  $attributes['themeUrl'] ?>", {
			attribution: '<?= $attributes['themeAttribution'] ?>'
		});

        var map = L.map("<?= $id ?>", { center: center, layers: [layer]});
        map.scrollWheelZoom.disable();
 
        if(markers.length > 0) {
            markers.forEach( function(marker) {
                L.marker(marker.latlng).bindPopup(marker.content).addTo(map)
            })

            const bounds = markers.map(function(marker) {
                return marker.latlng
            })

            map.fitBounds(bounds, {padding: [50, 50]})
        }

        var container = document.getElementById("<?= $id ?>");
        
        var observer = ResizeObserver && new ResizeObserver(function() {
            map.invalidateSize(true);
        });

        observer && observer.observe(container);
    });
</script>
