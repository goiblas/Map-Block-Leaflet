import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
    Button, Modal, TextareaControl, TextControl, RangeControl,
    PanelBody, PanelRow
} from "@wordpress/components";
import { Map, Marker } from "../../shared/components/Map"
import Search from '../../shared/components/Search'
import ImageUpload from '../../shared/components/ImageUpload';

const EditorMarker = (props) => {
    const [content, setContent] = useState(props.content);
    const [latlng, setLatlng] = useState(props.latlng);
    const [label, setLabel] = useState(props.label);
    const [markerImage, setMarkerImage] = useState(props.markerImage);
    const [markerSize, setMarkerSize] = useState(props.markerSize ?? 36);

    const createMarker = () => {
        const response = { latlng, label, content, markerImage, markerSize }

        if (props.id !== undefined) {
            response.id = props.id
        }
        props.onSave(response);
    }

    const searchHandler = ({ lat, lng, label }) => {
        setLabel(label);
        setLatlng([lat, lng]);
    }

    const handleMoveend = ({ lng, lat }) => setLatlng([lat, lng]);

    const lat = latlng[0];
    const lng = latlng[1];

    const hasValidMarker = [lat, lng].every(Number.isFinite);

    const customIcon = markerImage ? {
        url: markerImage.url,
        width: markerSize,
        height: markerImage.height / markerImage.width * markerSize
    } : null

    return (
        <Modal
            title={props.title}
            onRequestClose={props.onClose}>
            <div style={{ width: 680, maxWidth: "100%" }}>
                <Search onSearch={searchHandler} />

                <div style={{ marginBottom: 16, height: 350 }}>
                    <Map
                        position={latlng}
                        zoom={13}
                        themeUrl={props.themeUrl}
                        height={350}
                    >
                        <Marker
                            position={latlng}
                            draggable
                            onMoveend={handleMoveend}
                            customIcon={customIcon}
                        >
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </Marker>
                    </Map>
                </div>


                <PanelBody title={__('Details', 'map-block-leaflet')} initialOpen={true}>
                    <PanelRow>
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ marginBottom: 20 }}>
                                <TextControl
                                    label={__('Label', 'map-block-leaflet')}
                                    onChange={setLabel}
                                    value={label}
                                    help={__('This text will not be displayed on the web, it is to facilitate the identification of the marker.', 'map-block-leaflet')}
                                />
                            </div>

                            <div className="map-block-leaflet-inputs-row">
                                <TextControl
                                    label={__('Latitude', 'map-block-leaflet')}
                                    onChange={newLat => setLatlng([Number(newLat), lng])}
                                    type="number"
                                    value={lat}
                                />

                                <TextControl
                                    label={__('Longitude', 'map-block-leaflet')}
                                    onChange={newLng => setLatlng([lat, Number(newLng)])}
                                    type="number"
                                    value={lng}
                                />
                            </div>

                            <TextareaControl
                                label={__('Content', 'map-block-leaflet')}
                                value={content}
                                onChange={setContent}
                                help={__('You can use html tags', 'map-block-leaflet')}
                            />
                        </div>
                    </PanelRow>
                </PanelBody>
                <PanelBody title={__('Custom marker', 'map-block-leaflet')} initialOpen={false}>
                    <PanelRow>
                        <div style={{ flexGrow: 1, paddingTop: 12 }}>
                            <div className="map-block-leaflet-inputs-row">
                                <div style={{ padding: "8px 0" }}>
                                    <ImageUpload
                                        image={markerImage}
                                        onSelect={setMarkerImage}
                                    />
                                </div>

                                <RangeControl
                                    label={__('Marker size', 'map-block-leaflet')}
                                    value={markerSize}
                                    disabled={!markerImage}
                                    onChange={setMarkerSize}
                                    min={10}
                                    max={200}
                                />
                            </div>
                        </div>
                    </PanelRow>
                </PanelBody>

                <div style={{ paddingTop: 24 }}>
                    <Button disabled={!hasValidMarker} variant="primary" onClick={createMarker}> {__('Accept', 'map-block-leaflet')} </Button>
                </div>
            </div>
        </Modal >
    )
}

export default EditorMarker