const { __ } = wp.i18n;
const { Component } = wp.element;

import  { createRef } from 'react';
import LeafletMap from './leaflet-map';
import ResizableBox from 're-resizable';


export default class ResizableMap extends Component {
    constructor(props) {
        super(props);
        this.mapRef = createRef();
    }
    invalidateMapSize() {
        this.mapRef.current.invalidateSize();
    }
    componentDidUpdate(prevProps) {

        const lastHeight = prevProps.attributes.height;
        const currentHeight = this.props.attributes.height;
    
        if( lastHeight !== currentHeight) {
            this.invalidateMapSize();
        }

    }
    render(){
        const { attributes, toggleSelection, setAttributes, isSelected } = this.props;
        const { height } = attributes;
        
        return (
                <ResizableBox
                    className="is-selected"
                    size={ {
                        width: '100%',
                        height: height,
                    } }
                    minWidth= { '100%' }
                    maxWidth= { '100%' }
                    minHeight= { '100%' }
                    enable={ { top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: true, topLeft: false } }
                    onResizeStart={ () => {
                        toggleSelection( false );
                    } }
                    onResizeStop={ ( event, direction, elt, delta ) => {
                        setAttributes( {
                            height: parseInt( height + delta.height, 10 ),
                        } );
                        toggleSelection( true );
                    } }
                >
                    <LeafletMap ref={this.mapRef} {...this.props} /> 
                    {isSelected && <div className="resizable-handle"></div> }
                </ResizableBox>
        )
    }
}