let data = {
  update_id: 837654967,
  message: {
    message_id: 8,
    from: {
      id: 995426763,
      is_bot: false,
      first_name: "Ayush",
      last_name: "Chothe",
      username: "ayushchothe",
      language_code: "en",
    },
    chat: {
      id: 995426763,
      first_name: "Ayush",
      last_name: "Chothe",
      username: "ayushchothe",
      type: "private",
    },
    date: 1680631045,
    text: "Hello",
  },
};

let {
  message: {
    from: { first_name },
    chat: { id: chatId },
    text,
  },
} = data;

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

console.log(first_name);
