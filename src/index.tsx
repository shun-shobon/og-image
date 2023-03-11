import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import yogaWasm from "../node_modules/yoga-wasm-web/dist/yoga.wasm";
import resvgWasm from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
}

let initialized = false;
const moduleInit = (async () => {
  if (initialized) return;

  // @ts-expect-error: WebAssembly.Moduleを渡してるはずなのになんか動く
  init(await initYoga(yogaWasm));
  await initWasm(resvgWasm);

  initialized = true;
})();

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    await moduleInit;

    const svg = await satori(
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "red",
        }}
      />,
      {
        width: 1200,
        height: 630,
        fonts: [],
      }
    );

    const resvg = new Resvg(svg);
    const image = resvg.render();
    const png = image.asPng();

    return new Response(png);
  },
};
