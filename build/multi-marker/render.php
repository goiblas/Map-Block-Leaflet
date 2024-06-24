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
        const markers = <?= json_encode($attributes['markers']) ?>;
        
        const center = [51.505, -0.09];

        const layer = L.tileLayer("<?=  $attributes['themeUrl'] ?>", {
			attribution: '<?= $attributes['themeAttribution'] ?>'
		});

        const map = L.map("<?= $id ?>", { center: center, layers: [layer]});
        map.scrollWheelZoom.disable();
 
        if(markers.length > 0) {
            markers.forEach( function(marker) {
                const customIcon = marker.markerImage ? {
                    url: marker.markerImage.url,
                    width: marker.markerSize,
                    height: marker.markerImage.height / marker.markerImage.width * marker.markerSize
                } : null

                const icon = customIcon
                    ? new L.Icon({
                        iconUrl: customIcon.url,
                        iconSize: [customIcon.width, customIcon.height],
                        iconAnchor: [customIcon.width / 2, customIcon.height],
                        popupAnchor: [0, -customIcon.height / 1.25]
                        })
                    : new L.Icon.Default()

                if(marker.content) {
                    L.marker(marker.latlng, { icon: icon }).bindPopup(marker.content).addTo(map)
                } else {
                    L.marker(marker.latlng, { icon: icon }).addTo(map)
                }
            })

            const bounds = markers.map(function(marker) {
                return marker.latlng
            })

            map.fitBounds(bounds, {padding: [50, 50]})
        }

        const container = document.getElementById("<?= $id ?>");
        
        const observer = ResizeObserver && new ResizeObserver(function() {
            map.invalidateSize(true);
        });

        observer && observer.observe(container);
    });
</script>
