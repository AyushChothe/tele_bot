const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();
app.use(express.json());

const TOKEN = "bot5896325394:AAFavOTsIbpsocGE6ep1zvOEbTyRnV7bOJU";
const bot = new TelegramBot(TOKEN);
// bot.setWebHook("https://telebot-production-29ce.up.railway.app/");

app.post("/", async (req, res) => {
  let {
    message: {
      from: { first_name },
      chat: { id: chatId },
      text,
    },
  } = req.body;

  console.log(first_name, chatId, text);

  switch (text) {
    case "Hi":
      await bot.sendMessage(chatId, `Hello ${first_name}`);
      break;
    case "Ayush":
      await bot.sendMessage(chatId, "Hey Ash");
      break;
    case "Chetan":
      await bot.sendMessage(chatId, "Hi Storm");
      break;
  }

  res.send(true);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started...");
});
