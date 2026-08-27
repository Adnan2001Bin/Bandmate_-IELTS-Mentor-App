const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'node_modules/*',
      '.expo/*',
      'dist/*',
      'src/theme/global.css',
      // Design references, not app source. They are read, never shipped.
      '_ds/*',
      'support.js',
      'ios-frame.jsx',
      'android-frame.jsx',
    ],
  },
]);
