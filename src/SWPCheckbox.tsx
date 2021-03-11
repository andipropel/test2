import React, { FunctionComponent } from "react";
import SWPObjectChip from "./SWPObjectChip";
import {FormType } from './SWPCheckboxGroup';
const Checkbox = require('@myob/myob-widgets').Checkbox;

type SWPCheckboxParam = {
  code: string
  label: string,
  isChecked?: boolean,
  changeFn?: Function,
  clickFn?: Function,
  formType: FormType
};

const SWPCheckbox: FunctionComponent<SWPCheckboxParam> = (
  {
    code, 
    label, 
    isChecked = false,
    clickFn = undefined, 
    changeFn = undefined,
    formType
  }) => {
    
    let chip = 
      <SWPObjectChip 
        label={label} 
        code={code} 
        clickFn={clickFn} 
        formType={formType}
      />
  
    return (
      <Checkbox         
        labelAccessory={chip} 
        onChange={changeFn}
        checked={isChecked}
        name={code}
      />
    )
}

export default SWPCheckbox;