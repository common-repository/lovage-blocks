/**
 * Lovage Block: Button
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
	URLInput,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
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
registerBlockType( 'lovage-blocks/button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Button', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a button.', 'lovage-blocks' ), // Block description.
	icon: icons.button, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'button', 'lovage-blocks' )
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-block-button",
	      attribute: "id"
	    },
	    buttonAlignment: {
	      type: "string",
	      default: "left",
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
		  selector: ".eb-button-text",
		},
		buttonShape: {
		  type: "string",
		  default: "square",
		},
		buttonFontSize: {
		  type: "string",
		  default: "16" 
		},
		buttonTextColor: {
		  type: "string",
		  default: "#fff",
		},
		buttonBackgroundColor: {
		  type: "string",
		  default: "#000",
		},
		buttonSize: {
		  type: "string",
		  default: "5"
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
		  buttonAlignment,
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
			editable,
			isSelected,
			className
		} = props;

		if (!props.attributes.id) {
	      const id = `eb-button-${Math.floor(Math.random() * 100)}`;
	      props.setAttributes({
	        id
	      });
	    }

	    return [

	    	// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ buttonAlignment }
					onChange={ ( value ) => {
						setAttributes( { buttonAlignment: value } );
					} }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...props } }
			/>,
			<div id={ props.attributes.id } className={ classnames("eb-block-button", buttonAlignment, buttonShape) }>
		    	<span className="eb-button" 
		    	   style={ { 
		    	   	 background: buttonBackgroundColor, 
		    	   	 paddingTop: buttonSize+'px',
		    	   	 paddingBottom: buttonSize+'px',
		    	   	 paddingLeft: parseInt(buttonSize*3)+'px',
		    	   	 paddingRight: parseInt(buttonSize*3)+'px'
		    	   } }
		    	>
		    	   <RichText
			            tagName="span"
			            placeholder={ __( 'Button Text', 'lovage-blocks' ) }
			            value={ buttonText }
			            className={ classnames('eb-button-text', 'eb-text', 'eb-font-size-'+buttonFontSize) }
			            onChange={ (value) => setAttributes( { buttonText: value } ) }
			            formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
			            keepPlaceholderOnFocus={true}
			            style={ {
								color: buttonTextColor,
								background: buttonBackgroundColor
							  } }
		  		   />
		    	</span>
	    	</div>,

	    	isSelected && (
				<form
					key="form-link"
					className={ `blocks-button__inline-link eb-button-${buttonAlignment}`}
					onSubmit={ event => event.preventDefault() }
					style={ {
						textAlign: buttonAlignment,
					} }
				>
					<Dashicon icon={ 'admin-links' } />
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
		  buttonAlignment,
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
			<div id={ props.attributes.id } className={ classnames("eb-block-button", buttonAlignment, buttonShape) }>
				<a className="eb-button" 
				   href={ buttonUrl } 
				   style={ { 
				   	 background: buttonBackgroundColor, 
		    	   	 paddingTop: buttonSize+'px',
		    	   	 paddingBottom: buttonSize+'px',
		    	   	 paddingLeft: parseInt(buttonSize*3)+'px',
		    	   	 paddingRight: parseInt(buttonSize*3)+'px'
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
		);
	}

} );