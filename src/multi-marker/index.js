import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import edit from './edit';
import metadata from './block.json';
import Icon from './components/Icon';

registerBlockType(metadata.name, {
    edit,
    icon: Icon,
    save: () => null,
});
