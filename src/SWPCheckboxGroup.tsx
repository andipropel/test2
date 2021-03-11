import React, {useState, FunctionComponent } from 'react';
import SWPCheckbox from './SWPCheckbox';

export enum FormType{
    Schedule,
    TaxWorkpaper
}

export type SWPOptionParam = {
    code: string,
    label: string,
    formType: FormType
};

type SWPCheckboxGroupParam = {
    options: SWPOptionParam[],
    checkFn?: Function,
    clickFn?: Function
};


const SWPCheckboxGroup: FunctionComponent<SWPCheckboxGroupParam> = ({options, checkFn = undefined, clickFn = undefined }) =>{

    const [state, setState] = useState<any>(() => {
        let tempState:any = {};
        options.forEach(
            x => tempState[x.code] = {
                ...x, 
                isChecked: false
            }
        );
        return tempState;
    });

    const triggerCheckFn = (theState:any) => {
        if (checkFn) 
        {
            let selectedCodes = Object.values(theState)
                                .filter((x:any) => x.isChecked)
                                .map((x:any) => ({ code: x.code, formType: x.formType }));
            checkFn(selectedCodes);
        }
    }

    const checkboxChange = (code: string) => {
        let newObj = Object.assign({}, state[code]);
        newObj.isChecked = !newObj.isChecked;
        let newState = {...state, [code]: newObj};
        setState(newState); 
        triggerCheckFn(newState);       
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        checkboxChange(event.target.name);
    };

    const handleClick = (code:string) => {
        checkboxChange(code);
    }

    return (
        <>
        {
            Object.values(state).map(
                (s:any) => 
                    <SWPCheckbox
                        code={s.code}
                        label={s.label}
                        isChecked={s.isChecked}
                        changeFn={handleChange}
                        clickFn={clickFn || handleClick}
                        formType={s.formType}
                    />
            )
        }
        </>
    )
}

export default SWPCheckboxGroup;