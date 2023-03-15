import { Card } from "./Card";
import { generateImage } from "./image";

export interface Env {}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const png = await generateImage(<Card />, 1200, 630);

    return new Response(png);
  },
};
