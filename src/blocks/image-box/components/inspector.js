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
		  imageShape,
		  titleFontSize,
		  titleColor,
		  contentFontSize,
		  contentAlignment,
		  imageSize,
		  contentColor
		} = this.props.attributes;

		const { setAttributes } = this.props;

		// Avatar shape options
		const imageShapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round',  label: __( 'Round' ) },
		];

		return (
		<InspectorControls key="inspector">
			
			<PanelBody title={ __('Image', 'lovage-blocks') } initialOpen={ false }>
				<SelectControl
					label={ __( 'Image Shape' ) }
					description={ __( 'Choose between a round or square image shape.' ) }
					options={ imageShapeOptions }
					value={ imageShape }
					onChange={ ( value ) => this.props.setAttributes( { imageShape: value } ) }
				/>
				<RangeControl
					label={ __( 'Image Size' ) }
					value={ imageSize }
					onChange={ ( value ) => this.props.setAttributes( { imageSize: value } ) }
					min={ 10 }
					max={ 100 }
					step={ 1 }
				/>
			</PanelBody>

	
			<PanelBody title={ __('Title Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ titleColor }
		            onChangeComplete={ (value) => setAttributes( { titleColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Content Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ contentColor }
		            onChangeComplete={ (value) => setAttributes( { contentColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Font Size', 'lovage-blocks') } initialOpen={ false }>
				<RangeControl
					label={ __( 'Title Font Size' ) }
					value={ titleFontSize }
					onChange={ ( value ) => this.props.setAttributes( { titleFontSize: value } ) }
					min={ 14 }
					max={ 24 }
					step={ 1 }
				/>

				<RangeControl
					label={ __( 'Content Font Size' ) }
					value={ contentFontSize }
					onChange={ ( value ) => this.props.setAttributes( { contentFontSize: value } ) }
					min={ 12 }
					max={ 20 }
					step={ 1 }
				/>
			</PanelBody>

		</InspectorControls>
		);
	}
}
