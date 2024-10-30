/**
 * Lovage Block: Toggle
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
const { registerBlockType, createBlock } = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	InnerBlocks
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
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
registerBlockType( 'lovage-blocks/toggle', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Toggle', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a toggle.', 'lovage-blocks' ), // Block description.
	icon: icons.toggle, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'toggle', 'lovage-blocks' ),
		__( 'accordion', 'lovage-blocks' )
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-toggle",
	      attribute: "id"
	    },
		title: {
		  type: "string",
		  source: "text",
		  selector: ".eb-toggle-title-text",
		},
		content: {
		  type: "string",
		  source: "text",
		  selector: ".eb-toggle-content",
		},
		toggleShape: {
		  type: "string",
		  default: "square",
		},
		titleFontSize: {
		  type: "string",
		  default: "18" 
		},
		titleColor: {
		  type: "string",
		  default: "#000",
		},
		contentAlignment: {
		  type: "string",
		  default: "left",
		},
		contentColor: {
		  type: "string",
		  default: "#333",
		},
		borderColor: {
		  type: "string",
		  default: "#ddd"
		},
		toggleOpen: {
		  type: "boolean",
		  default: false
		}
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
		  toggleShape,
		  title,
		  content,
		  titleFontSize,
		  titleColor,
		  contentAlignment,
		  contentColor,
		  borderColor,
		  toggleOpen
		} = props.attributes;

		const {
			setAttributes,
			isSelected,
			editable,
			className
		} = props;

		if (!props.attributes.id) {
	      const id = `eb-toggle-${Math.floor(Math.random() * 100)}`;
	      props.setAttributes({
	        id
	      });
	    }

	    return [

	    	// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ contentAlignment }
					onChange={ ( value ) => setAttributes( { 
												contentAlignment: value
											} ) }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...props } }
			/>,

	    	    <details open={ toggleOpen }  
	    	    		 id={ props.attributes.id }
	    	  			 className={ classnames(
	    	  				"eb-toggle", 
	    	  				contentAlignment,
	    	  				toggleShape
	    	  			 ) }>
	    	       <summary className={ classnames("eb-toggle-title") } style={{ borderColor: borderColor }}>
		    	   <RichText
			            tagName="span"
			            placeholder={ __( 'Title', 'lovage-blocks' ) }
			            value={ title }
			            className={ classnames('eb-toggle-title-text', 'eb-text', 'eb-font-size-'+titleFontSize) }
			            onChange={ (value) => setAttributes( { title: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
			            style={ {
								color: titleColor
							  } }
					    keepPlaceholderOnFocus
		  		   />
		  		   </summary>

		  		    <div className="eb-toggle-content" 
		  		         style={ {
								color: contentColor,
								borderColor: borderColor
							 } }>
		  			   <InnerBlocks />
		  			</div>
		  	    </details>
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
		  toggleShape,
		  title,
		  content,
		  titleFontSize,
		  titleColor,
		  contentAlignment,
		  contentColor,
		  borderColor,
		  toggleOpen
		} = props.attributes;

		return (
	    	    <details open={ toggleOpen }  
	    	    		 id={ props.attributes.id }
	    	  			 className={ classnames(
	    	  				"eb-toggle", 
	    	  				contentAlignment,
	    	  				toggleShape
	    	  			 ) }>
	    	       <summary className={ classnames("eb-toggle-title") } style={{ borderColor: borderColor }}>
			    	   <RichText.Content
				            tagName="span"
				            value={ title }
				            className={ classnames('eb-toggle-title-text', 'eb-text', 'eb-font-size-'+titleFontSize) }
				            style={ {
									color: titleColor
								  } }
			  		   />
		  		   </summary>

		    	   <div className="eb-toggle-content" 
		  		         style={ {
								color: contentColor,
								borderColor: borderColor
							 } }>
		  			   <InnerBlocks.Content />
		  			</div>
		  		</details>
		);
	}

} );