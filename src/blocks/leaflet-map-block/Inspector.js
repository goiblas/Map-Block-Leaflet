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
    SelectControl
  } = wp.components;

import providers from './../../shared/providers';

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
    render() {
        const { attributes, setAttributes } = this.props;
        const { lat, lng, content, zoom, themeId } = attributes;

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
                <SelectControl
                    label={__('Select theme', 'map-block-leaflet')}
                    value={ themeId }
                    options={ 
                        providers.map( provider => {
                            return {
                                label: provider.name,
                                value: provider.id
                            }
                        })
                    }
                    onChange={  themeId  =>  this.setTheme(themeId) }
                />
                </PanelBody>
                <PanelBody title={__('Position', 'map-block-leaflet')} initialOpen={false}>
                    <label class="blocks-base-control__label" for="map-block-leaflet-text-control-lat">{__('latitude', 'map-block-leaflet')}</label>
                    <TextControl 
                        id="map-block-leaflet-text-control-lat"
                        onChange={ lat => setAttributes({lat})}
                        type="number"
                        value={lat}
                    />
                    <label class="blocks-base-control__label" for="map-block-leaflet-text-control-lon">{__('longitude', 'map-block-leaflet')}</label>
                    <TextControl 
                        onChange={ lng => setAttributes(lng)}
                        id="map-block-leaflet-text-control-lon"
                        type="number"
                        value={lng}
                    />
                    <RangeControl
                        label={__("Zoom", "map-block-leaflet")}
                        value={zoom}
                        onChange={zoom => setAttributes({ zoom })}
                        min={1}
                        max={17} />

                </PanelBody>
            </InspectorControls>
        );
    }
}