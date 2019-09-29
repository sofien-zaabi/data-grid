import * as dom from './';
import {gridClasses} from '../gridClasses';
import { sanitizeHTML } from '../sanitizeHTML';

export const buildRows = (dataSet, options) => {
  let rowElem, fixedRowElem, tbody, fixedTbody, docFrag, fixedDocFrag, fixedColCount;
	if(options) {
		docFrag = document.createDocumentFragment();
		if (options.fixedColumns) {
			fixedDocFrag = document.createDocumentFragment();
		}
		if(dataSet && dataSet.length > 0) {
			tbody = document.createElement('tbody');
			if(options.fixedColumns)
				fixedTbody = tbody.cloneNode(true);
			for (let i = 0, j = dataSet.length; i < j; i++) {
				let row = dataSet[i];
				let rowAttrs = {'id': i, 'tabindex': -1};
				rowElem = dom.createElement('tr', rowAttrs);
				if (options.fixedColumns) {
					fixedRowElem = dom.createElement('tr', rowAttrs);
				}
				for (let k = 0, l = options.columns.length; k < l; k++) {
					 let column = options.columns[k];
					let colContent, colTitle;
					if(typeof column.render === "function") {
						colContent = sanitizeHTML(column.render(row[column.data], row, column)) || column.render(row[column.data], row, column);
						colTitle = colContent instanceof Node && colContent.nodeType === 11 ? '' : colContent;
					}else {
						colContent = row[column.data];
						colTitle = colContent;
					} 
					let colAttrs = {'title': colTitle, 'data-col': column.data, ...(column.editable && {'class': gridClasses.editable})}
					let colElem = dom.createElement('td', colAttrs, colContent);
					//console.log("colElem body ", colElem);
					rowElem.appendChild(colElem);
					if (column.frozen) {
						fixedColCount = fixedColCount ? fixedColCount : 1;
						fixedRowElem.appendChild(colElem.cloneNode());
						fixedColCount++;
					}
				}
				tbody.appendChild(rowElem);
				if (options.fixedColumns) {
					fixedTbody.appendChild(fixedRowElem);
				}
			}
			docFrag.appendChild(tbody);
			if (options.fixedColumns) {
				fixedDocFrag.appendChild(fixedTbody);
			}
		}else {
			tbody = dom.createElement('tbody',null,dom.createElement('tr', null, dom.createElement('td',{'colspan': options.columns.length})));
			docFrag.appendChild(tbody);
			if (options.fixedColumns) {
				fixedTbody = dom.createElement('tbody',null,dom.createElement('tr', null, dom.createElement('td',{'colspan': fixedColCount})));
				fixedDocFrag.appendChild(fixedTbody)
			}
		}
	}
	return {'tableDataRow' : docFrag, 'fixedDataRow' : fixedDocFrag}
}