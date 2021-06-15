module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['compat', 'lodash'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      defaultParams: true,
      jsx: true,
      spread: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
  },
  settings: {
    'import/extensions': ['.mjs', '.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.json'],
      },
      webpack: {
        config: 'tools/webpack/webpack.config.base.js',
      },
    },
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
    polyfills: [
      'Array.from',
      'Number.isInteger',
      'Number.isNaN',
      'Number.parseInt',
      'Object.assign',
      'Object.entries',
      'Promise',
      // Can remove Promise methods after compat fix published
      // https://github.com/amilajack/eslint-plugin-compat/issues/197
      'Promise.reject',
      'Promise.resolve',
      'Promise.all',
      // URL polyfill as needed from url-parse
      // src/client/utilities/utilities-url.js
      'URL',
      'Set',
    ],
  },
  rules: {
    // --------------------------------------------------
    // Best Practices
    // --------------------------------------------------

    // enforce that class methods use "this"
    // https://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': ['off'],

    // encourages use of dot notation whenever possible
    // https://eslint.org/docs/rules/dot-notation
    'dot-notation': ['error'],

    // disallow else after a return in an if
    // https://eslint.org/docs/rules/no-else-return
    'no-else-return': ['error'],

    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    // https://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],

    // disallow use of assignment in return statement
    // https://eslint.org/docs/rules/no-return-assign
    // ESLint upgrade
    'no-return-assign': ['error', 'except-parens'],

    // disallow usage of expressions in statement position
    // https://eslint.org/docs/rules/no-unused-expressions
    'no-unused-expressions': ['off'],

    // require using Error objects as Promise rejection reasons
    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    // ESLint upgrade
    'prefer-promise-reject-errors': ['off'],

    // --------------------------------------------------
    // ES6
    // --------------------------------------------------

    // enforces no braces where they can be omitted
    // https://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': ['off'],

    // require parens in arrow function arguments
    // https://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['error', 'always'],

    // Prefer destructuring from arrays and objects
    // https://eslint.org/docs/rules/prefer-destructuring
    // ESLint upgrade
    'prefer-destructuring': ['off'],

    // --------------------------------------------------
    // Errors
    // --------------------------------------------------

    // Disallow characters which are made with multiple code points in character class syntax
    // https://eslint.org/docs/rules/no-misleading-character-class
    'no-misleading-character-class': ['error'],

    // Disallow assignments that can lead to race conditions due to usage of await or yield
    // https://eslint.org/docs/rules/require-atomic-updates
    'require-atomic-updates': ['error'],

    // --------------------------------------------------
    // Imports
    // --------------------------------------------------

    // Disallow specific imports
    // https://eslint.org/docs/rules/no-restricted-imports
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'qs',
            message: 'Please use query-string instead.',
          },
        ],
      },
    ],

    // Forbid cyclical dependencies between modules
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md
    // ESLint upgrade
    'import/no-cycle': ['error', { maxDepth: Infinity }],

    // Forbid require() calls with expressions
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
    'import/no-dynamic-require': ['off'],

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/*.spec.data.js',
          '**/*.contract.js',
          '**/*.stories.js',
          '**/test/**',
          '**/tests/**',
          'buildSrc/**',
          'consumerContract/**',
          'gradle/**',
          'infra/**',
          'scripts/**',
          'src/contractTest/**',
          'src/server/test/**',
          'src/stories/**',
          'src/test/**',
          'tools/**',
          'nyc.config.js',
          'scan_with_sonar.js',
        ],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    // Ensures an imported module can be resolved to a module on the local filesystem
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        caseSensitive: true,
      },
    ],

    // Ensures that there are no useless path segments
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-useless-path-segments.md
    // ESLint upgrade
    'import/no-useless-path-segments': ['error'],

    // Require modules with a single export to use a default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': ['off'],

    // Import lodash methods from single method files
    // https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/import-scope.md
    'lodash/import-scope': ['error', 'method'],

    // Enforce a convention in module import order
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'never',
      },
    ],

    // --------------------------------------------------
    // Node
    // --------------------------------------------------

    // require all requires be top-level
    // https://eslint.org/docs/rules/global-require
    'global-require': ['error'],

    // --------------------------------------------------
    // Style
    // --------------------------------------------------

    // one true brace style
    // https://eslint.org/docs/rules/brace-style
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // require camel case names
    // https://eslint.org/docs/rules/camelcase
    // ESLint upgrade
    camelcase: [
      'error',
      {
        properties: 'never',
        allow: [
          'wky_id',
          'wky_campaignID',
          'event_name',
          'ajax_response_id',
          'leftnav_content',
          'breadcrumb_content',
          'user_agent',
          'utag_data_dt',
          'product_analytics',
          'profile_data',
          '^UNSAFE_',
        ],
      },
    ],

    // require trailing commas in multiline object literals
    // https://eslint.org/docs/rules/comma-dangle
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],

    // enforce consistent line breaks inside function parentheses
    // https://eslint.org/docs/rules/function-paren-newline
    'function-paren-newline': ['error', 'consistent'],

    // Enforce the location of arrow function bodies with implicit returns
    // https://eslint.org/docs/rules/implicit-arrow-linebreak
    // ESLint upgrade
    'implicit-arrow-linebreak': ['error', 'beside'],

    // enforce consistent indentation
    // https://eslint.org/docs/rules/indent
    indent: ['error'],

    // require or disallow an empty line between class members
    // https://eslint.org/docs/rules/lines-between-class-members
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: false },
    ],

    // disallow use of chained assignment expressions
    // https://eslint.org/docs/rules/no-multi-assign
    // ESLint upgrade
    'no-multi-assign': ['error'],

    // Disallow multiple spaces
    // https://eslint.org/docs/rules/no-multi-spaces
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],

    // disallow multiple empty lines and only one newline at the end
    // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxBOF: 1,
        maxEOF: 0,
      },
    ],

    // disallow certain syntax forms
    // https://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // disallow use of unary operators, ++ and --
    // https://eslint.org/docs/rules/no-plusplus
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],

    // disallow dangling underscores in identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
          '__PROD__',
          '__DEV__',
          '__TEST__',
        ],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
      },
    ],

    // enforce line breaks between braces
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
        ImportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
      },
    ],

    // allow just one var statement per function
    // https://eslint.org/docs/rules/one-var
    'one-var': ['error', 'never'],

    // Requires operator at the beginning of the line in multiline statements
    // https://eslint.org/docs/rules/operator-linebreak
    // ESLint upgrade
    'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],

    // disallow padding within blocks
    // https://eslint.org/docs/rules/padded-blocks
    'padded-blocks': [
      'error',
      {
        blocks: 'never',
        classes: 'never',
        switches: 'never',
      },
      {
        allowSingleLineBlocks: true,
      },
    ],

    // Enforce location of semicolons
    // https://eslint.org/docs/rules/semi-style
    'semi-style': ['error', 'last'],

    // require or disallow a space immediately following the "//" or "/*" in a comment
    // http://eslint.org/docs/rules/spaced-comment
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!'],
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!', ':', '::'],
          balanced: true,
        },
      },
    ],

    // Enforce spacing around colons of switch statements
    // https://eslint.org/docs/rules/switch-colon-spacing
    'switch-colon-spacing': ['error', { after: true, before: false }],

    // --------------------------------------------------
    // Variables
    // --------------------------------------------------

    // disallow specific globals
    // https://eslint.org/docs/rules/no-restricted-globals
    // ESLint upgrade
    'no-restricted-globals': ['off'],

    // disallow declaration of variables that are not used in the code
    // https://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],

    // disallow use of variables before they are defined
    // https://eslint.org/docs/rules/no-use-before-define
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],

    // disallow declaration of variables already declared in the outer scope
    // https://eslint.org/docs/rules/no-shadow
    'no-shadow': ['off'],

    // --------------------------------------------------
    // React
    // --------------------------------------------------

    // Prevent usage of button elements without an explicit type attribute
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
    // ESLint upgrade
    'react/button-has-type': ['off'],

    // Enforce consistent usage of destructuring assignment of props, state, and context
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    // ESLint upgrade
    'react/destructuring-assignment': ['off'],

    // Forbid certain propTypes
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
    'react/forbid-prop-types': ['off'],

    // Validate closing tag location in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
    // ESLint upgrade
    'react/jsx-closing-tag-location': ['error'],

    // Enforce curly braces or disallow unnecessary curly braces in JSX props and/or children
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
    // ESLint upgrade
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],

    // Restrict file extensions that may contain JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],

    // Limit maximum of props on a single line in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    // ESLint upgrade
    'react/jsx-max-props-per-line': [
      'error',
      { maximum: 1, when: 'multiline' },
    ],

    // One JSX Element Per Line
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
    // ESLint upgrade
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],

    // Validate whitespace in and around the JSX opening and closing brackets
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],

    // Prevent missing parentheses around multilines JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    // ESLint upgrade
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],

    // Prevent using this.state within a this.setState
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
    // ESLint upgrade
    'react/no-access-state-in-setstate': ['off'],

    // Prevent usage of Array index in keys
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    // ESLint upgrade
    'react/no-array-index-key': ['off'],

    // Prevent usage of dangerous JSX properties
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
    'react/no-danger': ['off'],

    // Prevent usage of setState in componentDidMount
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
    'react/no-did-mount-set-state': ['off'],

    // Prevent unused state values
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md
    // ESLint upgrade
    'react/no-unused-state': ['off'],

    // Prevent usage of setState in componentWillUpdate
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
    'react/no-will-update-set-state': ['error'],

    // Enforce a defaultProps definition for every prop that is not a required prop
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    // ESLint upgrade
    'react/require-default-props': ['off'],

    // Prevent missing props validation in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    'react/prop-types': ['off'],

    // Enforce that all elements that require alternative text have meaningful information
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md
    // ESLint upgrade
    'jsx-a11y/alt-text': ['off'],

    // require onClick be accompanied by onKeyUp/onKeyDown/onKeyPress
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
    // ESLint upgrade
    'jsx-a11y/click-events-have-key-events': ['off'],

    // ensure iframe elements have a unique title
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md
    // ESLint upgrade
    'jsx-a11y/iframe-has-title': ['error'],

    // Elements with an interactive role and interaction handlers must be focusable
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md
    // ESLint upgrade
    'jsx-a11y/interactive-supports-focus': ['off'],

    // Enforce that a label tag has a text label and an associated control.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
    // ESLint upgrade
    'jsx-a11y/label-has-associated-control': ['off'],

    // require that JSX labels use "htmlFor"
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    // ESLint upgrade
    'jsx-a11y/label-has-for': [
      'error',
      {
        components: ['Label'],
        required: {
          every: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],

    // media elements must have captions
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/media-has-caption.md
    // ESLint upgrade
    'jsx-a11y/media-has-caption': ['off'],

    // require that mouseover/out come with focus/blur, for keyboard-only users
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
    // ESLint upgrade
    'jsx-a11y/mouse-events-have-key-events': ['off'],

    // A non-interactive element does not support event handlers (mouse and key handlers)
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
    // ESLint upgrade
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],

    // WAI-ARIA roles should not be used to convert a non-interactive element to interactive
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md
    // ESLint upgrade
    'jsx-a11y/no-noninteractive-element-to-interactive-role': ['off'],

    // Tab key navigation should be limited to elements on the page that can be interacted with.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-tabindex.md
    // ESLint upgrade
    'jsx-a11y/no-noninteractive-tabindex': ['off'],

    // ensure HTML elements do not specify redundant ARIA roles
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md
    // ESLint upgrade
    'jsx-a11y/no-redundant-roles': ['error'],

    // Enforce that DOM elements without semantic behavior do not have interaction handlers
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    'jsx-a11y/no-static-element-interactions': ['off'],

    // --------------------------------------------------
    // Browser Support
    // --------------------------------------------------

    // Lint the browser compatibility of your code
    // https://github.com/amilajack/eslint-plugin-compat/blob/master/README.md
    'compat/compat': ['error'],

    // --------------------------------------------------
    // Mocha
    // --------------------------------------------------

    // only() method is called on describe, context, it, specify, suite and test Mocha test keywords
    // https://github.com/lewazo/eslint-mocha-no-only/blob/master/README.md
    // disabled for non test files
    'mocha-no-only/mocha-no-only': ['off'],
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx'],
      env: {
        jest: true,
      },
    },
  ],
};
