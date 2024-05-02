/**
 * WordPress Dependencies
 */
import { useRef, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * External Dependencies
 */
import { cx, css } from 'emotion';
import { useSlate, useFocused } from 'slate-react';
import { Editor, Range } from 'slate';

/**
 * Internal Dependencies
 */
import Link from '../link';
import FormatButton from '../format-button';
import FormatBoldIcon from './bold-icon';
import FormatItalicIcon from './italic-icon';
interface Props {
	className: string;
	[ key: string ]: unknown;
}

const Menu = forwardRef< HTMLDivElement, React.PropsWithChildren< Props > >(
	( { className, ...props }, ref ) => (
		<div
			{ ...props }
			ref={ ref }
			className={ cx(
				className,
				css`
					& > * {
						display: inline-block;
					}
					& > * + * {
						margin-left: 15px;
					}
				`
			) }
		/>
	)
);

const HoveringToolbar = ( {
	toggleFormat,
	isFormatActive,
	formattingControls,
} ) => {
	const ref = useRef< HTMLDivElement | null >( null );
	const editor = useSlate();
	const inFocus = useFocused();
	useEffect( () => {
		const el = ref.current;
		const { selection } = editor;

		if ( ! el ) {
			return;
		}

		if (
			! selection ||
			! inFocus ||
			Range.isCollapsed( selection ) ||
			Editor.string( editor, selection ) === ''
		) {
			el.removeAttribute( 'style' );
			return;
		}

		const domSelection = window.getSelection();
		const domRange = domSelection?.getRangeAt( 0 );
		const rect = domRange?.getBoundingClientRect();
		el.style.opacity = '1';
		if ( rect ) {
			el.style.top = `${
				rect.top + window.pageYOffset - el.offsetHeight
			}px`;
			el.style.left = `${
				rect.left +
				window.pageXOffset -
				el.offsetWidth / 2 +
				rect.width / 2
			}px`;
		}
	} );

	return createPortal(
		<Menu
			ref={ ref }
			className={ css`
				padding: 8px 7px 6px;
				position: absolute;
				z-index: 1;
				top: -10000px;
				left: -10000px;
				margin-top: -6px;
				opacity: 0;
				background-color: #222;
				border-radius: 4px;
				transition: opacity 0.75s;

				svg {
					width: 20px;
				}
			` }
		>
			{ !! formattingControls && formattingControls.includes( 'bold' ) && (
				<FormatButton
					format="bold"
					toggleFormat={ () => toggleFormat( 'bold' ) }
					isFormatActive={ () => isFormatActive( 'bold' ) }
				>
					<FormatBoldIcon />
				</FormatButton>
			) }
			{ !! formattingControls &&
				formattingControls.includes( 'italic' ) && (
					<FormatButton
						format="italic"
						toggleFormat={ () => toggleFormat( 'italic' ) }
						isFormatActive={ () => isFormatActive( 'italic' ) }
					>
						<FormatItalicIcon />
					</FormatButton>
				) }
			{ !! formattingControls &&
				formattingControls.includes( 'link' ) && (
					<Link editor={ editor } />
				) }
		</Menu>,
		document.body
	);
};
export default HoveringToolbar;
