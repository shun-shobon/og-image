declare module "*.wasm" {
  declare const value: WebAssembly.Module;
  export default value;
}
