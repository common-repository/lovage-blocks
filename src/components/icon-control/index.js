import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import "./editor.scss"; 

const { BaseControl, Fragment, RadioControl, Button }  = wp.components
const { Component } = wp.element
const { __ } = wp.i18n;

library.add( fab, far, fas );


const iconList = (array=[]) => {;
    Object.keys(library.definitions.fas).forEach(function(key){
        array.push({
            label: <FontAwesomeIcon icon={ key } />, value: key
        });
    });

    return array;
}

class EB_IconControl extends Component {
   
   constructor(props){
       super( ...arguments );
   }

   render(){

    const {
        icon,
        onChangeComplete
    } = this.props;

     return (
        <div className="eb-icon-picker-control">
              <RadioControl
                selected={ icon }
                options={ iconList() }
                value={ icon }
                onChange={ onChangeComplete }
              />
        </div>
    );
   }

}

export default EB_IconControl;