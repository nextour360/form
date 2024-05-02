/**
 * QuillForms Dependencies
 */
import type { IconRenderer } from '@quillforms/types';

/**
 * External Dependencies
 */
import BlockIconBox from '../../../block-icon-box';

/**
 * Internal Dependencies
 */

interface Props {
	label: string;
	iconBox?: {
		icon?: IconRenderer;
		color?: string;
	};
	hasSection?: boolean;
	order?: string;
}

const Option: React.FC< Props > = ( { label, iconBox, hasSection, order } ) => {
	return (
		<div
			className={
				'combobox-control-select-option' +
				( hasSection
					? ' combobox-control-select-option-has_section'
					: '' )
			}
		>
			{ !! iconBox && (
				<BlockIconBox
					order={ order }
					icon={ iconBox.icon }
					color={ iconBox.color }
				/>
			) }
			<div
				className="combobox-control-select-option-label"
				dangerouslySetInnerHTML={ { __html: label } }
			></div>
		</div>
	);
};

export default Option;
