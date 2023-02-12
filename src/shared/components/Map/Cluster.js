import { useEffect } from "@wordpress/element";
import { Popup, useMap } from 'react-leaflet';
import { Marker } from "./Marker";

export const Cluster = ({ markers }) => {
    const map = useMap();
    const bounds = markers.map(({ latlng }) => latlng)

    useEffect(() => {
        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] })
        }
    }, [bounds])

    return markers.map((props) =>
        <Marker position={props.latlng} key={props.label}>
            <Popup className="leaflet-popup">
                <div dangerouslySetInnerHTML={{ __html: props.content }} />
            </Popup>
        </Marker>
    )
}