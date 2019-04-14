import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import  { createRef } from 'react';

const { __ } = wp.i18n;
const { Component } = wp.element;

export default class LeafletMap extends Component {
    constructor(props) {
      super(props);
      this.mapRef = createRef();
    }
    onZoom({target} = {}) {
      if(target) {
       const {_zoom } = target;
       const {setAttributes } = this.props;
  
       setAttributes({zoom: _zoom})
      }
    }
    componentDidUpdate() {
      if(this.props.attributes.disableScrollZoom) {
        this.mapRef.current.leafletElement.scrollWheelZoom.disable();
      } else {
        this.mapRef.current.leafletElement.scrollWheelZoom.enable();
      }
    }
    invalidateSize() {
      this.mapRef.current.leafletElement.invalidateSize();
    }
    onMarkerMove({target} =  {}) {
      if(target) {
        const {_latlng } = target;
        const {setAttributes } = this.props;
        
        setAttributes({..._latlng})
      }
    }

    render(){

      const {lng, lat, zoom, content, themeAttribution, themeUrl } = this.props.attributes;
      const position = [lat, lng];
        return (
            <Map 
              ref={this.mapRef}
              center={position} zoom={Number(zoom)} onZoomend={ev => this.onZoom(ev)}  >
              <TileLayer
                url={themeUrl}
                attribution={themeAttribution}
                invalidateSize={true}
                />
              <Marker position={position} draggable onMoveend={ev => this.onMarkerMove(ev)}>
                <Popup>{ content }</Popup>
              </Marker>
    
            </Map>
        )
    }
}