module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push([
    'react-native-unistyles/plugin',
    {
      autoProcessRoot: 'app',
      autoProcessImports: ['~/components'],
    },
  ]);

  plugins.push('react-native-reanimated/plugin');

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
