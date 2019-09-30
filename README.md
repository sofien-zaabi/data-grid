# Data Grid plugin
VanillaJS data table plugin

`DataGrid` is dynamic table for presenting large and complex data.  It has all the features you would expect from any other table but in a light package with _no external dependencies_. The table was designed to be extremely flexible and light.

It was built for modern browsers and internet explorer >=10 using Javascript, CSS3 and HTML5.


## Features
- Fetch data from server
- Handle large data sets
- Expressive Header and Cell Templates
- Horizontal & Vertical Scrolling
- Column Reordering & Resizing  (in progress)
- Integrated Pager
- Row Selection ( Single, Multi, Checkbox )
- Fixed AND Fluid height
- Left and Right Column Pinning
- Light codebase / No external dependencies
- inline editing
- filter / search data

## Instructions
- `npm install` to install dependencies
- Execute command `npm run dev` for running development server and preview
- Execute command `npm run build` for creating distribution files
- Tweak configuration inside `config` folder if necessary

## Examples 

```html
<table id='testGrid'></table>
```

```Javascript

new DataGrid({
          id : string, // table id
          ajax : { // json type
            url : string, // ajax request url
            dataObject: string, // required only if ajax request return is not the json data array 
            params : Array //array of objects with key value 
          },
          columns : Array, // array of column object for each columns 
          order : boolean, // enable sorting
          editRow : boolean, // to open all editable cell if table is editable when you select a row
          editable : boolean, // enable inline editing
          cacheLimit: number, // expertmental options for performance (keep it default 100)
          selectRow : 'single/multi', // enable row selection
          scrollY : boolean, // enable inline editing
          scrollX : boolean, // enable inline editing
          fixedColumns : boolean, // enable columns pining
          height : string/number,  // table max height
          customClass: string, // table css classes

        });

Column = {
  title : string, // column title
  data : string, // data object property
  width : string/number, // column width
  frozen : boolean, // enable column pining
  sortFunction : function, // column custom sort algo 
  editable: boolean, // enable column inline editing
  events: Array, // column Event object (only if column is editable)
  editAttrs: Object, // html attributes as key value
  editType: string, //  type of column edit object (examples : input, select,radio ...) 
  selectOptions: Array, // array of objects representing the html select options (only if editType = 'select')
  selectKey: string, // 
  selectValue: string, // 
  customElem: HtmlElement, // HTMLElement object
  dataInit: function, // init data or processing of edit object
  classes: string, // columns classe
  colspan: number,  
  render : function //  custom data formatting and processing function
}

Event = {
    type: string, // valid event name with 'on' prefix  (example : onfocus, onchange, oninput ...)
    fn: function // event handler
  }

```


