const { Component } = wp.element;
const { BaseControl } = wp.components;

export default class ThemePicker extends Component {
	render() {
		const {
			label,
			value,
			themes,
			onChange = () => {},
		} = this.props;

		return (
			<BaseControl label={ label } >
				<div className="theme-picker-wrapper">
					{ themes && themes.map( ( theme, i ) => {
						return (
							<button
								key={ `theme-picker-${ i }` }
								onClick={ () => onChange( theme ) }
								aria-pressed = { value === theme.id } 
								className = "theme-picker-button"
							>                            
								<img src={ theme.image } alt=""/>
								<div className="theme-picker-name-button">{ theme.name }</div>
							</button>
						);
					} ) }
				</div>
			</BaseControl>
		);
	}
}