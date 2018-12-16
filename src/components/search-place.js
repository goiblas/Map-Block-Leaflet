
const { __ } = wp.i18n;
const { Component } = wp.element;

import Place from 'react-algolia-places';
import classnames from 'classnames';

export default class SearchPlace extends Component {
    onChange({suggestion} = {}) {
        if(suggestion) {
            const {latlng, value} = suggestion;
            const { setAttributes } = this.props;
            setAttributes({...latlng, content: value});
        }
    }
    render(){
        const {isSelected} = this.props;
        return (
        <div className={classnames("map-block-leaflet-header", {'is-map-block-leaflet-selected': isSelected})} >
            <Place onChange={ ev => this.onChange(ev)}/>
        </div>
        )
    }
}
