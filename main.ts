import { webhookCallback } from "https://deno.land/x/grammy@v1.36.3/mod.ts";
import { bot, onSessionReceived } from "./bot.ts";

const handleUpdate = webhookCallback(bot, "std/http");

const telegramSecret = Deno.env.get("TELEGRAM_WEBHOOK_SECRET");
const tallySecret = Deno.env.get("TALLY_WEBHOOK_SECRET");

if (!telegramSecret) {
  throw new Error("TELEGRAM_WEBHOOK_SECRET is required");
}

if (!tallySecret) {
  throw new Error("TALLY_WEBHOOK_SECRET is required");
}

Deno.serve(async (req) => {
  console.log("Received request");
  console.log(req);
  
  if (req.method === "POST") {
    if (req.url.includes("tally") && req.url.includes(tallySecret)) {
      const body = await req.json();
      
      await onSessionReceived(body);

      return new Response(undefined, { status: 204 });
    }

    if (req.url.includes("telegram") && req.url.includes(telegramSecret)) {
      return await handleUpdate(req);
    }
  }

  return new Response("No hay gofio pa ti", { status: 401 });
});

