import { webhookCallback } from "https://deno.land/x/grammy@v1.36.3/mod.ts";
import { bot } from "./bot.ts";

const handleUpdate = webhookCallback(bot, "std/http");

const secret = Deno.env.get("WEBHOOK_SECRET");

if (!secret) {
  throw new Error("WEBHOOK_SECRET is required");
}

Deno.serve(async (req) => {
  console.log("Received request");
  console.log(req);
  if (req.method === "POST" && req.url.includes(secret)) {
      return await handleUpdate(req);
  }
  return new Response("No hay gofio pa ti", { status: 401 });
});
