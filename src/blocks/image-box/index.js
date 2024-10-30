/**
 * Lovage Block: Image Box
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
	MediaUpload,
	RichText,
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

// Register components
const {
	Button
} = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

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
registerBlockType( 'lovage-blocks/image-box', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Image Box', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a image box.', 'lovage-blocks' ), // Block description.
	icon: icons.imagebox, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'image', 'lovage-blocks' ),
		__( 'image box', 'lovage-blocks' ),
		__( 'member', 'lovage-blocks' ),
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-image-box",
	      attribute: "id"
	    },
	    imageSize: {
	      type: "string",
	      default: "100"
	    },
		imageURL: {
		  type: "string",
		  source: "attribute",
		  selector: "img",
		  attribute: "src"
		},
		imageAlt: {
		  type: "string",
		  source: "attribute",
		  selector: "img",
		  attribute: "alt"
		},
		title: {
		  type: "string",
		  source: "text",
		  selector: ".eb-image-box-title",
		},
		content: {
		  type: "string",
		  source: "text",
		  selector: ".eb-image-box-desc",
		},
		imageShape: {
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
		  imageSize,
		  imageURL,
		  imageAlt,
		  imageShape,
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
	      const id = `eb-image-box-${Math.floor(Math.random() * 100)}`;
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
	    	  id={ props.attributes.id }
	    	  className={ classnames(
	    	  				"eb-image-box", 
	    	  				contentAlignment
	    	  			) }
	    	>

    	      <MediaUpload
				buttonProps={ {
					className: 'change-image'
				} }
				onSelect={ ( img ) => setAttributes(
					{
						imageURL: img.url,
						imageAlt: img.title,
					}
				) }
				allowed={ ALLOWED_MEDIA_TYPES }
				type="image"
				value={ imageURL }
				render={ ( { open } ) => (
					<Button onClick={ open } className="eb-image-box-button">
						{ ! imageURL ? icons.image : 
						   <div className="eb-image-box-image">
						     <img src={ imageURL } alt={ imageAlt } className={ imageShape } style={{ width: imageSize+'%' }} />
						   </div>
					    }
					</Button>
				) }
			  >
			  </MediaUpload>

	    	   <div className="eb-image-box-content">
		    	   <RichText
			            tagName="h4"
			            placeholder={ __( 'Title', 'lovage-blocks' ) }
			            value={ title }
			            className={ classnames('eb-image-box-title', 'eb-text', 'eb-font-size-'+titleFontSize) }
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
			            className={ classnames('eb-image-box-desc', 'eb-text', 'eb-font-size-'+contentFontSize) }
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
		  imageSize,
		  imageURL,
		  imageAlt,
		  imageShape,
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
			  id={ props.attributes.id }
	    	  className={ classnames(
	    	  				"eb-image-box", 
	    	  				contentAlignment
	    	  			) } 
	    	>
				<div className="eb-image-box-image">
				  <img src={ imageURL } alt={ imageAlt } className={ imageShape } style={{ width: imageSize+'%' }} />
				</div>
				
				<div className="eb-image-box-content">
				{ title && (
				   	 <RichText.Content
				   	    tagName="h4"
				   	    className={ classnames('eb-image-box-title', 'eb-text', 'eb-font-size-'+titleFontSize) }
				   	    style={ {
								color: titleColor
						} }
				   	    value={ title }
				   	 />
				) }

				{ content && (
				     <RichText.Content
				   	    tagName="p"
				   	    className={ classnames('eb-image-box-desc', 'eb-text', 'eb-font-size-'+contentFontSize) }
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