import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const { __ } = wp.i18n;
const { Component } = wp.element;

import providers from '../shared/providers';

export default class LeafletMap extends Component {

    onZoom({target} = {}) {
      if(target) {
       const {_zoom } = target;
       const {setAttributes } = this.props;
  
       setAttributes({zoom: _zoom})
      }
    }
    onMarkerMove({target} =  {}) {
      if(target) {
        const {_latlng } = target;
        const {setAttributes } = this.props;
        
        setAttributes({..._latlng})
      }
    }

    render(){
      const {lng, lat, zoom, content, themeId } = this.props.attributes;
      const position = [lat, lng];
      const themeSelected = providers.find( provider => provider.id == themeId ) || 1;

        return (
          <Map center={position} zoom={Number(zoom)} onZoomend={ev => this.onZoom(ev)}  >
            <TileLayer
              url={themeSelected.url}
              attribution={themeSelected.attribution}
            />
            <Marker position={position} draggable onMoveend={ev => this.onMarkerMove(ev)}>
              <Popup>{ content }</Popup>
            </Marker>
  
          </Map>
        )
    }
}