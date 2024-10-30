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
		  textFontSize,
		  textColor
		} = this.props.attributes;

		const { setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">

			<PanelBody title={ __('Text Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ textColor }
		            onChangeComplete={ (value) => setAttributes( { textColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Text Font Size', 'lovage-blocks') } initialOpen={ false }>
				<RangeControl
					value={ textFontSize }
					onChange={ ( value ) => this.props.setAttributes( { textFontSize: value } ) }
					min={ 16 }
					max={ 24 }
					step={ 1 }
				/>
			</PanelBody>

		</InspectorControls>
		);
	}
}
