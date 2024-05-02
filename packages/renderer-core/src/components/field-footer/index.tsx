/**
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import EditableBlockFooter from './editable';
import NonEditableBlockFooter from './non-editable';
import { __experimentalUseFieldRenderContext } from '../field-render';

/**
 * External Dependencies
 */
import { TailSpin as Loader } from 'react-loader-spinner';
import { useBlockTheme } from '../../hooks';
import { css } from 'emotion';
import ParentBlockFooter from './parent';

export interface BlockFooterProps {
	shakingErr: string | null;
	isPending: boolean;
}
const BlockFooter: React.FC< BlockFooterProps > = ( {
	shakingErr,
	isPending,
} ) => {
	const { id, blockName, attributes } = __experimentalUseFieldRenderContext();
	const blockTheme = useBlockTheme( attributes?.themeId );
	if ( ! blockName ) return null;
	const { isEditable, isParent } = useSelect( ( select ) => {
		return {
			isEditable: select( 'quillForms/blocks' ).hasBlockSupport(
				blockName,
				'editable'
			),
			isParent: select( 'quillForms/blocks' ).hasBlockSupport(
				blockName,
				'innerBlocks'
			),
		};
	} );
	return (
		<div className="renderer-core-field-footer">
			{ isPending ? (
				<div
					className={ css`
						margin: 10px;
					` }
				>
					<Loader
						color={ blockTheme.answersColor }
						height={ 30 }
						width={ 30 }
					/>
				</div>
			) : (
				<>
					{ isParent ? (
						<ParentBlockFooter />
					) : (
						<>
							{ ! isEditable ? (
								<NonEditableBlockFooter />
							) : (
								<EditableBlockFooter
									id={ id }
									shakingErr={ shakingErr }
								/>
							) }
						</>
					) }
				</>
			) }
		</div>
	);
};
export default BlockFooter;
