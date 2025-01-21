const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  // Load the default configuration
  const defaultConfig = await getDefaultConfig(__dirname);

  // Destructure assetExts and sourceExts from resolver
  const { resolver: { assetExts, sourceExts } } = defaultConfig;

  return {
    ...defaultConfig,  // Make sure to spread the default config
    resolver: {
      ...defaultConfig.resolver,  // Extend the resolver config to ensure compatibility
      assetExts: [...assetExts, 'bin'],  // Merge assetExts with 'bin'
      sourceExts: [...sourceExts, 'cjs'] // Merge sourceExts with 'cjs'
    }
  };
})();