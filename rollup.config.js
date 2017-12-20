import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const sharedConfig = {
  input: 'src/index.js',
  sourcemap: true,
  external: ['react', 'prop-types'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
  exports: 'named',
}

const sharedPlugins = [
  resolve(),
  replace({
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
  }),
  babel({
    exclude: 'node_modules/**',
    presets: [['env', { modules: false }], 'react'],
    plugins: [
      'external-helpers',
      'transform-class-properties',
      'transform-object-rest-spread',
    ],
  }),
]

export default [
  Object.assign({}, sharedConfig, {
    name: 'Metronome',
    output: {
      file: './dist/index.umd.js',
      format: 'umd',
    },
    plugins: [
      ...sharedPlugins,
      commonjs(),
      process.env.NODE_ENV === 'production' && uglify(),
    ],
  }),
  Object.assign({}, sharedConfig, {
    output: [
      {
        file: require('./package.json').module,
        format: 'es',
      },
      {
        file: require('./package.json').main,
        format: 'cjs',
      },
    ],
    plugins: [
      ...sharedPlugins,
      commonjs({
        exclude: 'node_modules/process-es6/**',
        include: [
          'node_modules/fbjs/**',
          'node_modules/object-assign/**',
          'node_modules/react/**',
          'node_modules/react-dom/**',
          'node_modules/prop-types/**',
        ],
      }),
    ],
  }),
]
