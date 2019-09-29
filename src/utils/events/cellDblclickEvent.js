import { cellEdit } from "../dom/cellEdit";
import { resetCellEdit } from "../dom/resetCellEdit";

export const cellDblclickEvent = function(gridBody) {
	if(gridBody) {
		let that = this;
		gridBody.addEventListener('dblclick', function(event) {
			let editedElem = gridBody.querySelector('input,select,textarea');
			if(editedElem) {
				let editedCell = editedElem.closest('td');
				if(editedCell) {
					let editCellName = editedCell.getAttribute('data-col');
					let row = editedCell.closest('tr');
					let column = that.options.columns.filter(column => column.data == editCellName)[0];
					if(column && column.editable)
						editedCell = resetCellEdit.call(that,editedCell, column, row.rowIndex - 1) 
				}
			}
			let cellElem = event.target.closest('td');
			let rowElem = event.target.closest('tr');
			let numero = rowElem ? rowElem.rowIndex -1 : 0;
			if(cellElem) {
				let cellName = cellElem.getAttribute('data-col');
				//console.log("setRowSelection edit ", cellName);
				let column = that.options.columns.filter(column => column.data == cellName)[0];
				//console.log("setRowSelection edit ", column);
				if(column && column.editable)
					cellElem = cellEdit.call(that,cellElem,column, numero, that.dataSet[numero][cellName]);
			}
		})
	}
}