import { Application, send } from "https://deno.land/x/abc/mod.ts";
import { configure, renderFile } from "./deps.js";
import { join } from "https://deno.land/std/path/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const app = new Application();
const staticBasePath = join(Deno.cwd(), "./source.jpg");

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: staticBasePath,
  });
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data_2 = {
  imageSrc: "./source.jpg", // Use the actual path to your image
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/" && request.method === "GET") {
    return new Response(await renderFile("./layouts/layout.eta", data_2), responseDetails);
  }
};

app.start({ port: 7777 });
