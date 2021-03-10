import React, { FunctionComponent } from "react";
import SWPObjectChip from "./SWPObjectChip";
const Checkbox = require('@myob/myob-widgets').Checkbox;

type SWPCheckboxParam = {
  code: string
  label: string,
  isChecked?: boolean,
  changeFn?: Function,
  clickFn?: Function
};

const SWPCheckbox: FunctionComponent<SWPCheckboxParam> = (
  {
    code, 
    label, 
    isChecked = false,
    clickFn = undefined, 
    changeFn = undefined
  }) => {
    
    let chip = 
      <SWPObjectChip 
        label={label} 
        code={code} 
        clickFn={clickFn} 
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