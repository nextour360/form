/**
 * External Dependencies
 */
import { css } from 'emotion';
import { BlockTypesListDropdown } from '@quillforms/admin-components';

const DropAreaPlaceholder: React.FC = () => {
	return (
		<div
			className={ css`
				display: flex;
				align-items: center;
				padding: 20px;
			` }
		>
			<BlockTypesListDropdown destinationIndex={ 0 } color="primary" />
			<span
				className={ css`
					font-size: 14px;
				` }
			>
				Add your first question
			</span>
		</div>
	);
};

export default DropAreaPlaceholder;
