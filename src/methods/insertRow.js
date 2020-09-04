import * as dom from '../utils/dom/domUtils';
import {cellEdit} from '../utils/dom/cellEdit';
import {error} from '../utils/utils';
import { resetSelection } from './resetSelection';
import { gridClasses } from '../utils/gridClasses';
import CustomEvent from '../utils/polyfills/customEvent';

export const insertRow = function(rowData, rowIndex) {
    let row;
    if(typeof rowData === 'object') {
        let docFrag  = document.createDocumentFragment();
        let propIndex = 0;
        if(Object.keys(rowData).length === this.options.columns.length) {
            for(let prop in rowData) {
                let column = this.options.columns[propIndex];
                if(column && column.data == prop) {
                    let cellElem = dom.createElement('td', {'data-col': prop,'class': gridClasses.editable}, rowData[prop]);
                    if(column.editable)
                        cellElem = cellEdit.call(this, cellElem, column, rowIndex, rowData[prop]);
                    docFrag.appendChild(cellElem);
                }else {
                    error(`the object you provide : ${rowData} is not valid(the object must contain the same properties provided in columns data and with the same order)`)
                    return;
                }
                propIndex++;
            }
            let tbody = dom.getGridBody(this.options.id);
            if(tbody) {
                row = tbody.insertRow(rowIndex);
                let event = new CustomEvent(this.options.id + '_RowInserted', {
                    detail : row
                });
                window.dispatchEvent(event);
                resetSelection.call(this);
                dom.setAttrs(row, {'id': this.dataSet.length, 'editable': true, 'tabindex': 0, 'class': gridClasses.selectedRow});
                row.appendChild(docFrag);
                if(rowIndex) {
                    this.dataSet.splice(rowIndex , 0, rowData);
                }else {
                    this.dataSet.push(rowData)
                }
                this.selectedRow = rowData;
            }
        }else {
            error(`the object you provide : ${rowData} is not valid(the object must contain the same properties provided in columns data and with the same order)`)
            return;
        }
    }

    return row;
}