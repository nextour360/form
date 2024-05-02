import { render } from '@wordpress/element';
import '@wordpress/core-data';
import '@wordpress/notices';
import '@quillforms/blocks';
import '@quillforms/rich-text';
import '@quillforms/form-integrations';
import '@quillforms/payment-gateways';
import '@quillforms/code-editor';
import "@quillforms/quiz-editor";
import PageLayout from './layout';
import './style.scss';
import './pro-panels';
import { doAction } from '@wordpress/hooks';

const appRoot = document.getElementById('qf-admin-root');
render(<PageLayout />, appRoot);

doAction('QuillForms.Admin.PluginsLoaded');
