import { useEffect } from "@wordpress/element";
import { Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// import 'leaflet-defaulticon-compatibility';
// import 'leaflet/dist/leaflet.css';
// import 'react-leaflet-markercluster/dist/styles.min.css';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package

export const Cluster = ({ markers }) => {
    const map = useMap();
    const bounds = markers.map(({latlng}) => latlng)

    useEffect(() => {
        if(bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50]})
        }
    }, [bounds])

    return (
        <MarkerClusterGroup>
            {markers.map((props) => 
            <Marker position={props.latlng} key={props.label}>
                <Popup className="leaflet-popup">
                    <div dangerouslySetInnerHTML={{__html: props.content}} />
                </Popup>
            </Marker>
            )}
        </MarkerClusterGroup>
    )
}