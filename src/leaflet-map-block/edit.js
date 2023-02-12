import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import Inspector from "./components/Inspector"
import Resizable from "../shared/components/Resizable"
import { Map, Marker } from "../shared/components/Map"
import Search from '../shared/components/Search'

import './editor.scss'

export default function Edit(props) {
    const { attributes, setAttributes, toggleSelection, isSelected } = props;
    const position = [attributes.lat, attributes.lng];

    const handleMoveend = ({ lng, lat }) => setAttributes({ lng, lat })
    const handleZoom = (zoom) => setAttributes({ zoom })
    const handleHeight = (height) => setAttributes({ height })
    const handleSearch = ({ lat, lng }) => setAttributes({ lat, lng })

    return (
        <div {...useBlockProps()}>
            <Inspector {...props} />

            {isSelected && <Search onSearch={handleSearch} />}

            <Resizable
                height={attributes.height}
                setHeight={handleHeight}
                toggleSelection={toggleSelection}
            >
                <Map
                    disableScrollZoom={attributes.disableScrollZoom}
                    position={position}
                    zoom={attributes.zoom}
                    themeUrl={attributes.themeUrl}
                    height={attributes.height}
                    setZoom={handleZoom}
                >
                    <Marker
                        position={position}
                        draggable
                        onMoveend={handleMoveend}
                    >
                        {attributes.content}
                    </Marker>
                </Map>
            </Resizable>
        </div>
    )
}
