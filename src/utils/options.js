import { warn } from '../utils/utils'

export const defaultOptions = {
  id : '',
  data : null,
  ajax : null,
  columns : [],
  order : true,
  cacheLimit: 100,
  selectRow : true,
  fixedColumns : false,
  scrollY : false,
  scrollX : false,
  height : null,
  editable: false,
  editRow: false,
  customClass: '',
  //heightAuto: true,
}

export const colOptions = {
  title : '',
  data : null,
  width : null,
  frozen : false,
  sortFunction : null,
  editable: false,
  formatter: null,
  formatType: null,
  formatOptions: null,
  events: null,
  editAttrs: null,
  editType: null,
  selectOptions: null,
  customElem: null,
  selectKey: null,
  selectValue: null,
  dataInit: null,
  classes: '',
  colspan: null,
  render : null
}

export const ajaxOptions = {
  url : '',
  dataObject : '',
  params : []
}


/**
 * Is valid parameter
 * @param {String} optionName
 * @param {Object} optionObj : optional
 */
export const isValidParameter = (optionName, optionObj) => {
  return typeof optionObj === "object" ? optionObj['hasOwnProperty'](optionName) : defaultOptions['hasOwnProperty'](optionName);
}

/**
 * Show relevant warnings for given options
 *
 * @param options
 */
export const showWarningsForParams = (options) => {
  for (const option in options) {
    if (Array.isArray(options[option]) && options[option].length > 0) {
      for (let i = 0, j = options[option].length; i < j; i++) {
        let  column = options[option][i];
        for (const colOpt in column) {
          if (!isValidParameter(colOpt, colOptions)) {
            warn(`Unknown option "${colOpt}"`)
          }
        }
      }
    } else if(typeof options[option] === "object" && option == "ajax") {
      // console.log(option, options[option])
      for (const subOptions in options[option]) {
        if (!isValidParameter(subOptions, ajaxOptions)) {
          warn(`Unknown option "${subOptions}"`)
        }
      }
    }else {
      if (!isValidParameter(option)) {
        warn(`Unknown option "${option}"`)
      }
    }
  }
}

