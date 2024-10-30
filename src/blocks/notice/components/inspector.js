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
		  contentFontSize,
		  contentColor,
		  noticeColor
		} = this.props.attributes;

		const { setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">

	
			<PanelBody title={ __('Notice Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ noticeColor }
		            onChangeComplete={ (value) => setAttributes( { noticeColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Content Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ contentColor }
		            onChangeComplete={ (value) => setAttributes( { contentColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Content Font Size', 'lovage-blocks') } initialOpen={ false }>
				<RangeControl
					value={ contentFontSize }
					onChange={ ( value ) => this.props.setAttributes( { contentFontSize: value } ) }
					min={ 14 }
					max={ 24 }
					step={ 1 }
				/>
			</PanelBody>

		</InspectorControls>
		);
	}
}
