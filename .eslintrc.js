// ! be advise, all config should be either change to warning or extend only rather than remove in case of obstacle
const path = require('path');
const paths = require('./config/paths');

module.exports = {
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:redux-saga/recommended',
    'react-app',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      allowImportExportEverywhere: true,
    },
  },
  plugins: [
    'babel',
    'no-inferred-method-name',
    'promise',
    'compat',
    'redux-saga',
  ],
  rules: {
    'camelcase': 0,
    'babel/no-invalid-this': 1,
    'babel/no-unused-expressions': 1,
    'babel/object-curly-spacing': 1,
    'babel/semi': 1,
    'class-methods-use-this': 1,
    'compat/compat': 1,
    'consistent-return': 0,
    'import/no-dynamic-require': 0,
    'import/namespace': [2, {allowComputed: true}],
    'import/no-extraneous-dependencies': [
      2,
      {devDependencies: ['scripts/*.js', '**/*.config.js']},
    ],
    'import/prefer-default-export': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/anchor-is-valid': [
      1,
      {
        components: [],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref'],
      },
    ],
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/label-has-for': [2, {allowChildren: true}],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'linebreak-style': 0,
    'no-bitwise': 0,
    'no-plusplus': [1, {allowForLoopAfterthoughts: true}],
    'no-underscore-dangle': 0,
    'no-use-before-define': [2, {functions: false}],
    'one-var': [1, {initialized: 'never', uninitialized: 'always'}],
    'prefer-promise-reject-errors': 1,
    'promise/avoid-new': 0,
    'react/display-name': 0,
    'react/no-array-index-key': 1,
    'react/no-unused-state': 1,
    "react/prefer-stateless-function" : 1,
    'react/prop-types': [1, {skipUndeclared: true}],
    'react/require-default-props': 1,
    'react/sort-comp': 1,
    "react/jsx-filename-extension": 0,
    "arrow-body-style": 1,
    "no-lonely-if": 1,
    radix: [1, 'as-needed'],
  },
  settings: {
    ecmascript: 6,
    'import/resolver': {
      alias: {
        map: [
          ['src', paths.appSrc],
          ['assets', paths.assets],
          ['components', paths.components],
          ['containers', paths.containers],
          ['layout', paths.layout],
          ['models', paths.models],
          ['utils', paths.utils],
          ['services', paths.services],
        ],
        extensions: ['.js', '.jsx', '.json', '.less'],
      },
    },
  },
};
