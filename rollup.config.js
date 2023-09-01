// Importing necessary modules from rollup and plugins
import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import livereload from 'rollup-plugin-livereload';
import { resolve } from "path";

// Check if the current environment is production
const isProduction = process.env.BUILD === 'production';

// Initialize terser plugin for minification in production
const terserPlugin = terser();

// Define common plugins to be used in the rollup configuration
const plugins = [
  // Resolves modules from node_modules
  nodeResolve(),
  // Converts CommonJS modules to ES6
  commonjs(),
  // Transpiles code using Babel
  babel({ babelHelpers: 'bundled' }),
  // Enables livereload in development environment
  !isProduction && livereload({
    watch: resolve('.'),
    extraExts: ['hbs'],
    exclusions: [resolve('node_modules')],
  }),
];

// Function to create a rollup configuration for a given input and output file
const createConfig = (input, output) => ({
  input,
  output: [
    {
      file: output,
      format: 'es',
      plugins: [terserPlugin],
    }
  ],
  plugins,
});

// Export the rollup configuration
export default defineConfig([
  // Configuration for 'src/main.js'
  createConfig('src/main.js', 'assets/main.js'),
    // Configuration for 'src/darkmode.js'
  createConfig('src/darkmode.js', 'assets/darkmode.min.js'),
]);