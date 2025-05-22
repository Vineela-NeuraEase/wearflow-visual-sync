
// Polyfill for react-native-web's codegenNativeComponent
export default function codegenNativeComponent(name, options = {}) {
  return {
    __constants: null,
    __nativeComponentName: name,
    __options: options,
  };
}
