/**
 * Lovage Block: Price Table
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import icons from '../../components/icons';

// Import CSS.
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n; // Import __() from wp.i18n

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	URLInput
} = wp.editor;

// Register components
const {
	Button,
	IconButton
} = wp.components;

/**
 * Register: Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'lovage-blocks/price-table', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Price Table', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a price table.', 'lovage-blocks' ), // Block description.
	icon: icons.priceTable, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'price', 'lovage-blocks' ),
		__( 'table', 'lovage-blocks' ),
		__( 'price table', 'lovage-blocks' )
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-pricetable",
	      attribute: "id"
	    },
		title: {
		  type: "string",
		  source: "text",
		  selector: ".eb-pricetable-title",
		},
		price: {
		  type: "string",
		  source: "text",
		  selector: ".eb-pricetable-price",
		},
		content: {
		  type: "string",
		  source: "html",
		  selector: ".eb-pricetable-content",
		},
		titleFontSize: {
		  type: "string",
		  default: "18"
		},
		priceFontSize: {
		  type: "string",
		  default: "35"
		},
		contentFontSize: {
		  type: "string",
		  default: "16"
		},
		ribbon: {
		  type: "boolean",
		  default: false
		},
		ribbonText: {
		  type: "string",
		  source: "text",
		  default: "Popular",
		  selector: ".eb-pricetable-ribbon-text"
		},
		ribbonColor: {
		  type: "string",
		  default: "#00adff"
		},
		buttonUrl: {
	      type: "string",
	      source: "attribute",
	      selector:".eb-button",
	      attribute: "href"
	    },
	    buttonTarget: {
	      type: "boolean",
	      default: false
	    },
		buttonText: {
		  type: "string",
		  source: "text",
		  default: "Button",
		  selector: ".eb-button-text",
		},
		buttonShape: {
		  type: "string",
		  default: "rounded",
		},
		buttonBackgroundColor: {
		  type: "string",
		  default: "#000",
		},
		buttonShape: {
		  type: "string",
		  default: "square",
		},
		buttonFontSize: {
		  type: "string",
		  default: "15px" 
		},
		buttonTextColor: {
		  type: "string",
		  default: "#fff",
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: props => {

		const {
		  title,
		  price,
		  content,
		  titleFontSize,
		  priceFontSize,
		  contentFontSize,
		  ribbon,
		  ribbonText,
		  ribbonColor,
		  buttonText,
		  buttonTextColor,
		  buttonFontSize,
		  buttonBackgroundColor,
		  buttonShape,
		  buttonUrl,
		  buttonSize,
		  buttonTarget
		} = props.attributes;

		const {
			setAttributes,
			isSelected,
			editable,
			className
		} = props;

		if (!props.attributes.id) {
	      const id = `eb-pricetable-${Math.floor(Math.random() * 100)}`;
	      props.setAttributes({
	        id
	      });
	    }

	    return [

	    	// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...props } }
			/>,

	    	<div 
	    	  id={ props.attributes.id }
	    	  className={ classnames(
	    	  				"eb-pricetable"
	    	  			) }
	    	>

			       { ribbon &&

			       	   <div className="eb-pricetable-ribbon"
			       	        style={{ backgroundColor: ribbonColor }}
			       	   >
			       	       <RichText
					            tagName="span"
					            placeholder={ __( 'Popular', 'lovage-blocks' ) }
					            value={ ribbonText }
					            className={ classnames('eb-pricetable-ribbon-text', 'eb-text') }
					            onChange={ (value) => setAttributes( { ribbonText: value } ) }
					            formattingControls={ [ 'bold', 'italic', 'strikethrough'] }
					            keepPlaceholderOnFocus={true}
				  		   />
			       	   </div>

			      }

		    	   <RichText
			            tagName="div"
			            placeholder={ __( 'Title', 'lovage-blocks' ) }
			            value={ title }
			            className={ classnames('eb-pricetable-title', 'eb-text', 'eb-font-size-'+titleFontSize) }
			            onChange={ (value) => setAttributes( { title: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough'] }
			            keepPlaceholderOnFocus={true}
		  		   />

		    	   <RichText
			            tagName="div"
			            placeholder={ __( '$20/Month', 'lovage-blocks' ) }
			            value={ price }
			            className={ classnames('eb-pricetable-price', 'eb-text', 'eb-font-size-'+priceFontSize) }
			            onChange={ (value) => setAttributes( { price: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
		  		   />

			  	    <RichText
			            tagName="div"
			            placeholder={ __( 'Content', 'lovage-blocks' ) }
			            value={ content }
			            className={ classnames('eb-pricetable-content', 'eb-text', 'eb-font-size-'+contentFontSize) }
			            onChange={ (value) => setAttributes( { content: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link'] }
			            style={{ fontSize: props.attributes.contentFontSize }}
		  			/>

		  			<div className={ classnames("eb-block-button", buttonShape) }>
				    	<div className="eb-button" 
				    	   style={ { 
				    	   	 background: buttonBackgroundColor, 
				    	   } }
				    	>
				    	   <RichText
					            tagName="span"
					            placeholder={ __( 'Button Text', 'lovage-blocks' ) }
					            value={ buttonText }
					            className={ classnames('eb-button-text', 'eb-text', 'eb-font-size-'+buttonFontSize) }
					            onChange={ (value) => setAttributes( { buttonText: value } ) }
					            formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					            style={ {
										color: buttonTextColor,
									  } }
				  		   />
				    	</div>
			    	</div>

			    	{ isSelected && (
						<form
							key="form-link"
							className="blocks-button__inline-link"
							onSubmit={ event => event.preventDefault() }
						>
							<URLInput
								className="button-url"
								value={ buttonUrl }
								onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
							/>
							<IconButton
								icon="editor-break"
								label={ __( 'Apply', 'lovage-blocks' ) }
								type="submit"
							/>
						</form>
					) }
	    	</div>
	    ];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const {
		  title,
		  price,
		  content,
		  titleFontSize,
		  priceFontSize,
		  contentFontSize,
		  ribbon,
		  ribbonText,
		  ribbonColor,
		  buttonText,
		  buttonTextColor,
		  buttonFontSize,
		  buttonBackgroundColor,
		  buttonShape,
		  buttonUrl,
		  buttonSize,
		  buttonTarget

		} = props.attributes;

		return (
			<div 
	    	  id={ props.attributes.id }
	    	  className={ classnames(
	    	  				"eb-pricetable"
	    	  			) }
	    	>

	    	   { ribbon && (

			       	   <div className="eb-pricetable-ribbon"
			       	        style={{ backgroundColor: ribbonColor }}
			       	   >
			       	       <RichText.Content
					            tagName="span"
					            value={ ribbonText }
					            className={ classnames('eb-pricetable-ribbon-text', 'eb-text') }
				  		   />
			       	   </div>

			   ) }

	    	   <RichText.Content
		            tagName="div"
		            value={ title }
		            className={ classnames('eb-pricetable-title', 'eb-text', 'eb-font-size-'+titleFontSize) }
	  		   />

	    	   <RichText.Content
		            tagName="div"
		            value={ price }
		            className={ classnames('eb-pricetable-price', 'eb-text', 'eb-font-size-'+priceFontSize) }
	  		   />

		  	    <RichText.Content
		            tagName="div"
		            value={ content }
		            className={ classnames('eb-pricetable-content', 'eb-text', 'eb-font-size-'+contentFontSize) }
	  			/>

	  			<div className={ classnames("eb-block-button", buttonShape) }>
					<a className="eb-button" 
					   href={ props.attributes.buttonUrl } 
					   style={ { 
					   	 background: buttonBackgroundColor, 
					   } }
					   target={ buttonTarget ? '_blank' : '_self' }
					> 
			    	   <RichText.Content
				            tagName="span"
				            value={ buttonText }
				            className={ classnames('eb-button-text', 'eb-text', 'eb-font-size-'+buttonFontSize) }
				            style={ {
									color: buttonTextColor
								  } }
			  		   />
			    	</a>
		    	</div>
	    	</div>
		);
	}

} );