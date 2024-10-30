/**
 * Inspector Controls
 */
import EB_IconControl from "../../../components/icon-control";

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
		  titleFontSize,
		  titleColor,
		  linkTarget,
		  icon,
		  iconSize,
		  iconColor
		} = this.props.attributes;

		const { setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">

			<PanelBody title={ __('Icon Picker', 'lovage-blocks') } initialOpen={ false }>
				 <EB_IconControl
				     icon={ icon }
				     onChangeComplete={ (value) => setAttributes( { icon: value } ) } 
				 />
			</PanelBody>
			
			<PanelBody title={ __('Link Target', 'lovage-blocks') } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Open link in new window', 'lovage-blocks' ) }
					checked={ linkTarget }
					onChange={ () => this.props.setAttributes( { linkTarget: ! linkTarget } ) }
				/>
			</PanelBody>

	
			<PanelBody title={ __('Title Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ titleColor }
		            onChangeComplete={ (value) => setAttributes( { titleColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Icon Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ iconColor }
		            onChangeComplete={ (value) => setAttributes( { iconColor: value.hex } ) }
		        />
			</PanelBody>

			<PanelBody title={ __('Font Size', 'lovage-blocks') } initialOpen={ false }>
				<RangeControl
					label={ __( 'Title Font Size' ) }
					value={ titleFontSize }
					onChange={ ( value ) => this.props.setAttributes( { titleFontSize: value } ) }
					min={ 12 }
					max={ 24 }
					step={ 1 }
				/>

				<RangeControl
					label={ __( 'Icon Size' ) }
					value={ iconSize }
					onChange={ ( value ) => this.props.setAttributes( { iconSize: value } ) }
					min={ 12 }
					max={ 24 }
					step={ 1 }
				/>
			</PanelBody>

		</InspectorControls>
		);
	}
}
