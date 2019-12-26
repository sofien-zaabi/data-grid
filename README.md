# Data Grid plugin
VanillaJS data table plugin

`DataGrid` is dynamic table for presenting large and complex data.  It has all the features you would expect from any other table but in a light package with _no external dependencies_. The table was designed to be extremely flexible and light.

It was built for modern browsers and internet explorer 10+ using Javascript, CSS3 and HTML5.


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

let gridTest2Columns = [
            {
              title: 'ID',
               data: 'id'
            },
            {
              title: 'Post ID', 
              data: 'postId', 
              editable: true, 
              editType: 'text', 
              editAttrs: {class: 'custom-input'}, 
              dataInit: function(elem){
                console.log(elem.id + " init ", elem.value)
              }, 
              events: [
                {
                  type: 'onfocus',
                  fn: function(event) {
                    console.log(this.id + ' onfocus ' , this.value)
                  }
                },
                {
                  type: 'onchange',
                  fn: function(event) {
                    console.log(this.id + ' onchange ' , this.value)
                  }
                },
                {
                  type: 'onblur',
                  fn: function(event) {
                    console.log(this.id + ' onblur ' , this.value)
                  }
                }
              ]
            },
            {
              title: 'Name', 
              data: 'name', 
              editable: true,
              editType: 'select',
              selectOptions: [
                {
                  key: 'Yes',
                  value: true
                },
                {
                  key: 'No',
                  value: false
                }
              ], 
              editAttrs: {class: 'custom-select'}, 
              dataInit: function(elem){
                console.log(elem.id + " init ", elem.value)
              }, 
              events: [
                {
                  type: 'onfocus',
                  fn: function(event) {
                    console.log(this.id + ' onfocus ' , this.value)
                  }
                },
                {
                  type: 'onchange',
                  fn: function(event) {
                    console.log(this.id + ' onchange ' , this.value)
                  }
                },
                {
                  type: 'onblur',
                  fn: function(event) {
                    console.log(this.id + ' onblur ' , this.value)
                  }
                }
              ]
            },
            {
              title: 'Email', 
              data: 'email', 
              editable: true,
              editType: 'checkbox',
              dataInit: function(elem){
                console.log(elem.id + " init ", elem.value)
              }, 
              events: [
                {
                  type: 'onfocus',
                  fn: function(event) {
                    console.log(this.id + ' onfocus ' , this.value)
                  }
                },
                {
                  type: 'onchange',
                  fn: function(event) {
                    console.log(this.id + ' onchange ' , this.value)
                  }
                },
                {
                  type: 'onblur',
                  fn: function(event) {
                    console.log(this.id + ' onblur ' , this.value)
                  }
                }
              ]
            },
            {title: 'Body', data: 'body' ,render: thumbnail}
        ];
        new DataGrid({
          id : 'testGridId',
          ajax : {
            url : 'https://jsonplaceholder.typicode.com/comments'
          },
          columns : gridTest2Columns,
          order : true,
          editRow : false,
          editable : true,
          selectRow : true,
          scrollY : true,
          height : '400px'
        });

```

### Grid options
The following list of options are supported by the library. Configure the options to meet your requirement.

| Setting         |Type    | Description            | Default Value |
|:--- |:--- |:--- |:--- |
| id | String | Id of HTML table. | null |
| ajax | Object | An object contain all ajax (must return JSON) request necessary infos | null |
| data | Array | Array of Javascript Objects | null |
| columns | Array | Array of Column Object for the specified table | null |
| Order | boolean | Enable data sorting on table | true |
| editRow | boolean | Enable all editable column editing on row select | false |
| selectRow | Boolean | Enable filter row selection. | true |
| scrollX | Boolean | Enable horizontal scroll  | false |
| scrollY | boolean | Enable Vertical scroll | false|
| height | String / number | table max height | null |
| fixedColumns | Number | Number of pining comlumn. | 0 |
| cacheLimit | Number | Limit the number of cached cells if the table is editable (experimental feature). | 100 |
| classes | String | Custom classes to the table. To add multiple classes, the value should be space separated class names.| '' |
| editable | boolean | Enable inline editting. | false |

### Column options
The following list of column options are supported by the library. Configure the options to meet your requirement.

| Setting         |Type    | Description            | Default Value |
|:--- |:--- |:--- |:--- |
| title | String | Id of HTML table. | '' |
| data | String | the name of the property that hold the data in the object | null |
| width | String / number | column width | null |
| frozen | boolean | Enable column pining | false |
| sortFunction | Function | function for Array sorting if column is sortable | null |
| editable | Boolean | Enable column inline editting. | false |
| editType | String | column edit type : 'text', 'select', 'textarea', 'radio', 'checkbox', 'custom'  | 'text' |
| editAttrs | Object | Object of key/value pairs , the key must be a valid HTML attribute  | null|
| customElem | HTMLElement | HTMLElement Object if column edit type is 'custom' | none |
| selectOptions | Array | Array of Object for the HTMLSelect object if column edit is select | null |
| selectKey | Number | Limit the number of cached cells if the table is editable (experimental feature). | 100 |
| selectValue | String | Custom classes for the table. To add multiple classes, the value should be space separated class names.| '' |
| dataInit | Function | Init function if the column is editable for data initialisation  | none |
| events | Array | Array of event object if the column is editable | false |
| classes | String | Custom classes for the column. To add multiple classes, the value should be space separated class names. | null |
| render | Function | The property name which should be rendered as label in the dropdown| null |
| colspan | number | the value of colspan Attribute for the columne.| null |

### Events
- table id +`_Draw` - fire when you reload the table oany time you change all the table data.
- table id + `_Ready` - fire when the table is fully completed.
- table id + `_RowSelected` - fire each time you select row if selectRow option is enabled.
- table id + `_RowAdded` - fire each time a row is added to the table.
- table id + `_RowDeleted` - fire each time a row is deleted to the table
- table id + `_GridDestroyed` - fire when the table is destroyed.

