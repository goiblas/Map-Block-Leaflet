import { BaseControl } from "@wordpress/components";

const noop = () => { }
const ThemePicker = ({ label, value, themes = [], onChange = noop }) => (
	<BaseControl label={label} >
		<div className="theme-picker-wrapper">
			{themes.map(theme => {
				return (
					<button
						key={theme.url}
						onClick={() => onChange(theme)}
						aria-pressed={value === theme.id}
						className="theme-picker-button"
					>
						<img src={theme.image} alt="" width="110" height="82" />
						<div className="theme-picker-name-button">{theme.name}</div>
					</button>
				)
			})}
		</div>
	</BaseControl>
)

export default ThemePicker
