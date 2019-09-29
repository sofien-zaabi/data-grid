import "./scss/DataGrid.scss";
import "./utils/polyfills";
import { error } from "./utils/utils.js";
import { showWarningsForParams, defaultOptions } from "./utils/options";
//import * as staticMethods from "./methods/staticMethods";
import * as instanceMethods from "./methods/instanceMethods";
import {gridClasses} from './utils/gridClasses'
//import gridPrivateProps from "./gridPrivateProps";

//let currentInstance;

// DataGrid constructor
function DataGrid(params) {
  // Prevent run in Node env
  if (typeof window === "undefined") {
    return;
  }


  if (params.length === 0) {
    error("At least 1 argument is expected!");
    return false;
  }
  
  showWarningsForParams(params);
  const innerOptions = Object.assign({}, defaultOptions, params);
  Object.freeze(innerOptions);
  //privateProps.innerOptions.set(this, innerOptions);
  //currentInstance = this;
  //const outerOptions = Object.freeze(this.constructor.argsToOptions(innerOptions));
  Object.defineProperties(this, {
    options: {
      value: innerOptions,
      writable: false,
      configurable: true,
      enumerable: true
    },
    dataSet : {
      value: [],
      writable: true,
      configurable: true,
      enumerable: true
    },
    selectedRow: {
      value: null,
      writable: true,
      configurable: true,
      enumerable: true
    }
  });

  this.init(this.options);
  
  DataGrid.grids[this.options.id] = this;
  return null;
}

// Assign instance methods from src/instanceMethods/*.js to prototype
Object.assign(DataGrid.prototype, instanceMethods);

// Assign static methods from src/staticMethods/*.js to constructor
//Object.assign(DataGrid, staticMethods);
Object.defineProperties(DataGrid, {
  grids: {
    value : {},
    writable: false,
    enumerable: true
  },
  classes : {
    value: gridClasses,
    writable: true,
    enumerable: true
  }
})


export default DataGrid;
