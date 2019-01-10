module.exports = {
  baseUrl: './',
  pages: {
    index: {
      // entry for the *public* page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // chunks: ["index"]
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
};
