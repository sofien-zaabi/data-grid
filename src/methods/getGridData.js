import * as dom from '../utils/dom';
import { gridClasses } from '../utils/gridClasses';

/**
 * get data from table
 * @param {*} rowID 
 * @param {*} cellName 
 */
export const getGridData = function(rowID, cellName) {
    let data;
    let gridBody = dom.getGridBody(this.options.id);
    if(gridBody) {
        let currentRow;
        if(rowID)
            currentRow = gridBody.querySelector('tr[id="' + rowID + '"]');
        else 
            currentRow = gridBody.querySelector('tr.' + gridClasses.selectedRow);
        if(currentRow) {
            if(cellName) {
                let cellElem = currentRow.querySelector('td[data-col="' + cellName + '"');
                if(cellElem)
                    data = cellValue(cellElem);
            } else {
                data = {};
                for(let i = 0, j = currentRow.cells.length; i < j; i++) {
                    let cellElem = currentRow.cells[i];
                    cellName = cellElem.getAttribute('data-col');
                    data[cellName] = cellValue(cellElem);
                }
            }
        } 
    }
    return data;
}

const cellValue = cellElem => {
    let cellvalue;
    let editElem = cellElem.querySelector('input,select,textara');
    if(editElem)
        cellvalue = editElem.value;
    else 
        cellvalue = cellElem.innerText;
    return cellvalue
}