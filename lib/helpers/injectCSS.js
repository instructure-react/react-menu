var jss = require('js-stylesheet');

module.exports = function() {
  jss({
    '.Menu': {
        'background-color': 'rgba(255, 255, 255, 0.75);'
    },
    '.Menu__MenuOption': {
      padding: '5px',
      'border-radius': '3px'
    },
    '.Menu__MenuOption': {
      padding: '5px'
    },
    '.Menu__MenuOption--active': {
      'background-color': '#0aafff',
    },
    '.Menu__MenuOption:hover': {
      'background-color': '#0aafff',
    },
    '.Menu__MenuTrigger': {
      border: '1px solid #ccc',
      background: '#fff',
      'border-radius': '3px',
      padding: '5px',
    }
  });
};
