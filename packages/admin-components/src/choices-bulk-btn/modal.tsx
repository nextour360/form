/**
 * WordPress Dependencies.
 */
import { Modal } from '@wordpress/components';
import { useRef, useState, useEffect } from 'react';
/**
 * External Dependencies
 */
import { css } from 'emotion';
import classnames from 'classnames';
import { Oval as Loader } from 'react-loader-spinner';

/**
 * Internal Dependencies
 */
import Button from '../button';

interface Props {
	onCloseModal: () => void;
	onInsert: ( val: string ) => void;
}
const ChoicesBulkModal: React.FC< Props > = ( { onCloseModal, onInsert } ) => {
	const [ isInserting, setIsInserting ] = useState( false );
	const [ bulkChoicesTxt, setBulkChoicesTxt ] = useState( '' );
	const ref = useRef< HTMLTextAreaElement | null >( null );

	useEffect( () => {
		if ( ref?.current ) {
			ref.current.focus();
		}
	} );
	return (
		<Modal
			className={ classnames(
				'admin-components-choices-bulk-modal',
				css`
					border: none !important;
					min-width: 350px !important;
					border-radius: 10px;
					z-index: 1111111;

					.components-modal__content {
						display: flex;
						flex-direction: column;
						justify-content: center;
						background: #eee;
						margin-top: 54px;
						min-height: 300px;
					}

					.components-modal__header {
						background: #313e57;
						.components-modal__header-heading {
							color: #fff;
						}
						.components-button.has-icon svg {
							fill: #fff;
						}
					}
				`
			) }
			title="Bulk Choices"
			onRequestClose={ onCloseModal }
		>
			<p
				className={ css`
					marging-bottom: 10px;
				` }
			>
				<strong>Insert each answer choice in a separate line </strong>
			</p>
			<textarea
				ref={ ref }
				className={ css`
					width: 100%;
					height: 170px;
					overflow-y: auto;
					resize: none;
				` }
				onChange={ ( e ) => setBulkChoicesTxt( e.target.value ) }
				value={ bulkChoicesTxt }
			/>
			<div
				className={ css`
					display: flex;
					margin-top: 10px;
					justify-content: flex-end;
				` }
			>
				<Button
					isDefault
					isLarge
					className={ css`
						margin-right: 10px !important;
					` }
					onClick={ onCloseModal }
				>
					Cancel
				</Button>
				<Button
					isLarge
					className={ css`
						width: 70px;
						display: flex;
						justify-content: center;
						align-items: center;
					` }
					onClick={ () => {
						if ( isInserting ) return;
						setIsInserting( true );
						onInsert( bulkChoicesTxt );
						setTimeout( () => {
							setIsInserting( false );
							onCloseModal();
						}, 0 );
					} }
					isPrimary
				>
					Done
					<>
						{ isInserting && (
							<div
								className={ css`
									display: flex;
									justify-content: center;
									align-items: center;
									margin: 0px 10px;
								` }
							>
								<Loader
									color="#00BFFF"
									height={ 15 }
									width={ 15 }
								/>
							</div>
						) }
					</>
				</Button>
			</div>
		</Modal>
	);
};

export default ChoicesBulkModal;
