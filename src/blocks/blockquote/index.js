/**
 * Lovage Block: Blockquote
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
registerBlockType( 'lovage-blocks/blockquote', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Blockquote', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a blockquote.', 'lovage-blocks' ), // Block description.
	icon: icons.blockquote, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'quote', 'lovage-blocks' ),
		__( 'blockquote', 'lovage-blocks' )
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-blockquote",
	      attribute: "id"
	    },
		avatar: {
		  type: "string",
		  source: "attribute",
		  selector: "img",
		  attribute: "src"
		},
		name: {
		  type: "string",
		  source: "text",
		  selector: ".eb-blockquote-name",
		},
		job: {
		  type: "string",
		  source: "text",
		  selector: ".eb-blockquote-job",
		},
		content: {
		  type: "string",
		  source: "text",
		  selector: ".eb-blockquote-detail",
		},
		avatarShape: {
		  type: "string",
		  default: "square",
		},
		nameFontSize: {
		  type: "string",
		  default: "14" 
		},
		nameColor: {
		  type: "string",
		  default: "#000",
		},
		contentFontSize: {
		  type: "string",
		  default: "18"
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
		  avatar,
		  avatarShape,
		  name,
		  job,
		  content,
		  nameFontSize,
		  nameColor,
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
	      const id = `eb-blockquote-${Math.floor(Math.random() * 100)}`;
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
	    	  				"eb-blockquote", 
	    	  				contentAlignment
	    	  			) }
	    	>

	    	   <div className="eb-blockquote-content">
		    	   
		    	   <RichText
			            tagName="blockquote"
			            placeholder={ __( 'Content', 'lovage-blocks' ) }
			            value={ content }
			            className={ classnames('eb-blockquote-detail', 'eb-text', 'eb-font-size-'+contentFontSize) }
			            onChange={ (value) => setAttributes( { content: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
			            keepPlaceholderOnFocus={true}
			            style={ {
								color: contentColor
							  } }
		  			/>

		  			<div className="eb-blockquote-info">
			    	    <MediaUpload
							buttonProps={ {
								className: 'change-image'
							} }
							onSelect={ ( img ) => setAttributes(
								{
									avatar: img.url
								}
							) }
							allowed={ ALLOWED_MEDIA_TYPES }
							type="image"
							value={ avatar }
							render={ ( { open } ) => (
								<Button onClick={ open } className="eb-blockquote-button">
								    <div className={ classnames("eb-blockquote-avatar", avatarShape) }>
									{ ! avatar ? icons.user : 
									   <img src={ avatar } alt={ name } className={ avatarShape } />
								    }
								    </div>
								</Button>
							) }
						  >
						</MediaUpload>

					    <div className="eb-blockquote-profile">
						  <RichText
				            tagName="h4"
				            placeholder={ __( 'Name', 'lovage-blocks' ) }
				            value={ name }
				            className={ classnames('eb-blockquote-name', 'eb-text', 'eb-font-size-'+nameFontSize) }
				            onChange={ (value) => setAttributes( { name: value } ) }
				            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
				            style={ {
									color: nameColor
								  } }
			  		      />
			  		      <RichText
				            tagName="span"
				            placeholder={ __( 'Job', 'lovage-blocks' ) }
				            value={ job }
				            className={ classnames('eb-blockquote-job', 'eb-text', 'eb-font-size-'+nameFontSize) }
				            onChange={ (value) => setAttributes( { job: value } ) }
				            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
				            style={ {
									color: nameColor
								  } }
			  		      />
			  		    </div>
		  		    </div>
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
		  avatar,
		  avatarShape,
		  name,
		  job,
		  content,
		  nameFontSize,
		  nameColor,
		  contentFontSize,
		  contentAlignment,
		  contentColor
		} = props.attributes;

		return (
			<div
			  id={ props.attributes.id } 
	    	  className={ classnames(
	    	  				"eb-blockquote", 
	    	  				contentAlignment
	    	  			) }
	    	>

	    	   <div className="eb-blockquote-content">
		    	   
		    	   <RichText.Content
			            tagName="blockquote"
			            value={ content }
			            className={ classnames('eb-blockquote-detail', 'eb-text', 'eb-font-size-'+contentFontSize) }
			            style={ {
								color: contentColor
							  } }
		  			/>

		  			{ name &&
		  			<div className="eb-blockquote-info">
						{ avatar &&
						   <div className={ classnames("eb-blockquote-avatar", avatarShape) }>
						      <img src={ avatar } alt={ name } className={ avatarShape } />
						   </div>
					    }
					    { name &&
					      <div className="eb-blockquote-profile">
							  <RichText.Content
					            tagName="h4"
					            value={ name }
					            className={ classnames('eb-blockquote-name', 'eb-text', 'eb-font-size-'+nameFontSize) }
					            style={ {
										color: nameColor
									  } }
				  		      />
				  		      <RichText.Content
					            tagName="span"
					            value={ job }
					            className={ classnames('eb-blockquote-job', 'eb-text', 'eb-font-size-'+nameFontSize) }
					            style={ {
										color: nameColor
									  } }
				  		      />
			  		      </div>
			  		     }
		  		      </div>
		  		    }
			  	</div>
	    	</div>
		);
	}

} );