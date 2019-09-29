export const consolePrefix = "DataGrid:";

/**
 * Convert NodeList to Array
 * @param nodeList
 */
export const toArray = nodeList => Array.prototype.slice.call(nodeList);

/**
 * Standardise console warnings
 * @param message
 */
export const warn = message => {
  console.warn(`${consolePrefix} ${message}`);
};

/**
 * Standardise console errors
 * @param message
 */
export const error = message => {
  console.error(`${consolePrefix} ${message}`);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
const previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */
export const warnOnce = message => {
  if (!previousWarnOnceMessages.includes(message)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
export const callIfFunction = arg => (typeof arg === "function" ? arg() : arg);
