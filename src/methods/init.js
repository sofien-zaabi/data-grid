import {ajaxRequest} from '../utils/ajaxRequest';
import {renderGrid} from '../utils/dom/renderGrid';

export function init() {
  if (this.options.ajax) {
    ajaxRequest(this.options, renderGrid.bind(this));
  } else if (this.option.data) {
    var renderedGrid = renderGrid.bind(this);
    renderedGrid(this.options, this.options.data);
  } else {

  }
}
