import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { Button } from "@wordpress/components";
import EditorMarker from "./EditorMarkers";

const initialMarkesToState = markers => {
    return markers.reverse().map((props, id) => ({id, ...props}))
}

const exportStateToMarkers = markers => {
    return [...markers.reverse().map( ({ id, ...props }) => props)]
}

const ListMarkers = ({ markers: initialMarkes, onChange, themeUrl }) => {
    const [markers, setMarkers] = useState([])
    const [isOpen, setOpen ] = useState(false)
    const [currentMarker, setCurrentMarker ] = useState({})

    useEffect(() => {
        setMarkers(initialMarkesToState(initialMarkes))
    }, [initialMarkes])

    const handleEdit = id => {
        const marker = markers.find( marker => marker.id === id);
        setCurrentMarker(marker);
        setOpen(true);
    }

    const handleDelete = id => {
        const markersFiltered = markers.filter(attrs => attrs.id !== id)
        onChange(exportStateToMarkers(markersFiltered))
    }

    const handleSave = newMarker => {
        const markersEdited = markers.map(marker => marker.id === newMarker.id ? newMarker : marker)
        setMarkers(markersEdited)
        onChange(exportStateToMarkers(markersEdited))
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
        setCurrentMarker({});
    }

    return (
        <>
        {isOpen && (
            <EditorMarker title={__( 'Edit marker', 'map-block-leaflet' )} onSave={handleSave} onClose={handleClose} themeUrl={themeUrl} {...currentMarker}/>
        )}
        {markers.map((attrs) => (
            <div className="map-block-leaflet-list-item" key={attrs.id}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 20" fill="#cfcfcf"><path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z"></path></svg>
                </div>
                <div>
                    <div>{attrs.label}</div>
                    <div className="map-block-leaflet-list-item-action">
                        <Button isLink isSecondary onClick={ () => handleEdit(attrs.id)}>{__( 'Edit', 'map-block-leaflet' )}</Button>
                        <Button isLink isDestructive onClick={ () => handleDelete(attrs.id)}>{__( 'Delete', 'map-block-leaflet' )}</Button>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default ListMarkers