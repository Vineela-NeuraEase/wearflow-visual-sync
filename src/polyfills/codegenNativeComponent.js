
/**
 * Comprehensive polyfill for React Native Web's codegenNativeComponent
 * This mimics the expected API of the original module for all possible import paths
 */
export default function codegenNativeComponent(name, options = {}) {
  return {
    __constants: null,
    __nativeComponentName: name,
    __options: options,
  };
}

// Named exports that are commonly used
export const throwIfNodeEnv = () => {};

export const requireNativeComponent = (name) => {
  return {
    __constants: null,
    __nativeComponentName: name,
  };
};

// Additional exports that might be needed
export const NativeComponentRegistry = {
  get: (name) => ({
    __nativeComponentName: name,
  }),
};

// Make the module act as both a default and named export system
module.exports = codegenNativeComponent;
module.exports.default = codegenNativeComponent;
module.exports.throwIfNodeEnv = throwIfNodeEnv;
module.exports.requireNativeComponent = requireNativeComponent;
module.exports.NativeComponentRegistry = NativeComponentRegistry;
