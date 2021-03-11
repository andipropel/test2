import '@myob/myob-styles/dist/styles/myob-clean.css';
import React, { useState } from 'react';
import rawResult from './response.json';
import SWPCheckboxGroup, { SWPOptionParam, FormType } from './SWPCheckboxGroup';
import SWPList from './SWPList';
import SWPLabelList from './SWPLabelList';
const Modal = require('@myob/myob-widgets').Modal;
const Button = require('@myob/myob-widgets').Button;




const clientId = "123124123125" //placeholder
const taxComplianceId = "123124123125" //placeholder

const convertResult = () => {
  var swps:any = {};

  rawResult.included.forEach(x => swps[x.id] = x.attributes);

  var output:any = {};
  rawResult.data.forEach(x => { 
    x.relationships.schedules.data.forEach((s:any) => {
      if (!s) return;
      var code = swps[s.id].code;
      if (!output[code])
        output[code] = {...swps[s.id], "labels": [...x.attributes.labels]};
      else 
        output[code].labels = output[code].labels.concat(x.attributes.labels);    
    });
    
    x.relationships.workpapers.data.forEach((s:any) => {
      if (!s) return;
      var code = s && swps[s.id].code;
      if (!output[code])
        output[code] = {...swps[s.id], "labels": [...x.attributes.labels]};
      else
        output[code].labels = output[code].labels.concat(x.attributes.labels);    
    });
  });
  return Object.values(output);
}

function App() {
  let modalTitle = "title";
  let result:any[] = convertResult();

  const [checkedCodeState, setCodeState] = useState<any[]>([]);
  const [labelOptionsState, setLabelOptionsState] = useState<any[]>([]);

  const buildOptions = () => {
    let options = result
                    .filter((s:any) => !s.hasOwnProperty("activeSchedules") || s.activeSchedules.length < s.maxAllowed )
                    .map((x:any) => ({label:x.name, code:x.code, formType: FormType.Schedule }));

    options.concat(
      result
      .filter((s:any) => !s.hasOwnProperty("activeWorkpapers") )
      .map((x:any) => ({label:x.name, code:x.code, formType: FormType.TaxWorkpaper }))
    );

    return options;
  }
  
  let options = buildOptions();

  let activeOptions:SWPOptionParam[] = [];
  result.forEach(
    (s:any) => {
      s.activeSchedules?.forEach(
          (id:any) => activeOptions.push({label:s.name, code:id, formType: FormType.Schedule })
      )
      s.activeWorkpapers?.forEach(
        (id:any) => activeOptions.push({label:s.name, code:id, formType: FormType.TaxWorkpaper})        
      )
    }
  );
  
  const changeLabelOptionState = (checkedCode: any[]) => {
    debugger;
    if (!checkedCode) return;
    let codes = checkedCode.map(x => x.code);
    let allLabels:any[] = [];
    result
        .filter((s:any) => codes.includes(s.code))
        .forEach((s:any) => {allLabels = allLabels.concat(s.labels)});

    let labelOptions = allLabels.map(x => [x.label, x.auxLabel]);
    setLabelOptionsState(labelOptions);
  }

  const handleCheckboxChange = (checkedCode: any[]) => {
    setCodeState(checkedCode);
    changeLabelOptionState(checkedCode);
  }

  

  const handleActiveClick = (code: string, formType: FormType) => {
    let form = ''
    if (formType === FormType.Schedule)
      form = 'schedule';
    else if (formType === FormType.TaxWorkpaper)  
      form = 'taxworkpaper';
    let link = `/client/${clientId}/compliance/${taxComplianceId}/tax-return/${form}/${code}`
    window.open(link);
  }

  return (
    <Modal title={modalTitle} show={true}>
      <Modal.Body>
        <SWPList
          options={activeOptions}
          clickFn={handleActiveClick}
          closeFn={() => {console.log("close")}}
        />
        
        <SWPCheckboxGroup
          options={options} 
          checkFn={handleCheckboxChange}
        />

        <SWPLabelList
          options={labelOptionsState}
        />
          
      </Modal.Body>
      <Button  onClick={() => {}}> Add </Button>
    </Modal>
    );
}

export default App;
