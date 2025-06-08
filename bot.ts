import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.36.3/mod.ts";
import { SessionReceivedPayload, summarySession } from "./summarySession.ts";

const token = Deno.env.get("TELEGRAM_TOKEN");

if (!token) {
  throw new Error("TELEGRAM_TOKEN is required");
}

export const bot = new Bot(token);

const AGILE_CANARIAS_CHAT_ID = -1002483762435;
const AGILE_CANARIAS_ORGANIZATION_CHAT_ID = -4780986247;

const rules = `Gracias por tomarte la molestia de leerlas. Aquí tienes un resumen:

🌱 Respeto
Habla claro, con cariño y sin mala intención. Si hay desacuerdo, que sea para construir, no para destruir. Escucha con empatía, y espera lo mismo de quienes te rodean.

🌀 Curiosidad
Aquí venimos a aprender, no a presumir. Si tienes dudas, suéltalas sin miedo. Desde quienes llevan 15 años agilizando hasta quien acaba de descubrir qué es una daily, todo el mundo tiene su lugar aquí.

🎯 Foco
Este espacio es para hablar de Agilidad y Software, ni más ni menos. Las discusiones políticas, filosóficas o sobre el clima en Marte se quedan en la puerta.

📣 Participación consciente
Comparte lo que sepas, lo que hayas vivido y hasta lo que no funcionó. Eso sí: no spam, NSFW, ni cosas ilegales. Esto es una comunidad, no un mercadillo.`;

bot.command("start", async (ctx) => {
  if (ctx.chat.type === "private") {
    if (ctx.match === "rules") {
      return ctx.reply(rules);
    }

    await ctx.reply(
      "¡Hola! Soy el bot de Agile Canarias. Puedes usar el comando /rules para ver las normas del grupo."
    );
  }
});

bot.command("rules", async (ctx) => {
  if (ctx.chat.type === "private") {
    await ctx.reply(rules);
  } else {
    await ctx.reply(
      "¡Ey! Las normas te las cuento en privado, no por aquí 📩 👉 https://t.me/AgileGuayotaBot"
    );
  }
});

bot.on("message", (ctx) => {
  const { new_chat_members } = ctx.message;

  console.log("Incoming message", ctx.message);
  console.log("Chat", ctx.chat);

  if (ctx.chat.id === AGILE_CANARIAS_CHAT_ID && new_chat_members) {
    const firstMember = new_chat_members[0];
    const name = firstMember.first_name;
    const welcomeMessage = getWelcomeMessage(name);
    return ctx.reply(welcomeMessage, {
      reply_markup: new InlineKeyboard().text("📜 Ver normas", "send_rules"),
    });
  }
});

bot.callbackQuery("send_rules", async (ctx) => {
  const userId = ctx.callbackQuery.from.id;

  await ctx.api.sendMessage(userId, rules);


  await ctx.answerCallbackQuery();
});

function getWelcomeMessage(name: string) {
  return `¡Muy buenas, ${name}! 🌞 Te damos la bienvenida con cariño isleño al grupo de Agile Canarias en Telegram. Aquí puedes ver las normas del grupo:`;
}

export async function onSessionReceived(sessionReceived: SessionReceivedPayload) {
  const summary = summarySession(sessionReceived);

  await bot.api.sendMessage(AGILE_CANARIAS_ORGANIZATION_CHAT_ID, summary, { parse_mode: "Markdown" });
}
