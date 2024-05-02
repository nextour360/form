/**
 * QuillForms Dependencies
 */
import { registerBuilderPanel } from '@quillforms/builder-panels';

/**
 * Internal Dependencies
 */
import render from '../components/panel-render';
import Icon from './icon';
registerBuilderPanel( 'code', {
	title: 'Custom CSS',
	icon: Icon,
	mode: 'single',
	areaToShow: 'preview-area',
	render,
} );
