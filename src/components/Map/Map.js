import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import  { useEffect, useRef, memo } from '@wordpress/element';
import providers from "../../shared/providers"

const ScrollWheel = ({ disable }) => {
  const map = useMap();

  useEffect(() => {
    if(disable) {
      map.scrollWheelZoom.disable();
    } else {
      map.scrollWheelZoom.enable();
    }
  }, [disable])

  return null
}

const ZoomController = ({ zoom, setZoom }) => {
  const map = useMap();

  const mapEvents = useMapEvents({
      zoomend: () => {
        setZoom( mapEvents.getZoom() );
      },
  });

  useEffect(() => {
    map.setZoom(zoom)
  }, [zoom])

  return null
}

const HeightController = memo(({ height }) => {
    const map = useMap();
    const rerender = useRef(false);

    useEffect(() => {
      if(rerender.current) {
        map.invalidateSize()
      } else {
        rerender.current = true;
      }
    }, [height])

    return null
})

const Theme = ({ themeUrl }) => {
  return providers
      .filter( p => p.url === themeUrl)
      .map( ( provider ) => (
          <TileLayer
            attribution={provider.attribution}
            url={provider.url}
            key={provider.url}
          />
      ))
}

export const Map = ({ children, position, zoom, themeUrl, height, setZoom = () => {}, disableScrollZoom = true }) => {
  return (
      <MapContainer 
        center={ position }
        zoom={ zoom }
        >

        <Theme themeUrl={themeUrl} />
        <ScrollWheel disable={disableScrollZoom} />
        <ZoomController zoom={zoom} setZoom={setZoom} />
        <HeightController height={height} />

        { children }

      </MapContainer>
  )
}
