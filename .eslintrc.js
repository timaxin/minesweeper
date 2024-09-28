let WARN = 1;

module.exports = exports = {
  'extends': [
    'react-app',
    'react-app/jest'
  ],
  'rules': {
    'jsx-quotes': [ WARN, 'prefer-double' ],
    'quotes': [ WARN, 'single' ],
  }
}
