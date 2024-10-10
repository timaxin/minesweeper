let WARN = 1;

module.exports = exports = {
  'extends': [
    'react-app',
    'react-app/jest',
    'eslint:recommended'
  ],
  'rules': {
    'jsx-quotes': [ WARN, 'prefer-double' ],
    'quotes': [ WARN, 'single' ],
    'object-curly-spacing': [WARN, 'always'],
    'semi': [WARN, 'always']
  }
};
