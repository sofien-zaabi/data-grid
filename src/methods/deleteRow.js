import * as dom from '../utils/dom/domUtils'
import { gridClasses } from '../utils/gridClasses';
import CustomEvent from '../utils/polyfills/customEvent';

export const deleteRow = function(rowID) {
    let tbody = dom.getGridBody(this.options.id);
    if(tbody) {
        let row;
        if(rowID)
            row = tbody.querySelector('tr[id="'+ rowID +'"]');
        else
            row = tbody.querySelector('tr.' + gridClasses.selectedRow);
        if(row && row.rowIndex) {
            this.dataSet.splice(row.rowIndex -1,1);
            tbody.deleteRow(row.rowIndex - 1);
            let event = new CustomEvent(this.options.id + '_RowDeleted', {
                detail : row
            });
            window.dispatchEvent(event);
        }
    }
}