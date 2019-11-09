const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    InspectorControls
  } = wp.editor;

  const {
    PanelBody,
    TextareaControl,
    TextControl,
    RangeControl,
    ToggleControl
  } = wp.components;

import themes from './../shared/themes';
import providers from '../shared/providers';
import ThemePicker from './theme-picker';

export default class Inspector extends Component {
    setTheme(themeId) {
        const { setAttributes } = this.props;
        const themeSelected = providers.find( provider => provider.id == themeId);
        if( themeSelected) {
            setAttributes({
                themeId: themeSelected.id,
                themeUrl: themeSelected.url,
                themeAttribution: themeSelected.attribution,
            })
        }
    }

    safeThemeUrl(url) {
        const reqex = /{ext}|{ex}|{e}$/;
        return url.replace(reqex, 'png');
    }
    render() {
        const { attributes, setAttributes } = this.props;
        const { lat, lng, height, content, zoom, themeId, disableScrollZoom, themeUrl, themeAttribution } = attributes;

        return (
            <InspectorControls>
                <PanelBody>
                    <TextareaControl 
                    label={__('Content of tooltip', 'map-block-leaflet')}
                        onChange={ content => setAttributes({content})}
                        value={content}
                    />

                </PanelBody>
                <PanelBody title={__('Theme', 'map-block-leaflet')} initialOpen={false}>
               
                <ThemePicker
                    value={ themeId }
                    themes={ themes }
                    onChange={ theme =>  this.setTheme(theme.id) }
                />
 			  <label class="blocks-base-control__label" for="map-block-leaflet-text-control-xyz">{__('XYZ Tiles', 'map-block-leaflet')}</label>
			  <TextControl 
				  onChange={ themeUrl => setAttributes({ themeId: '', themeUrl: this.safeThemeUrl(themeUrl) })}
				  id="map-block-leaflet-text-control-xyz"
				  type="text"
				  value={themeUrl}
			  />
 			  <label class="blocks-base-control__label" for="map-block-leaflet-text-control-attribution">{__('Attribution', 'map-block-leaflet')}</label>
			  <TextControl 
				  onChange={ themeAttribution => setAttributes({  themeAttribution })}
				  id="map-block-leaflet-text-control-attribution"
				  type="text"
				  value={themeAttribution}
			  />
                </PanelBody>
                <PanelBody title={__('Position', 'map-block-leaflet')} initialOpen={false}>
                    <label class="blocks-base-control__label" for="map-block-leaflet-text-control-lat">{__('Latitude', 'map-block-leaflet')}</label>
                    <TextControl 
                        id="map-block-leaflet-text-control-lat"
                        onChange={ lat => setAttributes({lat: Number(lat)})}
                        type="number"
                        value={lat}
                    />
                    <label class="blocks-base-control__label" for="map-block-leaflet-text-control-lon">{__('Longitude', 'map-block-leaflet')}</label>
                    <TextControl 
                        onChange={ lng => setAttributes({lng: Number(lng)})}
                        id="map-block-leaflet-text-control-lon"
                        type="number"
                        value={lng}
                    />
                    <RangeControl
                        label={__("Zoom", "map-block-leaflet")}
                        value={zoom}
                        onChange={zoom => setAttributes({ zoom: Number(zoom) })}
                        min={1}
                        max={17} />

                </PanelBody>
                <PanelBody title={__('Options', 'map-block-leaflet')} initialOpen={false}>

                    <label class="blocks-base-control__label" for="map-block-leaflet-text-control-lon">{__('Map height', 'map-block-leaflet')}</label>
                    <TextControl 
                        onChange={ height => setAttributes({height: Number(height)})}
                        id="map-block-leaflet-text-control-lon"
                        type="number"
                        step="10"
                        value={height}
                    />
                
                    <ToggleControl
                        label={ __( 'Disable scroll zoom', 'map-block-leaflet' ) }
                        checked={ disableScrollZoom }
                        onChange={ value =>  setAttributes( { disableScrollZoom: value } ) }
                    />
                </PanelBody>
            </InspectorControls>
        );
    }
}