import '@myob/myob-styles/dist/styles/myob-clean.css';
import rawResult from './response.json';
import SWPCheckboxGroup, { SWPOptionParam } from './SWPCheckboxGroup';
import SWPList from './SWPList';
const Modal = require('@myob/myob-widgets').Modal;

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
  debugger;
  let options = result
                  .filter((s:any) => !s.hasOwnProperty("activeSchedules") || !s.activeSchedules)
                  .map((x:any) => ({label:x.name, code:x.code}));
  
  let activeOptions:SWPOptionParam[] = [];
  result.forEach(
    (s:any) => {
      if (!s.activeSchedules) return;
      s.activeSchedules.forEach(
          (id:any) => activeOptions.push({label:s.name, code:id})
      )
    }
  );
  
  const handleCheckboxChange = (checkedCode: string[]) => {
    console.log(checkedCode);
  }

  // const handleClick = (code: string) => {
  //   alert(code);
  //   //close modal
  // }

  const handleActiveClick = (code: string) => {
    alert (code);
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
      </Modal.Body>

    </Modal>
    );
}

export default App;
