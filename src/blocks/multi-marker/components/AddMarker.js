import { useState } from "@wordpress/element";
import { Button  } from "@wordpress/components";
import EditorMarker from "./EditorMarkers";
import { __ } from "@wordpress/i18n";

const cleanMarker = {
    label: "",
    content: "",
    latlng: [51.505, -0.09]
}
const AddMarker = ({ onCreate, themeUrl }) => {
    const [ isOpen, setOpen ] = useState( false );
    const [ currentMarker, setCurrentMarker ] = useState(cleanMarker)

    const clearEditor = () => {
        setOpen(false);
        setCurrentMarker(cleanMarker);
    }
    const handleSave = newMarker => {
        onCreate(newMarker);
        clearEditor();
    }


    const handleClick = () => setOpen(true);

    return (
        <>
            <div style={{marginBottom: "1rem"}}>
                <Button isPrimary onClick={ handleClick }>{__( 'Add marker', 'map-block-leaflet' )}</Button>
            </div>
            {isOpen && (
                <EditorMarker 
                    title={__( 'Add new marker', 'map-block-leaflet' )}
                    onSave={handleSave}
                    onClose={clearEditor}
                    themeUrl={themeUrl}
                    {...currentMarker}/>
            )}
        </>
    )
}

export default AddMarker