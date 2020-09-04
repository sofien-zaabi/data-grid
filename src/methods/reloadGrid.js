import {updateRows} from '../utils/dom/updateRows';

export const reloadGrid = function(data, numero) {
    const prevDataArray = Array.from(this.dataSet);
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
    updateRows.call(this,prevDataArray, numero);
}