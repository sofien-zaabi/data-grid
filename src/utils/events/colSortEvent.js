

import { drawRows } from '../dom/drawRows';
import { compareValues } from '../compareValues';
import * as dom from '../dom/domUtils';
import { gridClasses } from '../gridClasses';
import {resetSelection} from '../../methods/resetSelection';

export const colSortEvent = function (element) {
	//console.log('sortAttachListener ' + element + ' ' + thisObject.options.id);
	let that = this;
	if (element) {
		element.addEventListener("click", function (event) {
			let target = event.target || this;
			let column = that.options.columns.filter(col => col.data == target.getAttribute('data-col') )[0];
			if(column) {
				if(that.options.editable)
					resetSelection.call(that);
				that.selectedRow = null;
				if (dom.hasClass(target, gridClasses.sortingAsc)) {
					dom.removeClass(target, gridClasses.sortingAsc);
					dom.addClass(target, gridClasses.sortingDesc);
					if (column && typeof column.sortFunction === "function") {
						that.dataSet.sort(column.sortFunction(column.data, 'desc'));
					} else {
						that.dataSet.sort(compareValues(column.data, 'desc'));
					}
				} else if (dom.hasClass(target, gridClasses.sortingDesc)) {
					dom.removeClass(target, gridClasses.sortingDesc);
					dom.addClass(target, gridClasses.sortingAsc);
					if (column && typeof column.sortFunction === "function") {
						that.dataSet.sort(column.sortFunction(column.data, 'asc'));
					} else {
						that.dataSet.sort(compareValues(column.data, 'asc'));
					}
				} else {
					let elemList = target.closest('tr').querySelector('th[class*="' + gridClasses.sorting + '"]');
					if (elemList) {
						// for (let k = 0, l = elemList.length; k < l ; k++){
						if (elemList.classList.contains(gridClasses.sortingAsc)) {
							elemList.classList.remove(gridClasses.sortingAsc);
							elemList.classList.add(gridClasses.sorting);
						}
						if (elemList.classList.contains(gridClasses.sortingDesc)) {
							elemList.classList.remove(gridClasses.sortingDesc);
							elemList.classList.add(gridClasses.sorting);
						}
					}
					dom.addClass(target, gridClasses.sortingAsc);
					if (column &&  typeof column.sortFunction === "function") {
						that.dataSet.sort(column.sortFunction(column.data, 'asc'));
					} else {
						that.dataSet.sort(compareValues(column.data, 'asc'));
					}
					// sortedColumn();
				}
				drawRows.call(that);
			}
			

		});
	}
}