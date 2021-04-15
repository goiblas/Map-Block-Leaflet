import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

import themes from '../../../shared/themes';
import providers from '../../../shared/providers';
import ThemePicker from '../../../components/ThemePicker';
import AddMarker from "./AddMarker";
import ListMarkers from "./ListMarkers";

const Inspector = ( props ) => {
    const { attributes, setAttributes } = props;
    const { themeId } = attributes;

    const setTheme = ({ id }) => {
        const themeSelected = providers.find( provider => provider.id === id);
        if( themeSelected) {
            setAttributes({
                themeId: themeSelected.id,
                themeUrl: themeSelected.url,
                themeAttribution: themeSelected.attribution,
            })
        }
    }

    const addMarker = (marker) => {
        setAttributes( { markers : attributes.markers.concat(marker) });
    }

    const handleChangeMarkers = (markers) => {
        setAttributes({ markers });
    }

    return (
        <InspectorControls>
        <PanelBody title={__('Markers', 'map-block-leaflet')} initialOpen>
            <AddMarker themeUrl={attributes.themeUrl} onCreate={addMarker} />
            <ListMarkers themeUrl={attributes.themeUrl} onChange={handleChangeMarkers} markers={attributes.markers} />
        </PanelBody>
        <PanelBody title={__('Theme', 'map-block-leaflet')} initialOpen={false}>
            <ThemePicker
                value={ themeId }
                themes={ themes }
                onChange={ setTheme }
            />
        </PanelBody>
    </InspectorControls>
    )
}

export default Inspector