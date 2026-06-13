import { serveDir } from "@std/http/file-server";
import { fromFileUrl } from "@std/path/from-file-url";

const ROOT = fromFileUrl(new URL(".", import.meta.url));
const HTML_HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "x-content-type-options": "nosniff",
};

Deno.serve(async (request) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { allow: "GET, HEAD" },
    });
  }

  const response = await serveDir(request, {
    fsRoot: ROOT,
    showDirListing: false,
    quiet: true,
  });

  if (response.status !== 404) {
    response.headers.set("x-content-type-options", "nosniff");
    return response;
  }

  if (request.method === "HEAD") {
    return new Response(null, { status: 404, headers: HTML_HEADERS });
  }

  const body = await Deno.readFile(new URL("404.html", import.meta.url));
  return new Response(body, { status: 404, headers: HTML_HEADERS });
});
