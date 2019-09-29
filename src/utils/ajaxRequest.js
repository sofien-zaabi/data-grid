export const ajaxRequest = (options, callback) => {
    // let responseData = [];
    let xhr = new XMLHttpRequest();
    let requestUrl = '';
    if(options && options.ajax) {
        if (options.ajax.url) {
            requestUrl = options.ajax.url /* + '?_=' + new Date().getTime() */;
            if (options.ajax.params && options.ajax.params.length > 0) {
                requestUrl = requestUrl + paramConcat(options.ajax.params);
            }
        }
        xhr.open('GET', requestUrl);
        if (options.ajax.ajaxLoadStart) {
            xhr.onloadstart = options.ajax.ajaxLoadStart;
        }
        if (options.ajax.ajaxLoadEnd) {
            xhr.onloadend = options.ajax.ajaxLoadEnd;
        }
        xhr.onload = function() {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if(typeof callback === 'function')
                    callback(options, response);
            } else {
                throw new Error('Request failed. Returned status of ' + xhr.status);
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        try {
            xhr.send();
        } catch (error) {
            if (options.ajax.hasOwnProperty('ajaxLoadEnd') && options.ajax.ajaxLoadEnd) {
                options.ajax.ajaxLoadEnd();
            }
            throw error;
        }
    }
    
}

export const paramConcat = params => {
    let encodedString = '';
    params.map(function(param) {
        for ( let prop in param) {
            if (param.hasOwnProperty(prop)) {
                    if (encodedString.length > 0) {
                    encodedString += '&';
                    }
                    if(Array.isArray(param[prop]) && param[prop].length > 0) {
                    for(let i = 0; i < param[prop].length; i++) {
                        if(i > 0) {
                            encodedString += '&';
                        }
                        encodedString += prop + '=' + encodeURIComponent(param[prop][i])
                    }
                }else {
                    encodedString += prop + '=' + encodeURIComponent(param[prop]);
                    }
                }
        }
    });
    return encodedString;
};