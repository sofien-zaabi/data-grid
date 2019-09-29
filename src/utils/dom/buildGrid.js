import * as dom from './domUtils';
import {scrollEvent} from '../events/scrollEvent';
import {gridClasses} from '../gridClasses';

export const buildGrid = (tableElement, tableHeaderElem, options, tableRows, tableHeader) => {
    // let tableTheadElem;
    if(tableElement) {
			let tableElemClasses = tableElement.className;
			let tableParent = tableElement.parentNode;
			let wrapperFrag = document.createDocumentFragment();
			//let tableBody = document.createElement('tbody');
			//tableBody.appendChild(tableRows.tableDataRow);
			//console.log("tableBody ", tableBody);
			if (options.scrollY) {
				let tableClone = tableElement.cloneNode(true);
				dom.addClass(tableClone, gridClasses.bodyTable);
				tableClone.appendChild(tableHeader.headerElem.cloneNode(true));
				tableClone.setAttribute('style', 'width:100%');
				tableClone.appendChild(tableRows.tableDataRow);
				let widthHeader = (tableElement.parentNode.offsetWidth < tableHeader.width) ?  tableHeader.width +'px;' : '100%;';
				let headScrollTable = dom.createElement('div', {'class': gridClasses.scrollHeaderWrapper},
																								dom.createElement('div',{'class': gridClasses.scrollInnerHeader, 'style': 'box-sizing: border-box;width:'  + widthHeader +  'padding-right: 17px;'},
																																	dom.createElement('table', {'id': options.id + 'Header', 'style': 'width:100%', 'class': tableElemClasses +' ' + gridClasses.headerTable}, tableHeader.headerElem)));
				//console.log("headScrollTable", headScrollTable);
				// console.log(tableParent);
				let wrapper = dom.createElement('div', {'id': options.id + 'Wrapper', 'tabindex': 1, 'style': 'position: relative;', 'class': options.fixedColumns ? gridClasses.gridWrapper + ' ' + gridClasses.fixed : gridClasses.gridWrapper});
				let bodyScrollTable = dom.createElement('div',{'class': gridClasses.scrollBodyWrapper, 'style': 'max-height:' + (typeof options.height == Number ? options.height + 'px' : options.height)}, tableClone)
				
				wrapper.appendChild(headScrollTable);
				wrapper.appendChild(bodyScrollTable);
				//tableParent.appendChild(wrapper);
				//wrapper.insertBefore(headScrollTable, wrapper.firstElementChild);
				//document.getElementById(options.id + 'Header').appendChild(tableHeader.headerElem);
				//console.log("final wrapper", wrapper);
				if (options.scrollX) {
						wrapper.lastElementChild.setAttribute('style', wrapper.lastElementChild.getAttribute('style') ? wrapper.lastElementChild.getAttribute('style') + 'border-bottom: none;overflow-x:scroll'
										: 'border-bottom: none;overflow-x:scroll');
						scrollEvent(wrapper.lastElementChild, wrapper.firstElementChild, 'scrollX');
				}
				if (options.fixedColumns) {
						let fixedBodyHeight =  Number(options.height.replace(/\D/g, '') - 17);
						let fixedTableElem = dom.createElement('table', {'id': options.id +'FixedBody', 'class': tableElemClasses + ' ' + gridClasses.fixed}, [tableHeader.fixedHeaderElem.cloneNode(true), tableRows.fixedDataRow])
						//let fixedElement = '<div class="fixed-table-wrapper" style="position: absolute; top: 0px; left: 0px;width:' + tableHeader.fixedWidth + 'px">'
						//+'<div class="fixed-table-header"><table id="' + options.id + 'FixedHeader" class="' + tableElemClasses +' fixed-header-table" width="100%"> </table></div>'
						//+'<div class="fixed-table-body" style="position: relative; top: 0px; left: 0px;overflow:hidden;max-height:' + fixedBodyHeight + 'px;">'
						//+'<div class="fixed-inner-body" style="position: relative; top: 0px; left: 0px;overflow-y: scroll;max-height:' + fixedBodyHeight + 'px;width:' + Number(tableHeader.fixedWidth + 17) + 'px">'
						//+'<table id="' + options.id +'FixedBody" class="' + tableElemClasses + ' fixed-body-table"><tbody>' + tableRows.fixedDataRow + '</tbody></table></div></div></div>';
						wrapperFrag.appendChild(dom.createElement('div', {'class': gridClasses.fixedWrapper, 'style': 'position: absolute; top: 0px; left: 0px;width:' + tableHeader.fixedWidth + 'px'}, 
																									[dom.createElement('div', {'class': gridClasses.fixedTableHeader},
																																		dom.createElement('table', {'id': options.id + 'FixedHeader', 'class': tableElemClasses +' fixed-header-table'}, tableHeader.fixedHeaderElem)),
																									dom.createElement('div', {'class': gridClasses.fixedTableBody, 'style': 'position: relative; top: 0px; left: 0px;overflow:hidden;max-height:' + fixedBodyHeight + 'px;'},
																																		dom.createElement('div', {'class': gridClasses.fixedInnerBody, 'style': 'position: relative; top: 0px; left: 0px;overflow-y: scroll;max-height:' + fixedBodyHeight + 'px;width:' + Number(tableHeader.fixedWidth + 17) + 'px'}, fixedTableElem))]));
						//document.getElementById(options.id + 'FixedHeader').appendChild(tableHeader.fixedHeaderElem);
						//let fixedBodyTableElem = document.getElementById(options.id + 'FixedBody');
						//fixedBodyTableElem.insertAdjacentElement('afterbegin', tableHeader.fixedHeaderElem.cloneNode(true));
						scrollEvent(fixedTableElem.parentNode, tableElement.parentNode, 'scrollY');
						scrollEvent(tableElement.parentNode, fixedTableElem.parentNode, 'scrollY');
				}
				wrapperFrag.appendChild(wrapper);
				tableParent.replaceChild(wrapperFrag, tableElement);
			} else {
					if (tableHeaderElem == undefined) {
						wrapperFrag.appendChild(tableHeader.headerElem);
						wrapperFrag.appendChild(tableRows.tableDataRow);
						tableElement.appendChild(wrapperFrag);
					}
			}  
    }
    
}