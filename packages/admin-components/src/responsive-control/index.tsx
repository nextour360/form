/**
 * External Dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { map } from 'lodash';
import { Button, ButtonGroup } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import ControlWrapper from '../control-wrapper';
import ControlLabel from '../control-label';
export default function ResponsiveControl( {
	label,
	desktopChildren,
	tabletChildren,
	mobileChildren,
} ) {
	const [ deviceType, setDeviceType ] = useState( 'Desktop' );

	const devices = [
		{
			name: 'Desktop',
			title: "Desktop",
			itemClass: 'qf-desk-tab',
		},
		{
			name: 'Mobile',
			key: 'mobile',
			title: 'Mobile',
			itemClass: 'qf-mobile-tab',
		},
	];
	const output: any = {};
	output.Mobile = mobileChildren;
	output.Tablet = tabletChildren;
	output.Desktop = desktopChildren;
	return (
		<div className={ 'admin-components-responsive-control' }>
			<ControlWrapper orientation="">
				<ControlLabel label={ label } />
				<ButtonGroup
					className="responsive-options"
					aria-label={ __( 'Device', 'quillforms' ) }
				>
					{ map( devices, ( { name, key, title, itemClass } ) => (
						<Button
							key={ key }
							className={ `responsive-btn ${ itemClass }${
								name === deviceType ? ' is-active' : ''
							}` }
							isSmall
							aria-pressed={ deviceType === name }
							onClick={ () => setDeviceType( name ) }
						>
							{ title }
						</Button>
					) ) }
				</ButtonGroup>
			</ControlWrapper>
			<div className="measure-control-inner">
				{ output[ deviceType ] ? output[ deviceType ] : output.Desktop }
			</div>
		</div>
	);
}
