
/**
 * get data from dataSet
 *
 * @param rowIndex : table row ID
 * @param cellName : table column data
 */
export const getRawData = function(rowID, cellName) {
    let data;
    let gridBody = dom.getGridBody(this.options.id);
    if(gridBody) {
        let currentRow;
        if(rowID)
            currentRow = gridBody.querySelector('tr[id="' + rowID + '"]');
        else 
            currentRow = gridBody.querySelector('tr.' + gridClasses.selectedRow);
        if(currentRow) {
            if(cellName) 
                data = this.dataSet[currentRow.rowIndex - 1][cellName]
            else
                data = this.dataSet[currentRow.rowIndex - 1]
        }
    }
    return data;
}