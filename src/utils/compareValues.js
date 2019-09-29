export const compareValues = (key, order) => {
    return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        var varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        var varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        var comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return ((order == 'desc') ? (comparison * -1) : comparison);
    };
}