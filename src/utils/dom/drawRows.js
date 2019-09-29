import {setSelection} from '../../methods/setSelection';
import {buildRows} from './buildRows';
import {selectRowEvent} from '../events/selectRowEvent';
import CustomEvent from '../polyfills/customEvent';
import gridPrivateProps from "../../gridPrivateProps";

export const drawRows = function(numero) {
    let t = performance.now();
    let tableElem = document.getElementById(this.options.id);
    let dataRow = buildRows(this.dataSet, this.options);
    if(tableElem) {
        let tbody = tableElem.tBodies[0];
        //if(tbody) {
            //tbody.innerHTML = '';
            tableElem.replaceChild(dataRow.tableDataRow,tbody);
            selectRowEvent.call(this,tbody);
        //}
        if(this.options.fixedColumns) {
            let fixedTabelElem = document.getElementById(this.options.id + 'FixedBody');
            if(fixedTabelElem) {
                let fixedBody = fixedTabelElem.tBodies[0];
                //if(fixedBody) {
                    //fixedBody.innerHTML = '';
                    fixedTabelElem.replaceChild(dataRow.fixedDataRow,fixedBody);
                    selectRowEvent.call(this,tbody,fixedBody);
                    selectRowEvent.call(this,fixedBody,tbody);
                //}
            }
        }
    }
    if(this.options.editable) {
        let editing = gridPrivateProps.domCache.get(this);
        if(editing) {
            for(let key in editing) {
                delete editing[key];
            }
        gridPrivateProps.domCache.set(this, editing);
        }
    }
    let event = new CustomEvent(this.options.id + '_Draw');
    window.dispatchEvent(event);
    this.selectedRow = null;
    setSelection.call(this, numero);
    console.log('drawRows end ' + (performance.now() - t));
}