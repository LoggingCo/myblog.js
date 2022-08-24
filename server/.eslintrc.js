module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            js: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['eslint:recommended', 'plugin:react-hooks/recommended'],
    root: true,
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'no-undef': 'off',
        'no-empty': 'off',
        'no-useless-escape': 'off',
        'no-unused-vars': 1, // 배포 전에는 2로 바꾸어서 에러로 감지
    },
};
