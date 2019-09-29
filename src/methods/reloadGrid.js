import {drawRows} from '../utils/dom/drawRows';

export const reloadGrid = function(data, numero) {
    this.dataSet = data;
    if (this.options.order && this.options.order.targetColumn) {
        var column = this.options.columns.filter(col => col == this.options.order.targetColumn)[0];
        if(column) {
            if(typeof column.sortFunction === "function") {
                this.dataSet.sort(column.sortFunction(column.data, this.options.order.orderType));
            }else {
                this.dataSet.sort(compareValues(column.data, this.options.order.orderType));
            }
            //this.dataSet.sort(compareValues(this.option.columns[keyIndex].data, this.option.order.orderType));
        }
    }
    drawRows.call(this,numero);
}