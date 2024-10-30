/**
 * Lovage Block: Progress Bar
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

const { RichText } = wp.editor;

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
registerBlockType( 'lovage-blocks/progress-bar', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Progress Bar', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a prodress bar.', 'lovage-blocks' ), // Block description.
	icon: icons.progressbar, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'skill', 'lovage-blocks' ),
		__( 'progress bar', 'lovage-blocks' ),
		__( 'process', 'lovage-blocks' ),
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-progress-bar",
	      attribute: "id"
	    },
		title: {
		  type: "string",
		  source: "text",
		  selector: ".eb-progress-bar-title"
		},
		percent: {
		  type: "number",
		  default: "50",
		},
		barColor: {
		  type: "string",
		  default: "#000",
		},
		bgColor: {
		  type: "string",
		  default: "#eee",
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
		  title,
		  percent,
		  barColor,
		  bgColor
		} = props.attributes;

		const {
			setAttributes,
			isSelected,
			editable,
			className
		} = props;

		if (!props.attributes.id) {
	      const id = `eb-progress-bar-${Math.floor(Math.random() * 100)}`;
	      props.setAttributes({
	        id
	      });
	    }

	    return [

	    	// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...props } }
			/>,

	    	<div id={ props.attributes.id }  className="eb-progress-bar" style={{ backgroundColor: bgColor }}>
	    	    <div className="eb-progress-bar-highlight" style={{ width: percent+'%', backgroundColor: barColor }}>
	    	       <RichText
			            tagName="strong"
			            placeholder={ __( 'Title', 'lovage-blocks' ) }
			            value={ title }
			            className={ classnames('eb-progress-bar-title') }
			            onChange={ (value) => setAttributes( { title: value } ) }
		  		   />
		  		   <span>{ percent } %</span>
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
		  title,
		  percent,
		  barColor,
		  bgColor
		} = props.attributes;

		return (
			<div id={ props.attributes.id } className="eb-progress-bar" style={{ backgroundColor: bgColor }}>
	    	    <div className="eb-progress-bar-highlight" style={{ width: percent+'%', backgroundColor: barColor }}>
	    	       <RichText.Content
			            tagName="strong"
			            value={ title }
			            className={ classnames('eb-progress-bar-title') }
		  		   />
		  		   <span>{ percent } %</span>
			  	</div>
	    	</div>
		);
	}

} );