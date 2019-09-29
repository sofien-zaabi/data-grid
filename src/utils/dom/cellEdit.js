import gridPrivateProps from "../../gridPrivateProps";
import * as dom from './domUtils';
import {warn} from '../utils'
import { gridClasses } from "../gridClasses";

export const cellEdit = function(cellElem, column, rowIndex, cellData) {
	console.log("sellEdit start ", cellData);
	let that = this
	let editElem;
	let cellName = column.data;
	let editing = gridPrivateProps.domCache.get(that) ? gridPrivateProps.domCache.get(that) : {};
	if(editing[cellName + '_' + rowIndex]) {
		console.log("cached elem ", editing);
		editElem = editing[cellName + '_' + rowIndex];
	} else {
		switch(column.editType) {
			case 'text':
				editElem = dom.createElement('input', Object.assign({},column.editAttrs,{type: 'text', id: cellName + '_' + rowIndex, name: column.data}));
				break;
			case 'textarea':
				editElem = dom.createElement('textarea', Object.assign({},column.editAttrs,{id: cellName + '_' + rowIndex, name: column.data}));
			case 'select':
				let selectChildrens = [];
				if(Array.isArray(column.selectOptions) && column.selectOptions.length > 0) { 
					for(let i = 0, j = column.selectOptions.length; i < j; i++) {
						let selectOpt = column.selectOptions[i];
						if(typeof selectOpt === 'object') {
							selectChildrens.push(dom.createElement('option', {value: column.selectValue ? column.selectValue : selectOpt.value}, column.selectKey ? column.selectKey : selectOpt.key))
						}
					}
				}
				//console.log("selectOptions ", selectOptions);
				editElem = dom.createElement('select',Object.assign({},column.editAttrs,{id: cellName + '_' + rowIndex, 'name': column.data}), selectChildrens);
				break;
			case 'radio':
				editElem = dom.createElement('div',{class: gridClasses.radioWrapper}, [dom.createElement('input', {type: 'radio', id: cellName + '_' + rowIndex, name: column.data}),dom.createElement('label', {for: cellName + '_' + rowIndex})]);
				break;
			case 'checkbox':
				editElem = dom.createElement('div',{class: gridClasses.checkboxWrapper}, [dom.createElement('input', {type: 'checkbox',id: cellName + '_' + rowIndex, name: column.data}),dom.createElement('label', {for: cellName + '_' + rowIndex})]);
				break;
			case 'custom':
				editElem = column.customElem;
				let customElement = editElem.querySelector('input,select,textarea');
				if(editElem && editElem instanceof Element && customElement) {
					customElement.setAttribute('id', cellName + '_' + rowIndex);
					break;
				}else 
					warn(`the element you provide in customElem property must contain select or input or textarea`);
			default:
				editElem = dom.createElement('input', Object.assign({},column.editAttrs,{type: 'text', id: cellName + '_' + rowIndex, name: column.data}));
		}
		if(editElem) {
			let controlElem = editElem.querySelector('input,select,textarea') || editElem;
			if(controlElem.type == 'checkbox' || controlElem.type == 'radio') {
				if(cellData == true || cellData == false) {
					controlElem.checked = cellData;
				}
			}else 
				controlElem.value = cellData;
			if(typeof column.dataInit === 'function')
				column.dataInit.call(controlElem,controlElem)
			if(column.events && Array.isArray(column.events)) {
				for(let i = 0, j = column.events.length; i < j; i++) {
					let eventElem = column.events[i];
					if(typeof eventElem === "object") {
						if(eventElem.type in controlElem) {
							if(eventElem.type !== 'onchange' && eventElem.type !== 'onblur' && eventElem.type !== 'onfocus' && typeof eventElem.fn === 'function')
								controlElem[eventElem.type] = function(event) {
									let target = event.target || this;
									if(!eventElem.disable)
										eventElem.fn.call(target, event);
								}
						}else
							warn(`event type ${event.type} not supported, only event with prefix on are supported (exp: onchange, onfocus)`)
					}
				}
			}
			controlElem.onfocus = function(event) {
				let target = event.target || this;
				let onfocusEvt = column.events.filter(eventElem => typeof eventElem === 'object' && eventElem.type == 'onfocus')[0];
				if(onfocusEvt && typeof onfocusEvt.fn === 'function') {
					if(!onfocusEvt.disable)
						onfocusEvt.fn.call(target, event)
				}
			}
			controlElem.onchange = function(event) {
				let target = event.target || this;
				let changeVal;
				if(target.type === 'checkbox' || target.type === 'radio')
					changeVal = target.checked;
				else 
					changeVal = target.value;
				try {
					let convertedVal = JSON.parse(changeVal);
					if(convertedVal !== cellData)
						that.dataSet[rowIndex][cellName] = convertedVal;
				}catch(error) {
					console.log("cell edit change ", cellData)
					if(changeVal !== cellData)    
						that.dataSet[rowIndex][cellName] = changeVal;
				}
				//that.dataSet[rowIndex][cellName] = changeVal;
				let cellContent = target.closest('td').firstElementChild;
				console.log(target.id + " default change ", cellContent);
				if(editing[cellName + '_' + rowIndex]) {
					editing[cellName + '_' + rowIndex] = cellContent;
					gridPrivateProps.domCache.set(that,editing);
				}

				let onchangeEvt = column.events.filter(eventElem => typeof eventElem === 'object' && eventElem.type == 'onchange')[0];
				if(onchangeEvt && typeof onchangeEvt.fn === 'function') {
					if(!onchangeEvt.disable)
						onchangeEvt.fn.call(target, event)
				}
			}
			controlElem.onblur = function(event) {
				let target = event.target || this;
				let onblurEvt = column.events.filter(eventElem => typeof eventElem === 'object' && eventElem.type == 'onblur')[0];
				if(onblurEvt && typeof onblurEvt.fn === 'function') {
					if(!onblurEvt.disable)
						onblurEvt.fn.call(target, event)
				}
			}
		}
	}
	//cellElem.innerHTML = '';
	if(cellElem.firstChild)
		cellElem.replaceChild(editElem, cellElem.firstChild);
	else
		cellElem.appendChild(editElem);
	if(Object.keys(editing).length < this.options.cacheLimit) {
		editing[cellName + '_' + rowIndex] = editElem;
		gridPrivateProps.domCache.set(this, editing);
	}
	console.log("sellEdit end ", editElem);
	return cellElem;  
}