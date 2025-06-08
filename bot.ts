import {
  Bot,
  InlineKeyboard,
  InputFile,
} from "https://deno.land/x/grammy@v1.36.3/mod.ts";
import {
  extractImages,
  SessionReceivedPayload,
  summarySession,
} from "./summarySession.ts";
import { formatNamesList } from "./formatNamesList.ts";

const token = Deno.env.get("TELEGRAM_TOKEN");

if (!token) {
  throw new Error("TELEGRAM_TOKEN is required");
}

export const bot = new Bot(token);

const AGILE_CANARIAS_CHAT_ID = -1002483762435;
const AGILE_CANARIAS_ORGANIZATION_CHAT_ID = -601619008;
const AGILE_CANARIAS_ORGANIZATION_TEST_CHAT_ID = -47809862472;

const rules = `Gracias por tomarte la molestia de leerlas. Aquí tienes un resumen:

🌱 Respeto
Habla claro, con cariño y sin mala intención. Si hay desacuerdo, que sea para construir, no para destruir. Escucha con empatía, y espera lo mismo de quienes te rodean.

🌀 Curiosidad
Aquí venimos a aprender, no a presumir. Si tienes dudas, suéltalas sin miedo. Desde quienes llevan 15 años agilizando hasta quien acaba de descubrir qué es una daily, todo el mundo tiene su lugar aquí.

🎯 Foco
Este espacio es para hablar de Agilidad y Software, ni más ni menos. Las discusiones políticas, filosóficas o sobre el clima en Marte se quedan en la puerta.

📣 Participación consciente
Comparte lo que sepas, lo que hayas vivido y hasta lo que no funcionó. Eso sí: no spam, NSFW, ni cosas ilegales. Esto es una comunidad, no un mercadillo.`;

const help = `Puedes usar los siguientes comandos:
- /rules: Muestra las normas del grupo
- /suggestion [tu sugerencia]: Envía propuestas de mejora a la organización
- /session: Propón una sesión, una charla, kata, workshop, etc.
- /help: Muestra esta ayuda`;

bot.command("start", async (ctx) => {
  if (ctx.chat.type !== "private") {
    return;
  }

  if (ctx.match === "rules") {
    return ctx.reply(rules);
  }

  if (ctx.match === "suggestion") {
    return ctx.reply(
      "Escribe tu sugerencia después del comando. Ejemplo:\n/suggestion Me gustaría que haya más eventos online."
    );
  }

  if (ctx.match === "help") {
    return ctx.reply(help);
  }

  await ctx.reply(
    "¡Hola! Soy el bot de Agile Canarias. Puedes usar el comando /rules para ver las normas del grupo."
  );
});

bot.command("suggestion", async (ctx) => {
  if (ctx.chat.type !== "private") {
    await ctx.reply(
      "¡Ey! Mejor, envíame tu sugerencia en privado 👂🏽 👉 https://t.me/AgileGuayotaBot?start=suggestion"
    );
    return;
  }

  const suggestion = ctx.match?.trim();
  if (!suggestion) {
    await ctx.reply(
      "Por favor, escribe tu sugerencia después del comando. Ejemplo:\n/suggestion Me gustaría que haya más eventos online."
    );
    return;
  }

  await ctx.api.sendMessage(
    AGILE_CANARIAS_ORGANIZATION_CHAT_ID,
    `📝 Nueva sugerencia de @${ctx.from?.username}:\n\n${suggestion}`
  );

  await ctx.reply(
    "¡Gracias por tu sugerencia! La hemos recibido y la tendremos en cuenta."
  );
});

bot.command("rules", async (ctx) => {
  if (ctx.chat.type !== "private") {
    return ctx.reply(
      "¡Ey! Las normas te las cuento en privado, no por aquí 📜 👉 https://t.me/AgileGuayotaBot?start=rules"
    );
  }

  await ctx.reply(rules);
});

bot.command("session", async (ctx) => {
  await ctx.reply("¡Genial 🤩! ¡una propuesta de sesión! 🎉. Sube tu propuesta aquí 👉🏽 https://tally.so/r/mDEVlZ");
});

bot.command("help", async (ctx) => {
  if (ctx.chat.type !== "private") {
    return ctx.reply(
      "¡Ey! La ayuda te la cuento en privado, no por aquí 🆘 👉 https://t.me/AgileGuayotaBot?start=help"
    );
  }

  await ctx.reply(help);
});

bot.on("message", (ctx) => {
  const { new_chat_members } = ctx.message;

  console.log("Incoming message", ctx.message);
  console.log("Chat", ctx.chat);

  if (ctx.chat.id === AGILE_CANARIAS_CHAT_ID && new_chat_members) {
    const names = new_chat_members.map((member) => member.first_name);
    const welcomeMessage = getWelcomeMessage(names);
    return ctx.reply(welcomeMessage);
  }
});

function getWelcomeMessage(names: string[]) {
  const formattedNames = formatNamesList(names);
  const [te, puedes] = names.length > 1 ? ["Les", "Pueden"] : ["Te", "Puedes"];

  return `¡Muy buenas, ${formattedNames}! 🌞 ${te} damos la bienvenida con cariño isleño al grupo de Agile Canarias en Telegram. Aquí ${puedes} ver las normas del grupo:\nhttps://t.me/AgileGuayotaBot?start=rules\n\nRecuerda darle a Start!`;
}

export async function onSessionReceived(
  sessionReceived: SessionReceivedPayload
) {
  const summary = summarySession(sessionReceived);
  const files = extractImages(sessionReceived)
    .map((url) => new URL(url))
    .map((url) => new InputFile(url));

  await bot.api.sendMessage(AGILE_CANARIAS_ORGANIZATION_CHAT_ID, summary, {
    parse_mode: "Markdown",
  });

  for (const file of files) {
    await bot.api.sendPhoto(AGILE_CANARIAS_ORGANIZATION_CHAT_ID, file);
  }
}
