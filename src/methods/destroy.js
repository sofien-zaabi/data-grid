import { gridClasses } from "../utils/gridClasses";
import DataGrid from "../DataGrid";
import CustomEvent from '../utils/polyfills/customEvent';

export const destroy = function() {
    let elem = document.getElementById(this.options.id);
    console.log("destroy elem ", elem);
    let elementClasses  = elem.classList;
    elementClasses.remove(gridClasses.bodyTable);
    let wrapper = elem.closest("." + gridClasses.gridWrapper);
    console.log("destroy wrapper ", wrapper);
    let parentNode = wrapper.parentNode;
    parentNode.replaceChild(wrapper.cloneNode(true),wrapper);
    parentNode.innerHTML = '<table id="' + this.options.id + '" class="'+ elementClasses +'"></table>';
    let gridId = this.options.id;
     for(let key in this) {
        delete this[key];
    } 
    delete DataGrid.grids[gridId];
    let event = new CustomEvent(gridId + '_GridDestroyed', {
        detail : gridId
    });
    window.dispatchEvent(event);
}