import { ResizableBox } from '@wordpress/components';

const Resizable = ( { height, setHeight, toggleSelection, children } ) => (
    <ResizableBox
        size={ {
            width: '100%',
            height: height,
        } }
        minWidth='100%'
        maxWidth='100%'
        minHeight={ 50 }
        enable={ {   bottom: true } }
        onResizeStart={ () => {
            toggleSelection( false );
        } }
        onResizeStop={ ( _event, _direction, _elt, delta ) => {
            setHeight(  parseInt( height + delta.height, 10 ) );
            toggleSelection( true );
        } }
    >
        {children}
    </ResizableBox>
)

export default Resizable