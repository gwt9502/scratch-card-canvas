import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
export default {
  input: './es/index.js',
  output: {
    file: './dist/main.js',
    format: 'umd',
    name: 'ScratchCard'
  },
  watch: {
    include: 'es/index.js'
  },
  plugins: [
    resolve(),
    commonjs(),
    uglify(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
