import { FunctionComponent } from "react"

type SWPLabelListParam = {
    options: [string, string][]
}


const SWPLabelList: FunctionComponent<SWPLabelListParam> = ({options}) => {
    return (
        <>
        {
            options.map(x => 
                (<div>
                    <span>{x[0]}</span>&nbsp;
                    <span style={{ fontWeight:"bold" }}>{x[1]}</span>
                </div>)
            )
        }
        </>
    );

    
}
    

export default SWPLabelList;