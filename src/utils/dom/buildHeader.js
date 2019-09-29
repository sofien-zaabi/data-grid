import * as dom from './domUtils';
import {colSortEvent} from '../events/colSortEvent';
import {gridClasses} from '../gridClasses';

export const buildHeader = function(tableHeaderElem, options) {
    var headerElem, fixedHeaderElem, rowElem, fixedRowElem, docFrag, fixedDocFrag;
    var headerWidth = 0;
    var fixedHeaderWidth = 0;
    var tableElemWidth = document.getElementById(options.id).parentNode.offsetWidth;
    if (tableHeaderElem == undefined) {
        headerElem = document.createElement('thead');
        if (options.fixedColumns) {
            fixedHeaderElem = document.createElement('thead');
        }
        rowElem = document.createElement('tr');
        if(options.fixedColumns) fixedRowElem = rowElem.cloneNode();
       // var fixedRow = document.createElement('tr');
        //var tempElem = document.createElement('tr');
        var colSpanCount;
        for (var i = 0, j = options.columns.length; i < j; i++) {
            let column = options.columns[i];
            let colAttrs = {};
            if (!colSpanCount || colSpanCount <= 0) {
                if(column.width)
                    headerWidth += parseInt(column.width);
                //var theadElem = '<th';
                //var fixedtheadElem = '';

                if(column.colspan) {
                    //theadElem += ' colspan="' + column.colspan + '"';
                    colAttrs['colspan'] = column.colspan;
                    colSpanCount = parseInt(column.colspan);
                }
                if (column.title) {
                    if (column.width) {
                        if (options.fixedColumns && i == options.columns.length-1) {
                            //theadElem += ' style="' + (tableElemWidth < headerWidth ? 'width:'+column.width : '')  + '"';
                            colAttrs['style'] = tableElemWidth < headerWidth ? 'width:' + (typeof column.width == Number ? column.width + 'px' : column.width) : '';
                        }else {
                            colAttrs['style'] = 'width:'+ (typeof column.width == Number ? column.width + 'px' : column.width);
                        }
                    }
                    if (options.order) {
                        //theadElem += ' aria-control="' + option.id + '" data-col="' + i + '"';
                        colAttrs['data-col'] = column.data;
                        //if(column.sorted) {
                            if (options.order.targetColumn == i) {
                                //theadElem += ' class="sorting_' + options.order.orderType + '"';
                                colAttrs['class'] = gridClasses.sorting + '-' + options.order.orderType;
                            } else {
                                //theadElem += ' class="sorting"';
                                colAttrs['class'] = gridClasses.sorting;
                            }
                        //}
                    }
                    //theadElem += '>' + column.title;
                } /*else {
                    theadElem += '></th>';
                }*/
                let colElem = dom.createElement('th', colAttrs, column.title);
                //tempElem.innerHTML = (column.hasOwnProperty('frozen') && column.frozen) ? theadElem + fixedtheadElem : theadElem;
                if (options.order) {
                    //if(column.sorted) {
                        colSortEvent.call(this, colElem);
                    //}
                }
                //console.log("colElem ", colElem);
                rowElem.appendChild(colElem);
                if (column.frozen) {
                    let fixedColElem = colElem.cloneNode();
                    if (options.order) {
                        if(column.sorted) {
                            colSortEvent.call(this, fixedColElem);
                        }
                    }
                    fixedRowElem.appendChild(fixedColElem);
                    fixedHeaderWidth += parseInt(column.width);
                }
                //console.log("theadElem " + theadElem + " colSpanCount " + colSpanCount);
            }// );
            colSpanCount--;
        }
        headerElem.appendChild(rowElem);
        if (options.fixedColumns) {
            fixedHeaderElem.appendChild(fixedRowElem);
        }
    } else {
        headerElem = tableHeaderElem;
    }
    return {
        'headerElem' : headerElem,
        'width' : headerWidth,
        'fixedHeaderElem' : fixedHeaderElem,
        'fixedWidth' : fixedHeaderWidth
    };
}