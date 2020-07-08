module.exports = {
  webpack: (config, { isServer, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/pages.*\/test.*/));

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }

    return config;
  }
};
