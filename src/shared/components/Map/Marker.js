import { Marker as LeafletMarker, Popup, useMap } from 'react-leaflet';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { __ } from "@wordpress/i18n";

const noop = () => { }

export const Marker = ({ position, children, draggable = false, onMoveend = noop }) => {
  const map = useMap();
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker !== null) {
          onMoveend(marker.getLatLng())
        }
      },
    }),
    [],
  )

  useEffect(() => {
    map.setView(position);
  }, [position])

  return (
    <LeafletMarker
      ref={markerRef}
      position={position}
      eventHandlers={eventHandlers}
      draggable={draggable}
    >
      <Popup className="leaflet-popup">
        {children}
      </Popup>
    </LeafletMarker>
  )
}  