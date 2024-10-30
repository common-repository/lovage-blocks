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
	ColorPicker,
	ToggleControl
} = wp.components;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
		  toggleShape,
		  titleFontSize,
		  titleColor,
		  contentColor,
		  borderColor,
		  toggleOpen
		} = this.props.attributes;

		const { setAttributes } = this.props;

		// Avatar shape options
		const shapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round',  label: __( 'Round' ) },
			{ value: 'rounded',  label: __( 'Rouned' ) },
		];

		return (
		<InspectorControls key="inspector">

			<PanelBody title={ __('Open Status', 'lovage-blocks') } initialOpen={ true }>
		    <ToggleControl
					label={ __( 'Open By Default?', 'lovage-blocks' ) }
					checked={ toggleOpen }
					onChange={ () => this.props.setAttributes( { toggleOpen: ! toggleOpen } ) }
				/>
			</PanelBody>
	
			<PanelBody title={ __('Title Text Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ titleColor }
		            onChangeComplete={ (value) => setAttributes( { titleColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Content Text Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ contentColor }
		            onChangeComplete={ (value) => setAttributes( { contentColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Border Radius', 'lovage-blocks') } initialOpen={ false }>
				<SelectControl
					description={ __( 'Choose between a round, rounded or square corner shape.' ) }
					options={ shapeOptions }
					value={ toggleShape }
					onChange={ ( value ) => this.props.setAttributes( { toggleShape: value } ) }
				/>
			</PanelBody>

			<PanelBody title={ __('Border Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ borderColor }
		            onChangeComplete={ (value) => setAttributes( { borderColor: value.hex } ) }
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
			</PanelBody>

		</InspectorControls>
		);
	}
}
