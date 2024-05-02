/**
 * QuillForms Dependencies
 */
import { TextControl, Button } from '@quillforms/admin-components';

/**
 * WordPress Dependencies
 */
import { useState } from 'react';
import { useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { AccountsAuthFields, AccountsLabels, Provider } from '../../../types';

interface Props {
	provider: Provider;
	onAdding?: (status: boolean) => void;
	onAdded: (id: string, account: { name: string }) => void;
	labels?: AccountsLabels;
	fields?: AccountsAuthFields;
	Instructions?: React.FC;
}

const Credentials: React.FC<Props> = ({
	provider,
	onAdding,
	onAdded,
	labels,
	fields,
	Instructions,
}) => {
	fields = fields ?? {
		api_key: { label: provider.label + ' API Key', type: 'text' },
	};

	// state.
	const [inputs, setInputs] = useState({});
	const [submitting, setSubmitting] = useState(false);

	// dispatch notices.
	const { createSuccessNotice, createErrorNotice } =
		useDispatch('core/notices');

	// submit.
	const submit = () => {
		setSubmitting(true);
		if (onAdding) onAdding(true);
		apiFetch({
			path: `/qf/v1/addons/${provider.slug}/accounts`,
			method: 'POST',
			data: {
				credentials: inputs,
			},
		})
			.then((res: any) => {
				createSuccessNotice(
					'✅ ' +
					(labels?.singular ?? __('Account', 'quillforms')) +
					' ' +
					__('added successfully!', 'quillforms'),
					{
						type: 'snackbar',
						isDismissible: true,
					}
				);
				onAdded(res.id, { name: res.name });
				setInputs({});
			})
			.catch((err) => {
				createErrorNotice(
					'⛔ ' +
					(err.message ??
						__('Error in adding the ', 'quillforms') +
						(
							labels?.singular ??
							__('Account', 'quillforms')
						).toLowerCase()),
					{
						type: 'snackbar',
						isDismissible: true,
					}
				);
			})
			.finally(() => {
				setSubmitting(false);
				if (onAdding) onAdding(false);
			});
	};

	let inputsFilled = true;
	for (const key of Object.keys(fields)) {
		if (!inputs[key]) {
			inputsFilled = false;
			break;
		}
	}

	return (
		<div className="integration-auth-credentials">
			{Object.entries(fields).map(([key, field]) => (
				<TextControl
					key={key}
					label={field.label}
					value={inputs[key] ?? ''}
					onChange={(value) =>
						setInputs({ ...inputs, [key]: value })
					}
					disabled={submitting}
				/>
			))}
			<Button
				isPrimary
				onClick={submit}
				disabled={!inputsFilled || submitting}
			>
				{__('Add', 'quillforms-hubspot')}
			</Button>
			{Instructions && (
				<div className="integration-auth-instructions">
					<Instructions />
				</div>
			)}
		</div>
	);
};

export default Credentials;
