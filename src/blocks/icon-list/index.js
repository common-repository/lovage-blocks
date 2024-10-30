/**
 * Lovage Block: Icon List
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
	URLInput
} = wp.editor;

// Register components
const {
	Button,
    IconButton,
	Dashicon
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
registerBlockType( 'lovage-blocks/icon-list', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon List', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a icon list.', 'lovage-blocks' ), // Block description.
	icon: icons.iconList, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'icon', 'lovage-blocks' ),
		__( 'icon list', 'lovage-blocks' ),
		__( 'list', 'lovage-blocks' ),
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-icon-list",
	      attribute: "id"
	    },
		title: {
		  type: "string",
		  source: "text",
		  selector: ".eb-icon-list-title",
		},
		link: {
		  type: "string",
		  source: "attribute",
		  selector: ".eb-icon-list-title a",
		  attribute: "href"
		},
		linkTarget: {
		  type: "boolean",
		  default: 0
		},
		titleFontSize: {
		  type: "string",
		  default: "18" 
		},
		titleColor: {
		  type: "string",
		  default: "#000",
		},
		icon: {
		  type: "string",
		  default: "dot"
		},
		iconSize: {
		  type: "string",
		  default: "16"
		},
		iconColor: {
		  type: "string",
		  default: "#333",
		},
		alignment: {
		  type: "string",
		  default: "left",
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
		  titleFontSize,
		  titleColor,
		  link,
		  linkTarget,
		  icon,
		  iconSize,
		  iconColor,
		  alignment
		} = props.attributes;

		const {
			setAttributes,
			isSelected,
			editable,
			className
		} = props;

		if (!props.attributes.id) {
	      const id = `eb-icon-list-${Math.floor(Math.random() * 100)}`;
	      props.setAttributes({
	        id
	      });
	    }

	    return [

	    	// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( value ) => setAttributes( { 
												alignment: value
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
	    	  				"eb-icon-list", 
	    	  				alignment
	    	  			) }
	    	>
	    	   <div className={ classnames("eb-icon-list-icon" ) }
	    	    	style={ { 
	    	    		fontSize: iconSize+'px'
	    	    	} }
	    	    >
				    <i style={{ color: iconColor }} className={ classnames("fas", "fa-"+icon) }></i>
			   </div>
    	      

	    	   <div className="eb-icon-list-title">
		    	   <RichText
			            tagName="span"
			            placeholder={ __( 'Title', 'lovage-blocks' ) }
			            value={ title }
			            className={ classnames('eb-icon-list-text', 'eb-text', 'eb-font-size-'+titleFontSize) }
			            onChange={ (value) => setAttributes( { title: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
			            keepPlaceholderOnFocus
			            style={ {
								color: titleColor
							  } }
		  		   />
			  	</div>
	    	</div>,

	    	isSelected && (
				<form
					key="form-link"
					className={ `blocks-button__inline-link eb-button-${alignment}`}
					onSubmit={ event => event.preventDefault() }
					style={ {
						textAlign: alignment,
					} }
				>
					<Dashicon icon={ 'admin-links' } />
					<URLInput
						className="button-url"
						value={ link }
						onChange={ ( value ) => setAttributes( { link: value } ) }
					/>
					<IconButton
						icon="editor-break"
						label={ __( 'Apply', 'lovage-blocks' ) }
						type="submit"
					/>
				</form>
			)
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
		  titleFontSize,
		  titleColor,
		  link,
		  linkTarget,
		  icon,
		  iconSize,
		  iconColor,
		  alignment
		} = props.attributes;

		return (
			<div 
	    	  id={ props.attributes.id }
	    	  className={ classnames(
	    	  				"eb-icon-list", 
	    	  				alignment
	    	  			) }
	    	>
	    	   <div className={ classnames("eb-icon-list-icon" ) }
	    	    	style={ { 
	    	    		fontSize: iconSize+'px'
	    	    	} }
	    	    >
				    <i style={{ color: iconColor }} className={ classnames("fas", "fa-"+icon) }></i>
			   </div>
    	      

	    	   <div className="eb-icon-list-title">
	    	    { link ?
	    	       <a href={ link } target={ linkTarget ? '_blank' : '_self' }>
			    	   <RichText.Content
				            tagName="span"
				            value={ title }
				            className={ classnames('eb-icon-list-text', 'eb-text', 'eb-font-size-'+titleFontSize) }
				            style={ {
									color: titleColor
								  } }
			  		   />
		  		   </a>
		  		   : 
		  		   <RichText.Content
			            tagName="span"
			            value={ title }
			            className={ classnames('eb-icon-list-text', 'eb-text', 'eb-font-size-'+titleFontSize) }
			            style={ {
								color: titleColor
							  } }
		  		   />
		  	    }
			  	</div>
	    	</div>
		);
	}

} );