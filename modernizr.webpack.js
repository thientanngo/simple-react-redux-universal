export default {
  'feature-detects': [
    'input',
    'canvas',
    'css/resize'
  ],
  minify: {
    output: {
      comments: false,
      beautify: false
    }
  },
  htmlWebpackPlugin: true,
  filename: 'modernizr.js'
}
