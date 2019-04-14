import classnames from 'classnames';

const { Component } = wp.element;
const { BaseControl } = wp.components;

export default class ThemePicker extends Component {
    render() {
        const { label } = this.props;

        return (
            <fieldset>
                <legend>{label}</legend>
                <div className="theme-picker-grid"></div>
                <div>
                    <input type="radio" name="format" id="txt" value="txt" checked />
                    <label for="txt">Text file</label>
                </div>
                <div>
                    <input type="radio" name="format" id="csv" value="csv" />
                    <label for="csv">CSV file</label>
                </div>
            </fieldset>
        );
    }
}