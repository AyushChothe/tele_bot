const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

const TOKEN = "bot5896325394:AAFavOTsIbpsocGE6ep1zvOEbTyRnV7bOJU";

app.use(express.json());

app.post("/", (req, res) => {
  const bot = new TelegramBot(TOKEN);
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
      bot.sendMessage(chatId, `Hello ${first_name}`);
      break;
    case "Ayush":
      bot.sendMessage(chatId, "Hey Ash");
      break;
    case "Chetan":
      bot.sendMessage(chatId, "Hi Storm");
      break;
  }

  res.send(true);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started...");
});
