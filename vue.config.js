module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/styles.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/users_db/'
    : '/'
};