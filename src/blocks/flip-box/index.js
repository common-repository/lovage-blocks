/**
 * Lovage Block: Flip Box
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import icons from '../../components/icons';

import React, { Component } from 'react';

// Import CSS.
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n; // Import __() from wp.i18n

// Register block
const { registerBlockType } = wp.blocks;

const { RichText } = wp.editor;

class EBFlipBook extends Component{

    render(){
    	const {
		  frontTitle,
		  frontContent,
		  frontBackgroundColor,
		  frontBackgroundImage,
		  backTitle,
		  backContent,
		  backBackgroundColor,
		  backBackgroundImage,
		} = this.props.attributes;

		const {
			setAttributes,
			isSelected,
			editable,
			className
		} = this.props;

		if (!this.props.attributes.id) {
	      const id = `eb-flip-box-${Math.floor(Math.random() * 100)}`;
	      this.props.setAttributes({
	        id
	      });
	    }

	    return [

	    	// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,

			
			
	    	<div id={ this.props.attributes.id } className="eb-flip-box">
	    	   <div className="flipper">
	    	   	   <div class="front">
			            <div class="inner">
			              <RichText
				            tagName="strong"
				            placeholder={ __( 'Title', 'lovage-blocks' ) }
				            value={ frontTitle }
				            className={ classnames('title') }
				            onChange={ (value) => setAttributes( { frontTitle: value } ) }
		  		         />
			             <RichText
				            tagName="p"
				            placeholder={ __( 'Content', 'lovage-blocks' ) }
				            value={ frontContent }
				            className={ classnames('content') }
				            onChange={ (value) => setAttributes( { frontContent: value } ) }
		  		         />
		  		       </div>
			       </div>
	    	      
	    	       <div class="back">
			            <div class="inner">
			              <RichText
				            tagName="strong"
				            placeholder={ __( 'Title', 'lovage-blocks' ) }
				            value={ backTitle }
				            className={ classnames('title') }
				            onChange={ (value) => setAttributes( { backTitle: value } ) }
		  		         />
			             <RichText
				            tagName="p"
				            placeholder={ __( 'Content', 'lovage-blocks' ) }
				            value={ backContent }
				            className={ classnames('content') }
				            onChange={ (value) => setAttributes( { backContent: value } ) }
		  		         />
		  		       </div>
			       </div>

			  	</div>
	    	</div>
	    ];
    }
}

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
registerBlockType( 'lovage-blocks/flip-box', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Flip Box', 'lovage-blocks' ), // Block title.
	description: __( 'Block showing a 3D flip box.', 'lovage-blocks' ), // Block description.
	icon: icons.flipbox, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'lovage-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'flip box', 'lovage-blocks' ),
		__( 'flip', 'lovage-blocks' ),
		__( 'flipbox', 'lovage-blocks' ),
	],
	attributes: {
		id: {
		  type: "string",
	      source: "attribute",
	      selector: ".eb-flip-box",
	      attribute: "id"
	    },
		frontTitle: {
		  type: "string",
		  source: "text",
		  selector: ".eb-flip-box .front .title",
		},
		frontContent: {
		  type: "string",
		  source: "text",		  
		  selector: ".eb-flip-box .front .content",
		},
		frontBackgroundColor: {
		  type: "string",
		  default: "#000",
		},
		frontBackgroundImage: {
		  type: "string"
		},
		backTitle: {
		  type: "string",
		  source: "text",
		  selector: ".eb-flip-box .back .title",
		},
		backContent: {
		  type: "string",
		  source: "text",		  
		  selector: ".eb-flip-box .back .content",
		},
		backBackgroundColor: {
		  type: "string",
		  default: "#fc0",
		},
		backBackgroundImage: {
		  type: "string"
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
	edit: EBFlipBook,

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
		  frontTitle,
		  frontContent,
		  frontBackgroundColor,
		  frontBackgroundImage,
		  backTitle,
		  backContent,
		  backBackgroundColor,
		  backBackgroundImage,
		} = props.attributes;

		const hover = () => { this.classList.toggle() }

		return (
			<div id={ props.attributes.id }  className="eb-flip-box">
	    	   <div class="flipper">
	    	   	   <div class="front">
			            <div class="inner">
			              <RichText.Content
				            tagName="strong"
				            placeholder={ __( 'Title', 'lovage-blocks' ) }
				            value={ frontTitle }
				            className={ classnames('title') }
		  		         />
			             <RichText.Content
				            tagName="p"
				            placeholder={ __( 'Content', 'lovage-blocks' ) }
				            value={ frontContent }
				            className={ classnames('content') }
		  		         />
		  		       </div>
			       </div>
	    	      
	    	       <div class="back">
			            <div class="inner">
			              <RichText.Content
				            tagName="strong"
				            placeholder={ __( 'Title', 'lovage-blocks' ) }
				            value={ backTitle }
				            className={ classnames('title') }
		  		         />
			             <RichText.Content
				            tagName="p"
				            placeholder={ __( 'Content', 'lovage-blocks' ) }
				            value={ backContent }
				            className={ classnames('content') }
		  		         />
		  		       </div>
			       </div>

			  	</div>
	    	</div>
		);
	}

} );