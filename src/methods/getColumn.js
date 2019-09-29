

export const getColumn = function(name) {
    return this.options.columns.filter(column => column.data == name)[0];
}