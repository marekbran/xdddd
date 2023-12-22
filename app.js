import { Application } from "https://deno.land/x/abc/mod.ts";
import { configure, renderFile } from "./deps.js";
import { join } from "https://deno.land/std/path/mod.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const app = new Application();
const staticBasePath = join(Deno.cwd(), "./path/to/static/files");

app.use(async (ctx) => {
  await serveFile(ctx.request, join(staticBasePath, ctx.request.url.pathname));
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data_2 = {
  imageSrc: "/source.jpg", // Use the correct path to your image
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/" && request.method === "GET") {
    return new Response(await renderFile("./layouts/layout.eta", data_2), responseDetails);
  }
};

app.start({ port: 7777 });
