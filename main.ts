import { Application } from "https://deno.land/x/oak/mod.ts";
const PORT = Deno.env.get("PORT") || 8080;
const app = new Application();

const TOKEN = "bot5896325394:AAFavOTsIbpsocGE6ep1zvOEbTyRnV7bOJU";
const URL = `https://api.telegram.org/${TOKEN}`;

const sendMessage = (chatId, text, replyTo) =>
  URL +
  `/sendMessage?chat_id=${chatId}&text=${text}&reply_to_message_id=${replyTo}`;

app.use(async (ctx) => {
  let {
    message: {
      message_id: replyTo,
      from: { first_name },
      chat: { id: chatId },
      text,
    },
  } = await ctx.request.body().value;

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

  ctx.response.body = true;
});

await app.listen({ port: PORT });
