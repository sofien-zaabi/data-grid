import gridPrivateProps from "../../gridPrivateProps";
import { sanitizeHTML } from "../sanitizeHTML";

export const resetCellEdit = function(cellElem, column, rowIndex) {
    let editElem, cellText;
    let cellName = column.data;
    let cellData = this.dataSet[rowIndex][cellName];
    let editing = gridPrivateProps.domCache.get(this) ? gridPrivateProps.domCache.get(this) : {};
    if(cellElem) {
        editElem = cellElem.querySelector('input,select,textara');
        if(editElem) {
            let elemVal;
            console.log("resetCellEdit ", editElem)
            if(editElem.type === 'checkbox' || editElem.type === 'radio')
                elemVal = editElem.checked;
            else 
                elemVal = editElem.value;

            try {
                let convertedVal = JSON.parse(elemVal);
                //console.log("reset cell edit " + cellData + " ", convertedVal)
                if(convertedVal !== cellData)
                    this.dataSet[rowIndex][cellName] = convertedVal;
            }catch(error) {
                if(elemVal && elemVal !== cellData)    
                    this.dataSet[rowIndex][cellName] = elemVal;
            }
            if(editElem.type.indexOf('select') > -1)
                cellText = editElem.selectedIndex > -1 ? editElem.options[editElem.selectedIndex].text : cellData;
            else 
                cellText = elemVal ? elemVal : cellData;
            //if(typeof editElem.onchange === 'function')
                //editElem.onchange.call(editElem);
            //if(typeof editElem.onblur === 'function')
               // editElem.onblur.call(editElem);
        }
        if(!cellText) {
            if(typeof column.render === 'function')
                cellText = sanitizeHTML(column.render(cellData, this.dataSet[rowIndex],column)) || column.render(cellData, this.dataSet[rowIndex], column);
            else 
                cellText = cellData;
        }
        let cachedElem = cellElem.replaceChild(cellText instanceof Node ? cellText : document.createTextNode(cellText), cellElem.firstElementChild || cellElem.firstChild);
        console.log("reset cell edit ", cachedElem)
        if(editing[cellName + '_' + rowIndex]) {
            editing[cellName + '_' + rowIndex] = cachedElem;
            gridPrivateProps.domCache.set(this, editing);
        }
    }
    return cellElem;
}