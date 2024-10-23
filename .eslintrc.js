const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
);

module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    //'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['jsx-a11y'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  rules: {
    'arrow-body-style': ['warn', 'as-needed'],
    'class-methods-use-this': 'off',
    'comma-dangle': ['warn', 'never'],
    'import/imports-first': 'off',
    'import/newline-after-import': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'import/prefer-default-export': 'off',
    indent: 'off',
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/label-has-associated-control': [
      'warn',
      {
        // NOTE: If this warn triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input']
      }
    ],
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'linebreak-style': 'off',
    'lines-between-class-members': [
      'warn',
      'always',
      {
        exceptAfterSingleLine: true
      }
    ],
    'max-len': 'off',
    'newline-per-chained-call': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'warn',
    /*
    'no-param-reassign': [
      'warn',
      {
        ignorePropertyModificationsFor: ['draft'],
        props: true
      }
    ],
    'no-plusplus': [
      'warn',
      {
        allowForLoopAfterthoughts: true
      }
    ],
*/
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        next: 'return',
        prev: '*'
      },
      {
        blankLine: 'always',
        next: '*',
        prev: ['import', 'multiline-block-like']
      },
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'let', 'var']
      },
      {
        blankLine: 'any',
        next: ['import'],
        prev: ['import']
      },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var']
      }
    ],
    'prefer-template': 'warn',
    'prettier/prettier': ['warn', prettierOptions],
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-first-prop-new-line': ['warn', 'multiline'],
    'react/jsx-no-target-blank': 'off',
    // 'react/jsx-props-no-spreading': [
    //   'warn',
    //   {
    //     custom: 'ignore'
    //   }
    // ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-vars': 'warn',
    'react/require-default-props': 'off',
    'react/require-extension': 'off',
    'react/self-closing-comp': 'off',
    'react/sort-comp': 'off',
    'require-yield': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
};
