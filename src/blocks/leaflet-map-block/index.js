const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

import icon from './icon';
import './editor.scss';
import './style.scss';
import Inspector from './inspector';
import attributes from './attributes';

/*
* Components
*/
import LeafletMap from '../../components/leaflet-map';
import SearchPlace from '../../components/search-place';

export default registerBlockType(  'leaflet-map-block/leaflet-map-block', {
    title:__('Leaflet map', ''),
    description: __('Easy way to inside maps in your contents', 'leaflet-map-block'),
    category: 'embed',
    keywords: [
        __( 'map', 'leaflet-map-block' ),
        __( 'leaflet', 'leaflet-map-block' ),
    ],
    icon: {
        background: '#eceff4',
        src: icon
    }, 
    supports: {
		align: [ 'left', 'right', 'wide', 'full' ],
	},
    attributes,
    getEditWrapperProps({blockAlignment}){
        if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment ) {
            return { 'data-align': blockAlignment };
        }
    },
    edit: props => {
        const { attributes, isSelected } = props;
        return (
            <Fragment> 
                <Inspector {...props}/>
                <SearchPlace {...props} />
                <LeafletMap {...props}/> 
            </Fragment>
        )
    },
    save: () => {
        return null;
    }
});
