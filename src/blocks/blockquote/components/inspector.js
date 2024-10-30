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
		  avatarShape,
		  nameFontSize,
		  nameColor,
		  contentFontSize,
		  contentColor
		} = this.props.attributes;

		const { setAttributes } = this.props;

		// Avatar shape options
		const ShapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round',  label: __( 'Round' ) },
		];

		return (
		<InspectorControls key="inspector">
			
			<PanelBody title={ __('Avatar', 'lovage-blocks') } initialOpen={ false }>
				<SelectControl
					label={ __( 'Image Shape' ) }
					description={ __( 'Choose between a round or square avatar shape.' ) }
					options={ ShapeOptions }
					value={ avatarShape }
					onChange={ ( value ) => this.props.setAttributes( { avatarShape: value } ) }
				/>
			</PanelBody>

	
			<PanelBody title={ __('Name Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ nameColor }
		            onChangeComplete={ (value) => setAttributes( { nameColor: value.hex } ) }
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
					label={ __( 'Name Font Size' ) }
					value={ nameFontSize }
					onChange={ ( value ) => this.props.setAttributes( { nameFontSize: value } ) }
					min={ 12 }
					max={ 20 }
					step={ 1 }
				/>

				<RangeControl
					label={ __( 'Content Font Size' ) }
					value={ contentFontSize }
					onChange={ ( value ) => this.props.setAttributes( { contentFontSize: value } ) }
					min={ 12 }
					max={ 24 }
					step={ 1 }
				/>
			</PanelBody>

		</InspectorControls>
		);
	}
}
