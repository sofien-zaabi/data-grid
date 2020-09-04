import * as dom from './';
import { sanitizeHTML } from "../sanitizeHTML";
import { selectRowEvent } from '../events/selectRowEvent';

export const updateRows = function() {
  let t = performance.now();
  console.log('update rows start' + t);
  const tableElem = document.getElementById(this.options.id);
  if(tableElem instanceof HTMLTableElement) {
    let docFrag = document.createDocumentFragment();
    const rows = this.dataSet;
    const columns = this.options.columns;
    let bodyElem = tableElem.tBodies[0];
    if(bodyElem instanceof HTMLTableSectionElement) {
      let bodyFrag = docFrag.appendChild(document.createElement('tbody'));
      let bodyClone = bodyElem.cloneNode(true);
      for (let i = 0, j = rows.length; i < j; i++) {
        let row = rows[i];
        let rowClone = bodyClone.rows[i];
        if(rowClone) {
          if(rowClone.getAttribute('id') !== i) {
            rowClone.setAttribute('id', i);
          }
          for (let k = 0, l = columns.length; k < l; k++) {
            let column = columns[k];
            let cellClone = rowClone.cells[k];
            const cellValue = getCellContent(row, column);
            if(cellClone) {
              if(cellValue && cellValue.content !== cellClone.innerHTML) {
                if (typeof cellValue.content === 'string' || typeof cellValue.content === 'number' || typeof cellValue.content === 'boolean') {
                  cellClone.innerHTML = cellValue.content;
                } else if (cellValue.content instanceof Node) {
                  cellClone.innerHTML = '';
                  cellClone.appendChild(cellValue.content);
                }
                cellClone.setAttribute('title', cellValue.title);
                if(cellClone.getAttribute('data-col') !== column.data) {
                  cellClone.setAttribute('data-col', column.data);
                }
              }
            }else {
              let newCell = rowClone.insertCell(k);
              let cellElem = buildCell(column, cellValue);
				      rowClone.replaceChild(cellElem, newCell);
            }
          }
          bodyFrag.appendChild(rowClone.cloneNode(true));
        } else {
          const newRow = buildRow(row, columns, i);
          bodyFrag.appendChild(newRow);
        }
      }
      if(typeof bodyElem.click === 'function') {
        selectRowEvent.bind(this,bodyFrag);
      }
      tableElem.replaceChild(docFrag, bodyElem);
    }
  }
  console.log('update rows end ' + (performance.now() - t));
}

export const buildRow = function(row, columns, index) {
	let docFrag  = document.createDocumentFragment();
	if(typeof row === 'object') {
		let row = dom.createElement('tr', {'id': index, 'tabindex': -1});
		for(let prop in row) {
			let column = columns.filter(column => column.data == prop)[0];
			if(column) {
				const cellValue = getCellContent(row, column);
				let cellElem = buildCell(column, cellValue);
				row.appendChild(cellElem);
			}
		}
		docFrag.appendChild(row);
	}
	return docFrag;
}

const getCellContent = (row, column) => {
	let colContent, colTitle;
	if(column) {
		if(typeof column.render === "function") {
			colContent = sanitizeHTML(column.render(row[column.data], row, column)) || column.render(row[column.data], row, column);
			colTitle = colContent instanceof Node && colContent.nodeType === 11 ? '' : colContent;
		}else {
			colContent = row[column.data];
			colTitle = colContent;
		}
	}
	return {'title': colTitle, 'content': colContent}	
}

const buildCell = (column, cellValue) =>  dom.createElement('td', {'data-col': column.data, 'title': cellValue.title, 'class': column.classes}, cellValue.content);