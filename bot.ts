import { Bot } from "https://deno.land/x/grammy@v1.36.3/mod.ts";

const token = Deno.env.get("TELEGRAM_TOKEN");

if (!token) {
  throw new Error("TELEGRAM_TOKEN is required");
}

export const bot = new Bot(token);

bot.on("message", (ctx) => ctx.reply("Hi there!"));

bot.on("message:new_chat_members", async (ctx) => {
  const name = ctx.message.new_chat_members[0].first_name;
  await ctx.reply(`¡Bienvenido/a, ${name}! 🎉 ¡Aquí tenemos mojo, gofio y buenos memes!!`);
});
