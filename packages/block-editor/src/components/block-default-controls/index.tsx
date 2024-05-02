/**
 * QuillForms Dependencies
 */
import {
	ToggleControl,
	BaseControl,
	ComboboxControl,
	ControlWrapper,
	ControlLabel,
	TextControl,
} from '@quillforms/admin-components';

// @ts-expect-error
import { ThemeCard, ThemeListItem } from '@quillforms/theme-editor';
import type { BlockAttributes } from '@quillforms/types';

/**
 * WordPress Dependencies
 */
import { FocalPointPicker, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Fragment } from 'react';
import { MediaUpload } from '@wordpress/media-utils';

/**
 * External Dependencies
 */
import { isEmpty } from 'lodash';
import { css } from 'emotion';
/**
 * Internal Dependencies
 */
import BlockThemeControl from '../block-theme';
import CustomHTML from '../block-custom-html';
import BlockLayout from '../block-layout';
import BorderRadiusTemplates from '../border-radius-templates';
interface Props {
	blockName: string;
	attributes?: BlockAttributes;
	setAttributes: (x: Record<string, unknown>) => void;
	parentId?: String;
}
const DefaultControls: React.FC<Props> = ({
	blockName,
	parentId,
	attributes,
	setAttributes,
}) => {
	const {
		editableSupport,
		requiredSupport,
		attachmentSupport,
		themeSupport,
		defaultValueSupport,
		numericSupport,
		placeholderSupport,
	} = useSelect((select) => {
		return {
			editableSupport: select('quillForms/blocks').hasBlockSupport(
				blockName,
				'editable'
			),
			requiredSupport: select('quillForms/blocks').hasBlockSupport(
				blockName,
				'required'
			),
			attachmentSupport: select('quillForms/blocks').hasBlockSupport(
				blockName,
				'attachment'
			),
			themeSupport: select('quillForms/blocks').hasBlockSupport(
				blockName,
				'theme'
			),
			defaultValueSupport: select('quillForms/blocks').hasBlockSupport(
				blockName,
				'defaultValue'
			),
			placeholderSupport: select('quillForms/blocks').hasBlockSupport(
				blockName,
				'placeholder'
			),
			numericSupport: select('quillForms/blocks').hasBlockSupport(
				blockName,
				'numeric'
			),
		};
	});
	let required, attachment, blockTheme, defaultValue;
	if (attributes) {
		required = attributes.required;
		attachment = attributes.attachment;
		blockTheme = attributes.themeId;
		defaultValue = attributes.defaultValue ?? '';
	}
	return (
		<Fragment>
			{editableSupport && requiredSupport && (
				<BaseControl>
					<ControlWrapper>
						<ControlLabel label={'Required'} />
						<ToggleControl
							checked={required}
							onChange={() =>
								setAttributes({
									required: !required,
								})
							}
						/>
					</ControlWrapper>
				</BaseControl>
			)}

			{attachmentSupport && !parentId && (
				<>
					<BaseControl>
						<ControlWrapper>
							<ControlLabel label={'Image'} />
							{isEmpty(attachment) ? (
								<MediaUpload
									onSelect={(media) =>
										setAttributes({
											attachment: {
												type: 'image',
												url: media.url,
											},
										})
									}
									allowedTypes={['image']}
									render={({ open }) => (
										<button
											className="media-upload-btn"
											onClick={open}
										>
											Add
										</button>
									)}
								/>
							) : (
								<button
									className="remove-media-btn"
									onClick={() =>
										setAttributes({
											attachment: {},
										})
									}
									color="secondary"
								>
									Remove
								</button>
							)}
						</ControlWrapper>
					</BaseControl>
					<BaseControl>
						<ControlWrapper orientation="vertical">
							<ControlLabel label="Layout"></ControlLabel>
							<BlockLayout
								layout={attributes?.layout}
								setAttributes={setAttributes}
							/>
						</ControlWrapper>
					</BaseControl>

					{(attributes?.layout === 'split-left' ||
						attributes?.layout === 'split-right') &&
						attributes?.attachment?.url && (
							<BaseControl>
								<ControlWrapper orientation="vertical">
									<ControlLabel label="Focal Point Picker"></ControlLabel>
									<div
										className={css`
											max-width: 300px;
										` }
									>
										<FocalPointPicker
											url={attributes?.attachment?.url}
											value={
												attributes?.attachmentFocalPoint
											}
											onDragStart={(val) => {
												setAttributes({
													attachmentFocalPoint: val,
												});
											}}
											onDrag={(val) => {
												setAttributes({
													attachmentFocalPoint: val,
												});
											}}
											onChange={(val) => {
												setAttributes({
													attachmentFocalPoint: val,
												});
											}}
										/>
									</div>
								</ControlWrapper>
							</BaseControl>
						)}

					{(attributes?.layout === 'float-left' ||
						attributes?.layout === 'float-right' ||
						attributes?.layout === 'stack') &&
						attributes?.attachment?.url && (
							<>
								<BaseControl>
									<ControlWrapper orientation="horizontal">
										<ControlLabel label="Set Maximum Width for attachment" />
										<ToggleControl
											checked={
												attributes?.attachmentMaxWidth !==
												'none'
											}
											onChange={() => {
												if (
													attributes?.attachmentMaxWidth ===
													'none'
												) {
													setAttributes({
														attachmentMaxWidth:
															'200px',
													});
												} else {
													setAttributes({
														attachmentMaxWidth:
															'none',
													});
												}
											}}
										/>
									</ControlWrapper>
									<>
										{attributes.attachmentMaxWidth !==
											'none' && (
												<ControlWrapper orientation="vertical">
													<ControlLabel label="Maximum Width(px)" />
													<RangeControl
														value={parseInt(
															attributes?.attachmentMaxWidth?.replace(
																'px',
																''
															) ?? '0'
														)}
														onChange={(value) =>
															setAttributes({
																attachmentMaxWidth:
																	value + 'px',
															})
														}
														min={50}
														max={900}
													/>
												</ControlWrapper>
											)}
									</>
								</BaseControl>
								<BaseControl>
									<ControlWrapper orientation="horizontal">
										<ControlLabel label="Use Fancy Border Radius"></ControlLabel>
										<ToggleControl
											checked={
												attributes?.attachmentFancyBorderRadius
											}
											onChange={() => {
												if (
													attributes.attachmentFancyBorderRadius
												) {
													setAttributes({
														attachmentBorderRadius:
															'0px',
													});
												}
												setAttributes({
													attachmentFancyBorderRadius:
														!attributes.attachmentFancyBorderRadius,
												});
											}}
										/>
									</ControlWrapper>
									{attributes.attachmentFancyBorderRadius && (
										<ControlWrapper orientation="vertical">
											<ControlLabel label="Choose your favorite fancy border radius"></ControlLabel>
											<BorderRadiusTemplates
												onChange={(val) => {
													setAttributes({
														attachmentBorderRadius:
															val,
													});
												}}
												attachmentBorderRadius={
													attributes.attachmentBorderRadius
												}
											/>
										</ControlWrapper>
									)}
								</BaseControl>
							</>
						)}
				</>
			)}
			{defaultValueSupport && (
				<BaseControl>
					<ControlWrapper orientation="vertical">
						<ControlLabel label="Default Value" isNew />
						<div
							className={css`
								.combobox-control-rich-text-back {
									display: none;
								}
							` }
						>
							<ComboboxControl
								value={{ type: 'text', value: defaultValue }}
								onChange={(val) => {
									setAttributes({
										defaultValue: val?.value ?? '',
									});
								}}
								hideChooseOption={true}
								customize={(value) => {
									let { sections, options } = value;

									sections = sections.filter((section) =>
										[
											'hidden_fields',
											'variables',
										].includes(section.key)
									);

									options = options.filter((option) => {
										if (option.type === 'field') {
											return false;
										} else if (
											[
												'variable',
												'hidden_field',
											].includes(option.type)
										) {
											return true;
										}
										return false;
									});
									if (!numericSupport) {
										sections.push({
											key: 'user',
											label: 'Logged In User',
										});
										options.push({
											type: 'user',
											value: 'username',
											label: 'User username',
											isMergeTag: true,
										});
										options.push({
											type: 'user',
											value: 'email',
											label: 'User email',
											isMergeTag: true,
										});
										options.push({
											type: 'user',
											value: 'display_name',
											label: 'User display name',
											isMergeTag: true,
										});
									}
									return { sections, options };
								}}
							/>
						</div>
					</ControlWrapper>
				</BaseControl>
			)}
			{placeholderSupport && (
				<BaseControl>
					<ControlWrapper>
						<ControlLabel
							label={'Override default placeholder'}
							isNew
						/>
						<ToggleControl
							checked={attributes?.placeholder !== false}
							onChange={() =>
								setAttributes({
									placeholder:
										attributes?.placeholder === false
											? ''
											: false,
								})
							}
						/>
					</ControlWrapper>
					<>
						{attributes?.placeholder !== false && (
							<TextControl
								value={attributes?.placeholder}
								onChange={(val) => {
									setAttributes({
										placeholder: val,
									});
								}}
							/>
						)}
					</>
				</BaseControl>
			)}
			{!parentId && (
				<>
					<BaseControl>
						<ControlWrapper orientation="vertical">
							<ControlLabel label={'Custom HTML'} />
							<CustomHTML
								value={attributes?.customHTML}
								onChange={(val) => {
									setAttributes({ customHTML: val });
								}}
							/>
						</ControlWrapper>
					</BaseControl>
					{themeSupport && (
						<BlockThemeControl
							blockTheme={blockTheme}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
			{(
				blockName === 'multiple-choice' ||
				blockName === 'dropdown' ||
				blockName === 'picture-choice'
			) && (
					<BaseControl>
						<ControlWrapper orientation="horizontal">
							<ControlLabel label="Randomize" isNew></ControlLabel>
							<ToggleControl
								checked={attributes?.randomize ?? false}
								onChange={() => {
									setAttributes({
										randomize: !attributes?.randomize,
									});
								}}
							/>
						</ControlWrapper>
						<>
							{attributes?.randomize && (
								<div className={css`
						margin-top: 3px;
						padding: 9px;
						line-height: 2em;
						background: #fff2cd;
						font-weight: 500;
						color: #c0945d;
					`}
								>
									Please note that randomization doesn't work in the preview mode!
								</div>
							)}
						</>
					</BaseControl>
				)
			}
		</Fragment>
	);
};
export default DefaultControls;
