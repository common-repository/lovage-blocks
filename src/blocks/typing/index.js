/**
 * Lovage Block: Typing
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
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

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
registerBlockType( 'lovage-blocks/typing', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Typing Heading', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a animated typing text.', 'lovage-blocks' ), // Block description.
	icon: icons.write, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'typing', 'lovage-blocks' ),
		__( 'heading', 'lovage-blocks' )
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-typing",
	      attribute: "id"
	    },
		content: {
		  type: "string",
		  source: "text",
		  selector: ".eb-typing-content",
		},
		textFontSize: {
		  type: "string",
		  default: "24"
		},
		textAlignment: {
		  type: "string",
		  default: "left",
		},
		textColor: {
		  type: "string",
		  default: "#000",
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
		  content,
		  textFontSize,
		  textAlignment,
		  textColor
		} = props.attributes;

		const {
			setAttributes,
			isSelected,
			editable,
			className
		} = props;

		if (!props.attributes.id) {
	      const id = `eb-typing-${Math.floor(Math.random() * 100)}`;
	      props.setAttributes({
	        id
	      });
	    }

	    return [

	    	// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ textAlignment }
					onChange={ ( value ) => setAttributes( { 
												textAlignment: value
											} ) }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...props } }
			/>,

	    	<div 
	    	  id={ props.attributes.id }
	    	  className={ classnames(
	    	  				"eb-typing", 
	    	  				textAlignment
	    	  			) }
	    	>
		    	   <RichText
			            tagName="div"
			            placeholder={ __( 'Content Text', 'lovage-blocks' ) }
			            value={ content }
			            className={ classnames('eb-typing-content', 'eb-text', 'eb-font-size-'+textFontSize) }
			            onChange={ (value) => setAttributes( { content: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
			            style={ {
								color: textColor
							  } }
		  		   /> 
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
		  content,
		  textFontSize,
		  textAlignment,
		  textColor
		} = props.attributes;

		return (
			<div 
			  id={ props.attributes.id }
	    	  className={ classnames(
	    	  				"eb-typing", 
	    	  				textAlignment
	    	  			) } 
	    	>

				{ content && (
				     <RichText.Content
				   	    tagName="div"
				   	    className={ classnames('eb-typing-content', 'eb-text', 'eb-font-size-'+textFontSize) }
				   	    style={ {
								color: textColor
						} }
				   	    value={ content }
				   	  />
				) }
			</div>
		);
	}

} );