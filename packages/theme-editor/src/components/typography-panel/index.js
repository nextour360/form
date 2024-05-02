/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * QuillForms Dependencies
 */
import {
	BaseControl,
	ControlWrapper,
	ControlLabel,
	FontPicker,
	TextControl,
	ResponsiveControl,
} from '@quillforms/admin-components';
import configApi from '@quillforms/config';
import { getDefaultThemeProperties } from '@quillforms/utils';

/**
 * WordPress Dependencies
 */
import { PanelBody } from '@wordpress/components';

/**
 * External Dependencies
 */
import { css } from 'emotion';
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
import MeasureControl from '../measure-control';

const TypographyPanel = ( { properties, setCurrentThemeProperties } ) => {
	const {
		fontSize,
		typographyPreset,
		fontLineHeight,
		questionsLabelFontSize,
		questionsLabelLineHeight,
		questionsDescriptionFontSize,
		questionsDescriptionLineHeight,
		textInputAnswers,
		buttonsFontSize,
		buttonsPadding,
	} = properties;

	const md = {
		fontSize: {
			lg: '20px',
			sm: '16px',
		},
		fontLineHeight: {
			lg: '28px',
			sm: '24px',
		},
		typographyPreset: 'md',
		questionsLabelFontSize: {
			lg: '24px',
			sm: '20px',
		},
		questionsLabelLineHeight: {
			lg: '32px',
			sm: '28px',
		},
		questionsDescriptionFontSize: {
			lg: '20px',
			sm: '16px',
		},
		questionsDescriptionLineHeight: {
			lg: '28px',
			sm: '24px',
		},
		textInputAnswers: {
			lg: '30px',
			sm: '24px',
		},
		buttonsFontSize: {
			lg: '20px',
			sm: '16px',
		},
		buttonsPadding: {
			top: {
				lg: '9px',
				sm: '9px',
			},
			bottom: {
				lg: '9px',
				sm: '9px',
			},
			left: {
				lg: '23px',
				sm: '23px',
			},
			right: {
				lg: '20px',
				sm: '20px',
			},
		},
	};
	const lg = {
		fontSize: {
			lg: '20px',
			sm: '20px',
		},
		fontLineHeight: {
			lg: '28px',
			sm: '28px',
		},
		typographyPreset: 'lg',
		questionsLabelFontSize: {
			lg: '36px',
			sm: '30px',
		},
		questionsLabelLineHeight: {
			lg: '44px',
			sm: '38px',
		},
		questionsDescriptionFontSize: {
			lg: '20px',
			sm: '16px',
		},
		questionsDescriptionLineHeight: {
			lg: '28px',
			sm: '24px',
		},
		textInputAnswers: {
			lg: '30px',
			sm: '24px',
		},
		buttonsFontSize: {
			lg: '20px',
			sm: '20px',
		},
		buttonsPadding: {
			top: {
				lg: '9px',
				sm: '9px',
			},
			bottom: {
				lg: '9px',
				sm: '9px',
			},
			left: {
				lg: '23px',
				sm: '23px',
			},
			right: {
				lg: '20px',
				sm: '20px',
			},
		},
	};
	const sm = {
		fontSize: {
			lg: '16px',
			sm: '16px',
		},
		fontLineHeight: {
			lg: '24px',
			sm: '24px',
		},
		typographyPreset: 'sm',
		questionsLabelFontSize: {
			lg: '16px',
			sm: '16px',
		},
		questionsLabelLineHeight: {
			lg: '24px',
			sm: '24px',
		},
		questionsDescriptionFontSize: {
			lg: '14px',
			sm: '14px',
		},
		questionsDescriptionLineHeight: {
			lg: '20px',
			sm: '20px',
		},
		answersMargin: {
			top: {
				lg: '24px',
				sm: '24px',
			},
			bottom: {
				lg: '16px',
				sm: '16px',
			},
			right: {
				lg: '0px',
				sm: '0px',
			},
			left: {
				lg: '0px',
				sm: '0px',
			},
		},
		textInputAnswers: {
			lg: '20px',
			sm: '20px',
		},
		buttonsFontSize: {
			lg: '16px',
			sm: '16px',
		},
		buttonsPadding: {
			top: {
				lg: '6px',
				sm: '6px',
			},
			bottom: {
				lg: '6px',
				sm: '6px',
			},
			left: {
				lg: '23px',
				sm: '23px',
			},
			right: {
				lg: '20px',
				sm: '20px',
			},
		},
	};
	return (
		<PanelBody title="Typography and Spacing" initialOpen={ false }>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel
						label="Select a presest for Typography"
						isNew={ true }
					></ControlLabel>
					<div className="typography-presets">
						<span
							className={ classNames( {
								selected: typographyPreset === 'lg',
							} ) }
							onClick={ () => {
								setCurrentThemeProperties( { ...lg } );
							} }
						>
							LG
						</span>
						<span
							className={ classNames( {
								selected: typographyPreset === 'md',
							} ) }
							onClick={ () => {
								setCurrentThemeProperties( { ...md } );
							} }
						>
							MD
						</span>

						<span
							className={ classNames( {
								selected: typographyPreset === 'sm',
							} ) }
							onClick={ () => {
								setCurrentThemeProperties( { ...sm } );
							} }
						>
							SM
						</span>
					</div>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel label="Base Font Size(px)" isNew={ true } />
					<ResponsiveControl
						desktopChildren={
							<MeasureControl
								val={ parseInt(
									fontSize.lg.replace( 'px', '' )
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										fontSize: {
											...fontSize,
											lg: `${ val }px`,
										},
									} );
								} }
							/>
						}
						mobileChildren={
							<MeasureControl
								val={ parseInt(
									fontSize.sm.replace( 'px', '' )
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										fontSize: {
											...fontSize,
											sm: `${ val }px`,
										},
									} );
								} }
							/>
						}
					/>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel
						label="Base Font Line Height(px)"
						isNew={ true }
					/>
					<ResponsiveControl
						desktopChildren={
							<MeasureControl
								val={ parseInt(
									fontLineHeight.lg.replace( 'px', '' )
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										fontLineHeight: {
											...fontLineHeight,
											lg: `${ val }px`,
										},
									} );
								} }
							/>
						}
						mobileChildren={
							<MeasureControl
								val={ parseInt(
									fontLineHeight.sm.replace( 'px', '' )
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										fontLineHeight: {
											...fontLineHeight,
											sm: `${ val }px`,
										},
									} );
								} }
							/>
						}
					/>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel
						label="Questions Label Font Size(px)"
						isNew={ true }
					/>
					<ResponsiveControl
						desktopChildren={
							<MeasureControl
								val={ parseInt(
									questionsLabelFontSize.lg.replace(
										'px',
										''
									)
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										questionsLabelFontSize: {
											...questionsLabelFontSize,
											lg: `${ val }px`,
										},
									} );
								} }
							/>
						}
						mobileChildren={
							<MeasureControl
								val={ parseInt(
									questionsLabelFontSize.sm.replace(
										'px',
										''
									)
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										questionsLabelFontSize: {
											...questionsLabelFontSize,
											sm: `${ val }px`,
										},
									} );
								} }
							/>
						}
					/>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel
						label="Questions Label Line Height(px)"
						isNew={ true }
					/>
					<ResponsiveControl
						desktopChildren={
							<MeasureControl
								val={ parseInt(
									questionsLabelLineHeight.lg.replace(
										'px',
										''
									)
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										questionsLabelLineHeight: {
											...questionsLabelLineHeight,
											lg: `${ val }px`,
										},
									} );
								} }
							/>
						}
						mobileChildren={
							<MeasureControl
								val={ parseInt(
									questionsLabelLineHeight.sm.replace(
										'px',
										''
									)
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										questionsLabelLineHeight: {
											...questionsLabelLineHeight,
											sm: `${ val }px`,
										},
									} );
								} }
							/>
						}
					/>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel
						label="Questions Description Font Size(px)"
						isNew={ true }
					/>
					<ResponsiveControl
						desktopChildren={
							<MeasureControl
								val={ parseInt(
									questionsDescriptionFontSize.lg.replace(
										'px',
										''
									)
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										questionsDescriptionFontSize: {
											...questionsDescriptionFontSize,
											lg: `${ val }px`,
										},
									} );
								} }
							/>
						}
						mobileChildren={
							<MeasureControl
								val={ parseInt(
									questionsDescriptionFontSize.sm.replace(
										'px',
										''
									)
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										questionsDescriptionFontSize: {
											...questionsDescriptionFontSize,
											sm: `${ val }px`,
										},
									} );
								} }
							/>
						}
					/>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel
						label="Questions Description Line Height(px)"
						isNew={ true }
					/>
					<ResponsiveControl
						desktopChildren={
							<MeasureControl
								val={ parseInt(
									questionsDescriptionLineHeight.lg.replace(
										'px',
										''
									)
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										questionsDescriptionLineHeight: {
											...questionsDescriptionLineHeight,
											lg: `${ val }px`,
										},
									} );
								} }
							/>
						}
						mobileChildren={
							<MeasureControl
								val={ parseInt(
									questionsDescriptionLineHeight.sm.replace(
										'px',
										''
									)
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										questionsDescriptionLineHeight: {
											...questionsDescriptionLineHeight,
											sm: `${ val }px`,
										},
									} );
								} }
							/>
						}
					/>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel
						label="Text input answers font size(px)"
						isNew={ true }
					/>
					<ResponsiveControl
						desktopChildren={
							<MeasureControl
								val={ parseInt(
									textInputAnswers.lg.replace( 'px', '' )
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										textInputAnswers: {
											...textInputAnswers,
											lg: `${ val }px`,
										},
									} );
								} }
							/>
						}
						mobileChildren={
							<MeasureControl
								val={ parseInt(
									textInputAnswers.sm.replace( 'px', '' )
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										textInputAnswers: {
											...textInputAnswers,
											sm: `${ val }px`,
										},
									} );
								} }
							/>
						}
					/>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="horizontal">
					<ControlLabel
						label="Buttons Font Size(px)"
						isNew={ true }
					/>
					<ResponsiveControl
						desktopChildren={
							<MeasureControl
								val={ parseInt(
									buttonsFontSize.lg.replace( 'px', '' )
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										buttonsFontSize: {
											...buttonsFontSize,
											lg: `${ val }px`,
										},
									} );
								} }
							/>
						}
						mobileChildren={
							<MeasureControl
								val={ parseInt(
									buttonsFontSize.sm.replace( 'px', '' )
								) }
								onChange={ ( val ) => {
									setCurrentThemeProperties( {
										buttonsFontSize: {
											...buttonsFontSize,
											sm: `${ val }px`,
										},
									} );
								} }
							/>
						}
					/>
				</ControlWrapper>
			</BaseControl>
			<BaseControl>
				<ControlWrapper orientation="vertical">
					<ControlLabel label="Buttons Padding(px)" isNew={ true } />
					<ResponsiveControl
						desktopChildren={
							<div
								className={ css`
									display: flex;
									align-items: center;
									div {
										text-align: center;
									}
									input {
										width: 60px !important;
									}
								` }
							>
								<TextControl
									label={ 'Top' }
									type="number"
									value={ parseInt(
										buttonsPadding.top.lg.replace(
											'px',
											''
										)
									) }
									onChange={ ( val ) => {
										setCurrentThemeProperties( {
											buttonsPadding: {
												...buttonsPadding,
												top: {
													...buttonsPadding.top,
													lg: `${ val }px`,
												},
											},
										} );
									} }
								/>
								<TextControl
									label={ 'Right' }
									type="number"
									value={ parseInt(
										buttonsPadding.right.lg.replace(
											'px',
											''
										)
									) }
									onChange={ ( val ) => {
										setCurrentThemeProperties( {
											buttonsPadding: {
												...buttonsPadding,
												right: {
													...buttonsPadding.right,
													lg: `${ val }px`,
												},
											},
										} );
									} }
								/>
								<TextControl
									label={ 'Bottom' }
									type="number"
									value={ parseInt(
										buttonsPadding.bottom.lg.replace(
											'px',
											''
										)
									) }
									onChange={ ( val ) => {
										setCurrentThemeProperties( {
											buttonsPadding: {
												...buttonsPadding,
												bottom: {
													...buttonsPadding.bottom,
													lg: `${ val }px`,
												},
											},
										} );
									} }
								/>
								<TextControl
									label={ 'Left' }
									type="number"
									value={ parseInt(
										buttonsPadding.left.lg.replace(
											'px',
											''
										)
									) }
									onChange={ ( val ) => {
										setCurrentThemeProperties( {
											buttonsPadding: {
												...buttonsPadding,
												left: {
													...buttonsPadding.left,
													lg: `${ val }px`,
												},
											},
										} );
									} }
								/>
							</div>
						}
						mobileChildren={
							<div
								className={ css`
									display: flex;
									align-items: center;
									div {
										text-align: center;
									}
									input {
										width: 60px !important;
									}
								` }
							>
								<TextControl
									label={ 'Top' }
									type="number"
									value={ parseInt(
										buttonsPadding.top.sm.replace(
											'px',
											''
										)
									) }
									onChange={ ( val ) => {
										setCurrentThemeProperties( {
											buttonsPadding: {
												...buttonsPadding,
												top: {
													...buttonsPadding.top,
													sm: `${ val }px`,
												},
											},
										} );
									} }
								/>
								<TextControl
									label={ 'Right' }
									type="number"
									value={ parseInt(
										buttonsPadding.right.sm.replace(
											'px',
											''
										)
									) }
									onChange={ ( val ) => {
										setCurrentThemeProperties( {
											buttonsPadding: {
												...buttonsPadding,
												right: {
													...buttonsPadding.right,
													sm: `${ val }px`,
												},
											},
										} );
									} }
								/>
								<TextControl
									label={ 'Bottom' }
									type="number"
									value={ parseInt(
										buttonsPadding.bottom.sm.replace(
											'px',
											''
										)
									) }
									onChange={ ( val ) => {
										setCurrentThemeProperties( {
											buttonsPadding: {
												...buttonsPadding,
												bottom: {
													...buttonsPadding.bottom,
													sm: `${ val }px`,
												},
											},
										} );
									} }
								/>
								<TextControl
									label={ 'Left' }
									type="number"
									value={ parseInt(
										buttonsPadding.left.sm.replace(
											'px',
											''
										)
									) }
									onChange={ ( val ) => {
										setCurrentThemeProperties( {
											buttonsPadding: {
												...buttonsPadding,
												left: {
													...buttonsPadding.left,
													sm: `${ val }px`,
												},
											},
										} );
									} }
								/>
							</div>
						}
					/>
				</ControlWrapper>
			</BaseControl>
		</PanelBody>
	);
};

export default TypographyPanel;
