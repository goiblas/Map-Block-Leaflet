import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { Button, Modal, TextareaControl, TextControl } from "@wordpress/components";
import { Map, Marker } from "../../shared/components/Map"
import Search from '../../shared/components/Search'

const Content = ({ text: initialContent, onChange }) => {
    const [content, setContent] = useState(initialContent);

    const handleBlur = () => onChange(content)

    return (
        <TextareaControl
            label={__('Content', 'map-block-leaflet')}
            value={content}
            onChange={setContent}
            onBlur={handleBlur}
            help={__('You can use html tags', 'map-block-leaflet')}
        />
    )
}

const EditorMarker = (props) => {
    const [content, setContent] = useState(props.content);
    const [latlng, setLatlng] = useState(props.latlng);

    const createMarker = () => {
        const response = { latlng, label: "label ---", content }
        if (props.id !== undefined) {
            response.id = props.id
        }
        props.onSave(response);
    }

    const searchHandler = ({ lat, lng }) => {
        setLatlng([lat, lng]);
    }

    const handleMoveend = ({ lng, lat }) => setLatlng([lat, lng]);

    const lat = latlng[0];
    const lng = latlng[1];

    const hasValidMarker = [lat, lng].every(Number.isFinite) && content.length > 0;

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
                        >
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </Marker>
                    </Map>
                </div>

                <div className="map-block-leaflet-inputs-row">
                    <TextControl
                        label={__('Latitude', 'map-block-leaflet')}
                        id="map-block-leaflet-text-control-lat"
                        onChange={newLat => setLatlng([Number(newLat), lng])}
                        type="number"
                        value={lat}
                    />

                    <TextControl
                        label={__('Longitude', 'map-block-leaflet')}
                        onChange={newLng => setLatlng([lat, Number(newLng)])}
                        id="map-block-leaflet-text-control-lon"
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

                <div>
                    <Button disabled={!hasValidMarker} variant="primary" onClick={createMarker}> {__('Accept', 'map-block-leaflet')} </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EditorMarker