module.exports = {
  baseUrl: "./",
  pages: {
    index: {
      // entry for the *public* page
      entry: "src/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html"
      // chunks: ["index"]
    },
    lilypond: {
      entry: "src/main.js",
      template: "public/lilypond.html",
      filename: "lilypond.html"
      // chunks: ["lilypond"]
    }
  },
  chainWebpack: config => {
    config.optimization.delete("splitChunks");
  }
};
