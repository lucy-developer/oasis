module.exports = {
    extends: ['airbnb', 'prettier'],
    rules: {
        'react/prefer-stateless-function': 0,
        'react/jsx-filename-extension': 0,
        // 'react/jsx-one-expression-per-line': 0,
        // 'react/no-array-index-key': 0,
        // 'no-console': 0,
        // 'no-alert': 0,
        'react/jsx-props-no-spreading': 0,
        'prefer-template': 0,
        'spaced-comment' : 0,
        'react/prop-types': 0,
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 0,
        'no-unused-vars': 0,
        'react/no-array-index-key': 0,
        'react/jsx-closing-tag-location': 0,
        'react/no-unused-state': 0,
        // "indent": [2, "tab", { "SwitchCase": 1, "VariableDeclarator": 1 }],
        // "no-tabs": 0
    },
    env: {
        browser: true,
    },
    parser: 'babel-eslint'
};
