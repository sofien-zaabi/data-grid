import {cellEdit} from '../utils/dom/cellEdit';
import CustomEvent from '../utils/polyfills/customEvent';
import {resetSelection} from './resetSelection';
import * as dom from '../utils/dom/domUtils';
import {gridClasses} from '../utils/gridClasses';

export const setSelection = function(rowID) {
	//console.log("setRowSelection ", this.dataSet);
	rowID = rowID || 0;
	console.log("rowID ==> ", rowID);
	if (this.options.selectRow && this.dataSet && this.dataSet.length > 0) {
			let currentRowElem;
			if (this.selectedRow) {    
				resetSelection.call(this);
			}
			let tbody = dom.getGridBody(this.options.id);
			if(tbody) {
				currentRowElem = [].filter.call(tbody.rows, row => row.id == rowID)[0];
				if(currentRowElem) {
					if(this.options.fixedColumns) {
						let fixedTbody = dom.getGridBody(this.options.id + 'FixedBody');
						if(fixedTbody) {
							fixedSelectRow = fixedTbody.rows[rowID];
							fixedSelectRow.classList.add(gridClasses.currentRowElem);
						}
					}
					if(this.options.editable && this.options.editRow) {
						/* currentRowElem.setAttribute('editable', true);
						currentRowElem.setAttribute('tabindex',0); */
						dom.setAttrs(currentRowElem, {'editable': true, 'tabindex': 0});
						let cells = currentRowElem.cells;
						if(cells) {
							for(let i = 0, j = cells.length; i < j; i++) {
								let cellElem = cells[i];
								let cellName = cellElem.getAttribute('data-col');
								//console.log("setRowSelection edit ", cellName);
								let column = this.options.columns.filter(column => column.data == cellName)[0];
								//console.log("setRowSelection edit ", column);
								if(column && column.editable)
									cellElem = cellEdit.call(this,cellElem,column,currentRowElem.rowIndex - 1, this.dataSet[currentRowElem.rowIndex - 1][cellName]);
							}
						}
					}
					dom.addClass(currentRowElem, gridClasses.selectedRow);
					this.selectedRow = this.dataSet[currentRowElem.rowIndex - 1];
					let event = new CustomEvent(this.options.id + '_RowSelected', {
							detail : this.selectedRow
					});
					window.dispatchEvent(event);
				}
			}
					// console.log(event);
			//}
	}
}