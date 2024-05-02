import { __experimentalUseFieldRenderContext } from '../field-render';

interface Props {
	modifier: string;
}
const AttributeMergeTag: React.FC< Props > = ( { modifier } ) => {
	const { attributes } = __experimentalUseFieldRenderContext();
	let modifierRender: React.ReactNode = <>_ _ _ _ _</>;
	if ( attributes && attributes[ modifier ] ) {
		modifierRender = <> { attributes[ modifier ] } </>;
	}
	return <>{ modifierRender } </>;
};
export default AttributeMergeTag;
