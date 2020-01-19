const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

import './editor.scss';

import icon from './icon';
import attributes from './attributes';

/*
* Components
*/
import Inspector from '../../components/Inspector';
import ResizableMap from '../../components/resizable-map';
import SearchPlace from '../../components/search-place';


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
        return (
            <Fragment> 
                <Inspector {...props}/>
                <SearchPlace {...props} />
                <ResizableMap {...props} />
            </Fragment>
        )
    },
    save: () => {
        return null;
    }
});
