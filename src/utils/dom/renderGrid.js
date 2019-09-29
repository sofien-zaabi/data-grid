import * as dom from './';
import {setSelection} from '../../methods/setSelection';
import {selectRowEvent} from '../events/selectRowEvent';
import CustomEvent from '../polyfills/customEvent';
import {cellDblclickEvent} from '../events/cellDblclickEvent';
import {error} from '../utils'

export const renderGrid = function(options, ajaxResponse) {
    let t = performance.now();
    console.log('render table start' + t);
    if (options.ajax && options.ajax.dataObject) {
        this.dataSet = ajaxResponse[options.ajax.dataObject];
    } else {
        this.dataSet = ajaxResponse;
    }
    let tableElement = document.getElementById(options.id);
    let tableHeaderElem;
    if (tableElement && tableElement.tHead != null) {
        tableHeaderElem = tableElement.tHead;
    }
    if ((options.columns && options.columns.length > 0) || (tableHeaderElem && tableHeaderElem.firstElementChild.children.length > 0)) {
        if ((tableHeaderElem != undefined && options.columns.length != tableHeaderElem.firstElementChild.children.length)) {
            error("mismatch culumns number error.");
        }
        if (options.order && options.order.targetColumn) {
            let sortColObj = this.options.columns[options.order.targetColumn];
            if(sortColObj) {
                if(sortColObj.sortFunction && typeof sortColObj.sortFunction === "function") {
                    this.dataSet.sort(sortColObj.sortFunction(sortColObj.data, this.options.order.orderType));
                }else {
                    this.dataSet.sort(compareValues(sortColObj.data, this.options.order.orderType));
                }
                //this.dataSrcSet.sort(compareValues(this.options.columns[keyIndex].data, this.options.order.orderType));
            }
        }
        if(options.fixedColumns) {
            cellHeight(this.options);
        }
        let tableRows = dom.buildRows(this.dataSet, options);
        //console.log("tableRows ", tableRows);
        let bindedTableHeader = dom.buildHeader.bind(this);
        let tableHeader = bindedTableHeader(tableHeaderElem, options);
        //console.log("tableHeader " ,tableHeader);
        dom.buildGrid(tableElement, tableHeaderElem, options, tableRows, tableHeader);
        let event = new CustomEvent(options.id + '_Ready', {
            detail : ajaxResponse
        });
        window.dispatchEvent(event);

        setSelection.call(this);
        //let bindCellClickEvent = selectRowEvent.bind(this);
        let mainBodyElem = dom.getGridBody(this.options.id);
        if(mainBodyElem) {
            if(options.fixedColumns) {
                //cellHeight(this.options);
                let fixedBodyElem = dom.getGridBody(this.options.id + 'FixedBody');
                selectRowEvent.call(this,mainBodyElem,fixedBodyElem);
                selectRowEvent.call(this,fixedBodyElem,mainBodyElem);
            }else {
                selectRowEvent.call(this,mainBodyElem);
                if(this.options.editable && !this.options.editRow)
                    cellDblclickEvent.call(this, mainBodyElem)
            }
        }
    } else {
        throw new Error('you must specify a culumns options inside ehematos table function or header table element with th child inside html table declaration.');
    }
    console.log('render table end ' + (performance.now() - t));
}