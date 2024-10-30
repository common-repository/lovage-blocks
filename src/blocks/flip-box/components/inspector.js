/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls } = wp.editor;

// Import Inspector components
const {
	Panel,
	PanelBody,
	PanelHeader,
	RangeControl,
	SelectControl,
	ColorPicker
} = wp.components;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
		  frontBackgroundColor,
		  frontBackgroundImage,
		  backBackgroundColor,
		  backBackgroundImage
		} = this.props.attributes;

		const { setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">

			<PanelBody title={ __('Front Background Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ frontBackgroundColor }
		            onChangeComplete={ (value) => setAttributes( { frontBackgroundColor: value.hex } ) }
		        />
			</PanelBody>
	
			<PanelBody title={ __('Back Background Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ backBackgroundColor }
		            onChangeComplete={ (value) => setAttributes( { backBackgroundColor: value.hex } ) }
		        />
			</PanelBody>

		</InspectorControls>
		);
	}
}
