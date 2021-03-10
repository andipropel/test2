import React, {FunctionComponent} from 'react';
const ObjectChip = require('@myob/myob-widgets').ObjectChip;
const Icons = require('@myob/myob-widgets').Icons;

type SWPObjectChipParam = {
  label: string,
  code: string,
  showClose?: boolean,
  clickFn?: Function,
  closeFn?: Function
};

const SWPObjectChip: FunctionComponent<SWPObjectChipParam> = (
    {
        label, 
        code, 
        closeFn = undefined, 
        clickFn = undefined
    }
) => {      

  return (
    <div style={{ width: '500px' }} onClick={() => clickFn && clickFn(code)}>
      <ObjectChip        
        icon={<Icons.GenericDocument/>}
        name={label}
        onRemove={closeFn}
      />  
    </div>
  );
}

export default SWPObjectChip;