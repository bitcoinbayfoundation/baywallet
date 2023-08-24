module.exports = {
  presets: [['module:metro-react-native-babel-preset', {
    unstable_transformProfile: 'hermes-stable'
  }]],
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], 'react-native-reanimated/plugin'],
};
