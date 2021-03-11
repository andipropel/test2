import React, { FunctionComponent } from "react";
import SWPObjectChip from "./SWPObjectChip";
import { SWPOptionParam } from "./SWPCheckboxGroup";

type SWPListParam = {
    options: SWPOptionParam[],
    clickFn?: Function,
    closeFn?: Function
}

const SWPList: FunctionComponent<SWPListParam> = ({options, clickFn=undefined, closeFn=undefined }) =>{
    
    return (
        <>
            {
                options.map(
                    (o: any) => 
                        <SWPObjectChip 
                            label={o.label} 
                            code={o.code} 
                            clickFn={clickFn}
                            closeFn={closeFn}
                            formType={o.formType}
                        />
                )
            }
        </>
    )
};

export default SWPList;