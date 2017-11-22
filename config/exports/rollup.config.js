// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'build/module/index.js',
    sourceMap: true,
    plugins: [
        nodeResolve({
            browser: true
        }),
        commonjs()
    ]
}
