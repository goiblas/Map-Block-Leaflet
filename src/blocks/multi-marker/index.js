import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import "./editor.scss";

import attributes from './attributes';
import icon from './icon';

import Inspector from "./components/Inspector";
import Resizable from "../../components/Resizable";
import { Map, Cluster } from "../../components/Map";

export default registerBlockType(  'map-block-leaflet/map-block-leaflet-multimarker', {
    title:__('Map Leaflet multimarker', 'map-block-leaflet'),
    description: __('Easy way to inside maps in your contents', 'map-block-leaflet'),
    category: 'embed',
    keywords: [
        __( 'map', 'map-block-leaflet' ),
        __( 'leaflet', 'map-block-leaflet' ),
    ],
    attributes,
    icon, 
    supports: {
        html: false,
		align: true
	},
    edit: props => {
        const {attributes, setAttributes, toggleSelection } = props;
        const { markers } = attributes;

        const defaultPosition = [51.505, -0.09]
        const handleZoom = ( ) => {}
        const handleHeight = ( height ) =>  setAttributes({ height })

        return (
            <> 
                <Inspector {...props}/>
                <Resizable 
                    height={ attributes.height}
                    setHeight={ handleHeight }
                    toggleSelection={toggleSelection}
                    >
                    <Map 
                        disableScrollZoom={attributes.disableScrollZoom}
                        position={defaultPosition}
                        zoom={10}
                        themeUrl={attributes.themeUrl}
                        height={attributes.height}
                        setZoom={handleZoom}
                        >
                        <Cluster markers={markers} />
                    </Map>        
                </Resizable>
            </>
        )
    },
    save: () =>  null
});
