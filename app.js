import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import { sql } from "./databese/database.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data = {
  count: 0,
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/" && request.method === "GET") { 
    return new Response( await renderFile("./layouts/layout.eta"), responseDetails);
  }
  else if (url.pathname === "/count") {
    data.count++;
    return new Response(await renderFile("count.eta", data), responseDetails);
  }
    return new Response(`Total rows: ${rowCount}`);
};

serve(handleRequest, { port: 7777 });