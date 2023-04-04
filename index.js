const express = require("express");
const app = express();
app.use(express.json());

const TOKEN = "bot5896325394:AAFavOTsIbpsocGE6ep1zvOEbTyRnV7bOJU";
const URL = `https://api.telegram.org/${TOKEN}`;

const sendMessage = (chatId, text, replyTo) =>
  URL +
  `/sendMessage?chat_id=${chatId}&text=${text}&reply_to_message_id=${replyTo}`;

app.post("/", async (req, res) => {
  let {
    message: {
      message_id: replyTo,
      from: { first_name },
      chat: { id: chatId },
      text,
    },
  } = req.body;

  console.log(first_name, chatId, text);

  switch (text) {
    case "Hi":
      await fetch(sendMessage(chatId, `Hello ${first_name}`, replyTo));
      break;
    case "Ayush":
      await fetch(sendMessage(chatId, "Hey Ash", replyTo));
      break;
    case "Chetan":
      await fetch(sendMessage(chatId, "Hi Storm", replyTo));
      break;
    default:
      await fetch(sendMessage(chatId, "I did't understand", replyTo));
      break;
  }

  res.send(true);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started...");
});
