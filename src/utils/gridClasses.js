export const gridPrefix = ''

export const prefix = (items) => {
  const result = {}
  for (const i in items) {
    result[toCamelCase(items[i])] = gridPrefix + items[i]
  }
  return result
}

const toCamelCase =  (str) => {
	str = str.toLowerCase().split('-');
	for (var i = 1; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join('');
};

export const gridClasses = prefix([
  'grid-container',
  'grid-wrapper',
  'scroll-header-wrapper',
  'scroll-body-wrapper',
  'scroll-inner-header',
  'table',
  'fixed',
  'fixed-wrapper',
  'fixed-table-header',
  'fixed-table-body',
  'fixed-inner-body',
  'selected-row',
  'body-table',
  'header-table',
  'paging-wrapper',
  'scroll-wrapper',
  'heading-wrapper',
  'sorting',
  'sorting-asc',
  'sorting-desc',
  'search-area',
  'search-input',
  'title-area',
  'search-label',
  'paging-container',
  'paging-item',
  'paging-link',
  'editable',
  'title',
  'multiselect-column',
  'checkbox-wrapper',
  'checkbox',
  'checkbox-label',
  'radio-wrapper',
  'radio',
  'nowrap'
])
