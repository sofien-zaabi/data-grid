import {resetSelection} from '../../methods/resetSelection';
import {setSelection} from '../../methods/setSelection';
import { gridClasses } from '../gridClasses';

export const selectRowEvent = function (eventElem, targetElem) {
	if (eventElem) {
		eventElem.addEventListener("click", function (event) {
			/*let prevSelectedRow = eventElem.querySelector('tr.selected-row');
			if (prevSelectedRow) {
					prevSelectedRow.classList.remove('selected-row');
			}*/
			let selectedRow = document.querySelector('#' + this.options.id + ' tbody tr.' + gridClasses.selectedRow);
			let currentRow = event.target.closest('tr');
			if(currentRow !== selectedRow) {
				resetSelection.call(this, selectedRow);
				if (currentRow) {
					//currentRow.classList.add('selected-row');
					console.log("*****",currentRow,selectedRow,currentRow.rowIndex)
					setSelection.call(this, (currentRow.rowIndex - 1));
				}
			}
		}.bind(this));
	}
}