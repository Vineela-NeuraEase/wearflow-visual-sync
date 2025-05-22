
/**
 * Polyfill for react-native-web's codegenNativeComponent
 * This mimics the expected API of the original module to satisfy imports
 */
export default function codegenNativeComponent(name, options = {}) {
  return {
    __constants: null,
    __nativeComponentName: name,
    __options: options,
  };
}

// Also provide named exports that might be used
export const throwIfNodeEnv = () => {};
export const requireNativeComponent = (name) => {
  return {
    __constants: null,
    __nativeComponentName: name,
  };
};
