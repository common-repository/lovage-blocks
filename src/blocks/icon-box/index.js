/**
 * Lovage Block: Icon Box
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
registerBlockType( 'lovage-blocks/icon-box', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon Box', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a icon box.', 'lovage-blocks' ), // Block description.
	icon: icons.iconbox, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'icon', 'lovage-blocks' ),
		__( 'icon box', 'lovage-blocks' ),
		__( 'box', 'lovage-blocks' ),
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-icon-box",
	      attribute: "id"
	    },
		icon: {
		  type: "string",
		  default: "bolt"
		},
		iconColor: {
		  type: "string",
		  default: "#000",
		},
		iconSize: {
		  type: "stirng",
		  default: "16"
		},
		iconBorderColor: {
		  type: "string",
		  default: "#eee"
		},
		iconShape: {
		  type: "string",
		  default: "square",
		},
		title: {
		  type: "string",
		  source: "text",
		  selector: ".eb-icon-box-title",
		},
		content: {
		  type: "string",
		  source: "text",
		  selector: ".eb-icon-box-desc",
		},
		titleFontSize: {
		  type: "string",
		  default: "18" 
		},
		titleColor: {
		  type: "string",
		  default: "#000",
		},
		contentFontSize: {
		  type: "string",
		  default: "16"
		},
		contentAlignment: {
		  type: "string",
		  default: "left",
		},
		contentColor: {
		  type: "string",
		  default: "#333",
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
		  icon,
		  iconSize,
		  iconColor,
		  iconBorderColor,
		  iconShape,
		  title,
		  content,
		  titleFontSize,
		  titleColor,
		  contentFontSize,
		  contentAlignment,
		  contentColor
		} = props.attributes;

		const {
			setAttributes,
			isSelected,
			editable,
			className
		} = props;

		if (!props.attributes.id) {
	      const id = `eb-icon-box-${Math.floor(Math.random() * 100)}`;
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

	    	<div 
	    	  className={ classnames(
	    	  				"eb-icon-box", 
	    	  				contentAlignment
	    	  			) }
	    	>

	    	   <div className={ classnames("eb-icon-box-image", iconShape ) }
	    	    	style={ { 
	    	    		fontSize: iconSize+'px'
	    	    	} }
	    	    >
				    <i style={{ color: iconColor, borderColor: iconBorderColor }} className={ classnames("fas", "fa-"+icon) }></i>
			   </div>
    	      

	    	   <div className="eb-icon-box-content">
		    	   <RichText
			            tagName="h4"
			            placeholder={ __( 'Title', 'lovage-blocks' ) }
			            value={ title }
			            className={ classnames('eb-icon-box-title', 'eb-text', 'eb-font-size-'+titleFontSize) }
			            onChange={ (value) => setAttributes( { title: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
			            style={ {
								color: titleColor
							  } }
						keepPlaceholderOnFocus={true}
		  		   />

		    	   <RichText
			            tagName="p"
			            placeholder={ __( 'Content', 'lovage-blocks' ) }
			            value={ content }
			            className={ classnames('eb-icon-box-desc', 'eb-text', 'eb-font-size-'+contentFontSize) }
			            onChange={ (value) => setAttributes( { content: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
			            style={ {
								color: contentColor
							  } }
						keepPlaceholderOnFocus={true}
		  			/>
			  	</div>
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
		  icon,
		  iconSize,
		  iconColor,
		  iconBorderColor,
		  iconBorderWidth,
		  iconShape,
		  title,
		  content,
		  titleFontSize,
		  titleColor,
		  contentFontSize,
		  contentAlignment,
		  contentColor
		} = props.attributes;

		return (
			<div 
	    	  className={ classnames(
	    	  				"eb-icon-box", 
	    	  				contentAlignment
	    	  			) } 
	    	>
				<div className={ classnames("eb-icon-box-image", iconShape ) }
	    	    	style={ { 
	    	    		fontSize: iconSize+'px'
	    	    	} }
	    	    >
				    <i style={{ color: iconColor, borderColor: iconBorderColor }} className={ classnames("fas", "fa-"+icon) }></i>
			   </div>
				
				<div className="eb-icon-box-content">
				{ title && (
				   	 <RichText.Content
				   	    tagName="h4"
				   	    className={ classnames('eb-icon-box-title', 'eb-text', 'eb-font-size-'+titleFontSize) }
				   	    style={ {
								color: titleColor
						} }
				   	    value={ title }
				   	 />
				) }

				{ content && (
				     <RichText.Content
				   	    tagName="p"
				   	    className={ classnames('eb-icon-box-desc', 'eb-text', 'eb-font-size-'+contentFontSize) }
				   	    style={ {
								color: contentColor
						} }
				   	    value={ content }
				   	  />
				) }
				</div>
			</div>
		);
	}

} );