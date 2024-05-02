/**
 * QuillForms Dependencies
 */
import { BaseControl, ControlWrapper } from '@quillforms/admin-components';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Panel } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { usePaymentsContext } from '../state/context';
import AddButton from './add-button';
import Coupon from './coupon';

/**
 * External Dependencies
 */
import { keys, size } from 'lodash';
const Coupons = () => {
	const { coupons } = usePaymentsContext();

	return (
		<div className="quillforms-payments-page-settings__coupons">
			<h3> {__('Discount Coupons', 'quillforms')}  <div className="admin-components-control-label__new-feature">
				NEW
			</div></h3>

			<div className="quillforms-payments-page-settings__coupons-content">
				<BaseControl>
					<ControlWrapper orientation="vertical">
						{size(keys(coupons)) > 0 && (
							<Panel>
								{Object.keys(coupons).map((id) => (
									<Coupon key={id} id={id} />
								))}
							</Panel>
						)}
						<AddButton />
					</ControlWrapper>
				</BaseControl>
			</div>
		</div>
	);
};

export default Coupons;
