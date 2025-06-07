import { Bot } from "https://deno.land/x/grammy@v1.36.3/mod.ts";

const token = Deno.env.get("TELEGRAM_TOKEN");

if (!token) {
  throw new Error("TELEGRAM_TOKEN is required");
}

export const bot = new Bot(token);

const AGILE_CANARIAS_CHAT_ID = -1002483762435;

bot.on("message", (ctx) => {
  const { new_chat_members } = ctx.message;

  if (ctx.chat.id === AGILE_CANARIAS_CHAT_ID && new_chat_members) {
    const name = new_chat_members[0].first_name;
    const welcomeMessage = getWelcomeMessage(name);
    return ctx.reply(welcomeMessage);
  }
});

function getWelcomeMessage(name: string) {
  return `¡Muy buenas, ${name}! 🌞
    Te damos la bienvenida con cariño isleño al grupo de Agile Canarias en Telegram. Aquí, como en cualquier buen tenderete, lo importante es que quienes participamos nos sintamos a gusto. Para que la comunidad funcione como como un mojo bien ligado, nos guiamos por estos cuatro valores:

    🌱 Respeto
    Habla claro, con cariño y sin mala intención. Si hay desacuerdo, que sea para construir, no para destruir. Escucha con empatía, y espera lo mismo de quienes te rodean.

    🌀 Curiosidad
    Aquí venimos a aprender, no a presumir. Si tienes dudas, suéltalas sin miedo. Desde quienes llevan 15 años agilizando hasta quien acaba de descubrir qué es una daily, todo el mundo tiene su lugar aquí.

    🎯 Foco
    Este espacio es para hablar de Agilidad y Software, ni más ni menos. Las discusiones políticas, filosóficas o sobre el clima en Marte se quedan en la puerta.

    📣 Participación consciente
    Comparte lo que sepas, lo que hayas vivido y hasta lo que no funcionó. Eso sí: no spam, NSFW, ni cosas ilegales. Esto es una comunidad, no un mercadillo.`;
}
