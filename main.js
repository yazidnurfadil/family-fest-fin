import dotenv from "dotenv";
dotenv.config();

import log from "ololog";

import { Telegraf, Markup } from "telegraf";

// import sheetdb from "sheetdb-node";
// // create a config file
// var config = {
//   address: process.env.SHEETDB_ID,
//   auth_login: process.env.SHEETDB_USER,
//   auth_password: process.env.stusr6vqcldku9gjl6lh,
// };
// // Create new client
// var client = sheetdb(config);

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(Telegraf.log());

bot.command("quit", async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  await ctx.leaveChat();
});

bot.hears("menu", async (ctx) => {
  // Using context shortcut
  const btnWrapper = (btn, index, currentRow) => index === 1;
  await ctx.reply(
    `Perlu apa ${ctx.message.from.first_name} ${ctx.message.from.last_name}?`,
    Markup.inlineKeyboard(
      [
        // Markup.button.callback(buttonText, commandCb, hidden),
        Markup.button.callback("Request Reimburstment", "reimburstment"),
        Markup.button.callback("Deposit", "deposit"),
        Markup.button.callback("Laporan", "laporan"),
      ],
      { wrap: btnWrapper }
    )
  );
});

bot.action("reimburstment", (ctx) => {
  ctx.replyWithHTML;
  return ctx.replyWithMarkdownV2(
    "Silahkan ketik `/reimburse [nominal] [kebutuhan]`"
  );
});

bot.action("deposit", async (ctx) => {
  return ctx.reply("Deposit 👍");
});

bot.action("laporan", (ctx) => {
  return ctx.reply("Laporan 👍");
});

bot.command("reimburse", (ctx) => {
  log(ctx);
});

bot.on("callback_query", async (ctx) => {
  // Using context shortcut
  await ctx.answerCbQuery();
});

bot.on("inline_query", async (ctx) => {
  const result = [];
  // Explicit usage
  // await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // Using context shortcut
  await ctx.answerInlineQuery(result);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
