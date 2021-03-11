import React, {FunctionComponent} from 'react';
import {FormType } from './SWPCheckboxGroup';
const ObjectChip = require('@myob/myob-widgets').ObjectChip;
const Icons = require('@myob/myob-widgets').Icons;

type SWPObjectChipParam = {
  label: string,
  code: string,
  showClose?: boolean,
  clickFn?: Function,
  closeFn?: Function,
  formType: FormType
};

const SWPObjectChip: FunctionComponent<SWPObjectChipParam> = (
    {
        label, 
        code, 
        closeFn = undefined, 
        clickFn = undefined,
        formType
    }
) => {      

  return (
    <div style={{ width: '500px' }} onClick={() => clickFn && clickFn(code, formType)}>
      <ObjectChip        
        icon={<Icons.GenericDocument/>}
        name={label}
        onRemove={closeFn}
      />  
    </div>
  );
}

export default SWPObjectChip;