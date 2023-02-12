import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import Inspector from "./components/Inspector"
import { Map, Cluster } from "../shared/components/Map"
import './editor.scss'
import Resizable from "../shared/components/Resizable"

export default function Edit(props) {
    const { attributes, setAttributes, toggleSelection } = props;
    const { markers } = attributes;

    const defaultPosition = [51.505, -0.09]
    const handleZoom = () => { }
    const handleHeight = (height) => setAttributes({ height })

    return (
        <div {...useBlockProps()}>
            <Inspector {...props} />
            <Resizable
                height={attributes.height}
                setHeight={handleHeight}
                toggleSelection={toggleSelection}
            >
                <Map
                    disableScrollZoom={attributes.disableScrollZoom}
                    position={defaultPosition}
                    zoom={10}
                    themeUrl={attributes.themeUrl}
                    height={attributes.height}
                    setZoom={handleZoom}
                >
                    <Cluster markers={markers} />
                </Map>
            </Resizable>
        </div>
    )
}
