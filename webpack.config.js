resolve: {
  fallback: {
  path: require.resolve("path-browserify"),
  crypto: require.resolve("crypto-browserify"),
  stream: require.resolve("stream-browserify"),
  zlib: require.resolve("browserify-zlib"),
  http: require.resolve("stream-http"),
  querystring: require.resolve("querystring-es3"),
  fs: require.resolve("fs")
  }
  }
