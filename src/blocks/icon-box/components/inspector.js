/**
 * Inspector Controls
 */

import EB_IconControl from "../../../components/icon-control";

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

const { withState } = wp.compose;

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
		  icon,
		  iconBorderColor,
		  iconBorderSize,
		  iconShape,
		  iconSize,
		  iconColor,
		  titleFontSize,
		  titleColor,
		  contentFontSize,
		  contentAlignment,
		  contentColor
		} = this.props.attributes;

		const { setAttributes } = this.props;

		// Avatar shape options
		const shapeOptions = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'round',  label: __( 'Round' ) },
		];

		return (
		<InspectorControls key="inspector">

			<PanelBody title={ __('Icon Picker', 'lovage-blocks') } initialOpen={ false }>
				 <EB_IconControl
				     icon={ icon }
				     onChangeComplete={ (value) => setAttributes( { icon: value } ) } 
				 />

				 <SelectControl
					label={ __( 'Icon Border Shape' ) }
					description={ __( 'Choose between a round or square image shape.' ) }
					options={ shapeOptions }
					value={ iconShape }
					onChange={ ( value ) => this.props.setAttributes( { iconShape: value } ) }
				/>

				 <label class="eb-option-label">{ __( 'Icon Border Color' ) }</label>
				 <ColorPicker
		            color={ iconBorderColor }
		            onChangeComplete={ (value) => setAttributes( { iconBorderColor: value.hex } ) }
		        />

		        <label class="eb-option-label">{ __( 'Icon Color' ) }</label>
		        <ColorPicker
		            color={ iconColor }
		            onChangeComplete={ (value) => setAttributes( { iconColor: value.hex } ) }
		        />

				 <RangeControl
					label={ __( 'Icon Size' ) }
					value={ iconSize }
					onChange={ ( value ) => this.props.setAttributes( { iconSize: value } ) }
					min={ 16 }
					max={ 50 }
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
