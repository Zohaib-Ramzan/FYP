const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  // Load the default configuration
  const defaultConfig = await getDefaultConfig(__dirname);

  // Destructure assetExts from resolver
  const { resolver: { assetExts, sourceExts } } = defaultConfig;

  return {
    resolver: {
      // Merge assetExts with 'bin'
      assetExts: [...assetExts, 'bin'],
      // Merge sourceExts with 'cjs'
      sourceExts: [...sourceExts, 'cjs']
    }
  };
})();
