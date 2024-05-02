/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { removep } from '@wordpress/autop';

/**
 * External Dependencies
 */
import classNames from 'classnames';
import { css } from 'emotion';
/**
 * Internal Dependencies
 */
import HTMLParser from '../html-parser';
import { __experimentalUseFieldRenderContext } from '../field-render/context';
import useBlockTheme from '../../hooks/use-block-theme';

const BlockDesc: React.FC = () => {
	const { attributes } = __experimentalUseFieldRenderContext();
	if ( ! attributes || ! attributes.description ) return null;
	const theme = useBlockTheme( attributes.themeId );
	const description = removep( attributes?.description );
	return (
		<Fragment>
			{ description && description !== '' && (
				<div
					className={ classNames(
						'renderer-components-block-description',
						css`
							color: ${ theme.questionsColor };
							font-family: ${ theme.questionsDescriptionFont };
							@media ( min-width: 768px ) {
								font-size: ${ theme.questionsDescriptionFontSize
									.lg } !important;
								line-height: ${ theme
									.questionsDescriptionLineHeight
									.lg } !important;
							}
							@media ( max-width: 767px ) {
								font-size: ${ theme.questionsDescriptionFontSize
									.sm } !important;
								line-height: ${ theme
									.questionsDescriptionLineHeight
									.sm } !important;
							}
						`
					) }
				>
					<HTMLParser value={ description } />
				</div>
			) }
		</Fragment>
	);
};
export default BlockDesc;
