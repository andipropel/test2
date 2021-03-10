import React, { FunctionComponent } from "react";
import SWPObjectChip from "./SWPObjectChip";
import { SWPOptionParam } from "./SWPCheckboxGroup";

type SWPListParam = {
    options: SWPOptionParam[],
    clickFn?: Function
}

const SWPList: FunctionComponent<SWPListParam> = ({options, clickFn=undefined }) =>{
    
    return (
        <>
            {
                options.map(
                    (o: any) => 
                        <SWPObjectChip 
                            label={o.label} 
                            code={o.code} 
                            clickFn={clickFn} 
                        />
                )
            }
        </>
    )
};

export default SWPList;