import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const { __ } = wp.i18n;
const { Component } = wp.element;

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
    componentDidMount() {
      const { attributes, setAttributes } = this.props;
      const { zoom } = attributes;
      
      setAttributes({ zoom: zoom - 1})
      setTimeout( () => { 
          setAttributes( { zoom: zoom + 1})
      },10);
    }
    render(){
      const {lng, lat, zoom, content, themeAttribution, themeUrl } = this.props.attributes;
      const position = [lat, lng];

        return (
          <Map center={position} zoom={Number(zoom)} onZoomend={ev => this.onZoom(ev)}  >
            <TileLayer
              url={themeUrl}
              attribution={themeAttribution}
            />
            <Marker position={position} draggable onMoveend={ev => this.onMarkerMove(ev)}>
              <Popup>{ content }</Popup>
            </Marker>
  
          </Map>
        )
    }
}