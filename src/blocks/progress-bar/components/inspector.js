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
		  percent,
		  bgColor,
		  barColor
		} = this.props.attributes;

		const { setAttributes } = this.props;

		return (
		<InspectorControls key="inspector">

		    <PanelBody title={ __('Progress Bar Length', 'lovage-blocks') } initialOpen={ false }>
				<RangeControl
					label={ __( 'Percent' ) }
					value={ percent }
					onChange={ ( value ) => this.props.setAttributes( { percent: value } ) }
					min={ 0 }
					max={ 100 }
					step={ 0.1 }
				/>
			</PanelBody>

			<PanelBody title={ __('Highlight Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ barColor }
		            onChangeComplete={ (value) => setAttributes( { barColor: value.hex } ) }
		        />
			</PanelBody>
	
			<PanelBody title={ __('Background Color', 'lovage-blocks') } initialOpen={ false }>
			    <ColorPicker
		            color={ bgColor }
		            onChangeComplete={ (value) => setAttributes( { bgColor: value.hex } ) }
		        />
			</PanelBody>

		</InspectorControls>
		);
	}
}
