import { Marker as LeafletMarker, Popup, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { __ } from "@wordpress/i18n";

const noop = () => { }

export const Marker = ({ position, children, draggable = false, onMoveend = noop, customIcon }) => {
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

  const icon = useMemo(() => {
    if (!customIcon?.url) {
      return new L.Icon.Default()
    }

    return new L.Icon({
      iconUrl: customIcon.url,
      iconSize: [customIcon.width, customIcon.height],
      iconAnchor: [customIcon.width / 2, customIcon.height],
      popupAnchor: [0, -customIcon.height / 1.25]
    })
  }, [customIcon])

  return (
    <LeafletMarker
      ref={markerRef}
      position={position}
      eventHandlers={eventHandlers}
      draggable={draggable}
      icon={icon}
    >
      <Popup className="leaflet-popup">
        {children}
      </Popup>
    </LeafletMarker>
  )
}  