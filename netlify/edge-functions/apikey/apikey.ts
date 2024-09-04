import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const value = Netlify.env.get("sp_apikey");
  console.log(value);

  return new Response(`Value of MY_IMPORTANT_VARIABLE for ${context.site.name} is ${value}.`, {
    headers: { "content-type": "text/html" },
  });
};
