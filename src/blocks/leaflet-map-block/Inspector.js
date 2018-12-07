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
    constructor(props){
        super(props);
        this.divider = 2000;
    }
    setTheme(themeId) {
        const { setAttributes } = this.props;
        const themeSelected = providers.find( provider => provider == themeId);

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
                    label={__('Content of tooltip', 'leaflet-map-block')}
                        onChange={ content => setAttributes({content})}
                        value={content}
                    />
                </PanelBody>
                <PanelBody title={__('Theme', 'leaflet-map-block')} initialOpen={false}>
                <SelectControl
                    label={__('Select theme', 'leaflet-map-block')}
                    value={ themeId }
                    options={ 
                        providers.map( provider => {
                            return {
                                label: provider.name,
                                value: provider.id
                            }
                        })
                    }
                    onChange={  themeId  =>  setAttributes({themeId: Number(themeId)})  }
                />
                </PanelBody>
                <PanelBody title={__('Position', 'leaflet-map-block')} initialOpen={false}>
                    <label class="blocks-base-control__label" for="leaflet-map-block-text-control-lat">{__('latitude', 'leaflet-map-block')}</label>
                    <TextControl 
                        id="leaflet-map-block-text-control-lat"
                        onChange={ lat => setAttributes({lat})}
                        type="number"
                        value={lat}
                    />
                    <label class="blocks-base-control__label" for="leaflet-map-block-text-control-lon">{__('longitude', 'leaflet-map-block')}</label>
                    <TextControl 
                        onChange={ lng => setAttributes(lng)}
                        id="leaflet-map-block-text-control-lon"
                        type="number"
                        value={lng}
                    />
                    <RangeControl
                        label={__("Zoom", "leaflet-map-block")}
                        value={zoom}
                        onChange={zoom => setAttributes({ zoom })}
                        min={1}
                        max={17} />

                </PanelBody>
            </InspectorControls>
        );
    }
}