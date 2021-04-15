import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { Button, Modal, TextareaControl  } from "@wordpress/components";
import Place from 'react-algolia-places';
import { Map, Marker } from "../../../components/Map"

const Content = ({ text: initialContent, onChange }) => {
    const [ content, setContent ] = useState(initialContent);

    const handleBlur = () =>  onChange(content)

    return (
        <TextareaControl 
        label={__( 'Content', 'map-block-leaflet' )}
        value={ content }
        onChange={ setContent }
        onBlur={ handleBlur }
        help={__( 'You can use html tags', 'map-block-leaflet' )}
        />
    )
}

const EditorMarker = ( props ) => {
    const [ label, setLabel ] = useState(props.label);
    const [ content, setContent ] = useState(props.content);
    const [ latlng, setLatlng ] = useState(props.latlng);

    const createMarker = () => {
        const response = { latlng, label, content }
        if( props.id !== undefined ) {
            response.id = props.id
        }
        props.onSave( response );
    }

    const handleChange = ({suggestion} = {}) => {
        if(suggestion) {
            setLabel(suggestion.value);
            setLatlng(suggestion.latlng);
        }
    }
    
    return (
        <Modal
            title={ props.title }
            onRequestClose={ props.onClose }>
            <div style={{width: 680, maxWidth: "100%"}}>
                <Place onChange={ handleChange }/>
                <div style={{  marginBottom: 16, height: 350 }}>
                    <Map 
                        position={latlng}
                        zoom={ 13 }
                        themeUrl={props.themeUrl}
                        height={ 350 }
                        >
                        <Marker position={latlng}>
                            <div dangerouslySetInnerHTML={{__html: content}} />
                        </Marker>
                    </Map>        
               </div>
                <Content text={ content } onChange={ setContent } />
                <div>
                    <Button disabled={!label} isPrimary onClick={ createMarker }> {__( 'Accept', 'map-block-leaflet' )} </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EditorMarker