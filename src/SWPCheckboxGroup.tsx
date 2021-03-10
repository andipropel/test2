import React, {useState, useEffect, FunctionComponent } from 'react';
import SWPCheckbox from './SWPCheckbox';

export type SWPOptionParam = {
    code: string
    label: string
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

    useEffect(() => {
        if (checkFn) 
        {
            let selectedCodes = Object.values(state)
                                .filter((x:any) => x.isChecked)
                                .map((x:any) => x.code);
            checkFn(selectedCodes);
        }
    }, [state, checkFn]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        var newObj = Object.assign({}, state[event.target.name]);
        newObj.isChecked = !newObj.isChecked;
        setState({ 
            ...state, 
            [event.target.name]: newObj 
        });
    };

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
                        clickFn={clickFn}
                    />
            )
        }
        </>
    )
}

export default SWPCheckboxGroup;