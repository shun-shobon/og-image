import satori, { init as initSatori } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import wasmYoga from "../node_modules/yoga-wasm-web/dist/yoga.wasm";
import { initWasm as initResvg, Resvg } from "@resvg/resvg-wasm";
import wasmResvg from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";
import { type ReactNode } from "react";

const yoga = await initYoga(wasmYoga);
initSatori(yoga);
await initResvg(wasmResvg);

export async function generateImage(
  element: ReactNode,
  width: number,
  height: number
): Promise<Uint8Array> {
  const svg = await satori(element, {
    width,
    height,
    fonts: [],
  });

  const png = new Resvg(svg).render().asPng();

  return png;
}
