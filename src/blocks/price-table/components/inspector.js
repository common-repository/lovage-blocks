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
	ColorPicker,
	ToggleControl,
	SelectControl
} = wp.components;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
		  titleFontSize,
		  priceFontSize,
		  contentFontSize,
		  ribbon,
		  ribbonColor,
		  buttonShape,
		  buttonFontSize,
		  buttonBackgroundColor,
		  buttonTextColor,
		  buttonSize,
		  buttonTarget
		} = this.props.attributes;

		const { setAttributes } = this.props;

		// shape options
		const ShapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round',  label: __( 'Round' ) },
			{ value: 'rounded',  label: __( 'Rounded' ) },
		];

		return (
		<InspectorControls key="inspector">
	
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
					label={ __( 'Price Font Size' ) }
					value={ priceFontSize }
					onChange={ ( value ) => this.props.setAttributes( { priceFontSize: value } ) }
					min={ 14 }
					max={ 50 }
					step={ 1 }
				/>

				<RangeControl
					label={ __( 'Content Font Size' ) }
					value={ contentFontSize }
					onChange={ ( value ) => this.props.setAttributes( { contentFontSize: value } ) }
					min={ 12 }
					max={ 18 }
					step={ 1 }
				/>
			</PanelBody>

			<PanelBody title={ __('Ribbon', 'lovage-blocks') } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Display The Ribbon?', 'lovage-blocks' ) }
					checked={ ribbon }
					onChange={ () => this.props.setAttributes( { ribbon: ! ribbon } ) }
				/>

				 <ColorPicker
				    label={ __('Ribbon Color', 'lovage-blocks') }
		            color={ ribbonColor }
		            onChangeComplete={ (value) => setAttributes( { ribbonColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Link Target', 'lovage-blocks') } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Open link in new window', 'lovage-blocks' ) }
					checked={ buttonTarget }
					onChange={ () => this.props.setAttributes( { buttonTarget: ! buttonTarget } ) }
				/>
			</PanelBody>

			<PanelBody title={ __('Button Shape', 'lovage-blocks') } initialOpen={ false }>
				<SelectControl
					description={ __( 'Choose between a round, rounded or square button shape.' ) }
					options={ ShapeOptions }
					value={ buttonShape }
					onChange={ ( value ) => this.props.setAttributes( { buttonShape: value } ) }
				/>
			</PanelBody>

			<PanelBody title={ __('Button Background Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ buttonBackgroundColor }
		            onChangeComplete={ (value) => setAttributes( { buttonBackgroundColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Button Text Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ buttonTextColor }
		            onChangeComplete={ (value) => setAttributes( { buttonTextColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Button Font Size', 'lovage-blocks') } initialOpen={ false }>
				<RangeControl
					value={ buttonFontSize }
					onChange={ ( value ) => this.props.setAttributes( { buttonFontSize: value } ) }
					min={ 14 }
					max={ 24 }
					step={ 1 }
				/>
			</PanelBody>

		</InspectorControls>
		);
	}
}
