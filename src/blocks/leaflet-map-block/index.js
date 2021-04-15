import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import './editor.scss';

import icon from './icon';
import attributes from './attributes';

/*
* Components
*/
import Search from "./components/Search"
import Inspector from "./components/Inspector"
import Resizable from "../../components/Resizable"
import { Map, Marker } from "../../components/Map"

export default registerBlockType(  'map-block-leaflet/map-block-leaflet', {
    title:__('Map Leaflet', 'map-block-leaflet'),
    description: __('Easy way to inside maps in your contents', 'map-block-leaflet'),
    category: 'embed',
    keywords: [
        __( 'map', 'map-block-leaflet' ),
        __( 'leaflet', 'map-block-leaflet' ),
    ],
    icon, 
    supports: {
        html: false,
		align: ['wide', 'full']
	},
    attributes,
    edit: props => {
        const {attributes, setAttributes, toggleSelection } = props;
        const position = [attributes.lat, attributes.lng];

        const handleMoveend = ({ lng, lat }) => setAttributes({lng, lat})
        const handleZoom = ( zoom ) =>  setAttributes({ zoom })
        const handleHeight = ( height ) =>  setAttributes({ height })
      
        return (
            <> 
                <Inspector {...props}/>
                <Search setAttributes={props.setAttributes} isSelected={props.isSelected} />
                <Resizable 
                    height={ attributes.height}
                    setHeight={ handleHeight }
                    toggleSelection={toggleSelection}
                    >
                    <Map 
                        disableScrollZoom={attributes.disableScrollZoom}
                        position={position}
                        zoom={attributes.zoom}
                        themeUrl={attributes.themeUrl}
                        height={attributes.height}
                        setZoom={handleZoom}
                        >
                        <Marker 
                            position={position}
                            draggable
                            onMoveend={handleMoveend}
                            >
                            {attributes.content}
                        </Marker>
                    </Map>        
                </Resizable>
            </>
        )
    },
    save: () => null
});
