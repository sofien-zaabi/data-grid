import {resetCellEdit} from '../utils/dom/resetCellEdit';
import * as dom from '../utils/dom/domUtils';
import { gridClasses } from '../utils/gridClasses';

export const resetSelection = function(selectedRow) {
		selectedRow = selectedRow ? selectedRow : document.querySelector('#' + this.options.id + ' tbody tr.' + gridClasses.selectedRow);
		//console.log("resetSelection ", selectedRow.innerHTML);
		if(selectedRow) {
			if(this.options.editable && selectedRow.cells) {
				for(let i = 0, j = selectedRow.cells.length; i < j; i++) {
					let cellElem = selectedRow.cells[i];
					let cellName = cellElem.getAttribute('data-col');
					let column = this.options.columns.filter(column => column.data == cellName)[0];
					//console.log("resetSelection edit ", column);
					let editElem = cellElem.querySelector('input,select,textara');
					if((column && column.editable) || editElem)
						cellElem = resetCellEdit.call(this,cellElem, column, selectedRow.rowIndex - 1) 
				}
				selectedRow.removeAttribute('editable');
				selectedRow.setAttribute('tabindex', -1);
			}
			dom.removeClass(selectedRow, gridClasses.selectedRow);
			this.selectedRow = null;
		}
}