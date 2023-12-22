import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";

configure({
  views: `${Deno.cwd()}/views/`,
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

serve(handleRequest, { port: 7777 });
