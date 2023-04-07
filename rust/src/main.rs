use sha2::{Digest, Sha256, Sha512};
use std::error::Error;
use teloxide::utils::command::BotCommands;
use teloxide::{prelude::*, types::Me};

#[derive(BotCommands)]
#[command(
    rename_rule = "lowercase",
    description = "These commands are supported:"
)]
enum Command {
    #[command(description = "Display this text")]
    Help,
    #[command(
        description = "Generate a Hash by following algorithms: md5, sha256, sha512\neg. /hash sha512 PlainText",
        parse_with = "split"
    )]
    Hash(String, String),
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    pretty_env_logger::init();
    log::info!("Starting buttons bot...");

    let bot = Bot::new("5896325394:AAFavOTsIbpsocGE6ep1zvOEbTyRnV7bOJU");

    bot.set_chat_menu_button().await?;

    let handler = dptree::entry().branch(Update::filter_message().endpoint(message_handler));

    Dispatcher::builder(bot, handler)
        .enable_ctrlc_handler()
        .build()
        .dispatch()
        .await;
    Ok(())
}

/// Parse the text wrote on Telegram and check if that text is a valid command
/// or not, then match the command. If the command is `/start` it writes a
/// markup with the `InlineKeyboardMarkup`.
async fn message_handler(
    bot: Bot,
    msg: Message,
    me: Me,
) -> Result<(), Box<dyn Error + Send + Sync>> {
    if let Some(text) = msg.text() {
        match BotCommands::parse(text, me.username()) {
            Ok(Command::Help) => {
                // Just send the description of all commands.
                bot.send_message(msg.chat.id, Command::descriptions().to_string())
                    .await?;
            }
            Ok(Command::Hash(algo, text)) => {
                let m = bot.send_message(msg.chat.id, "Generating...").await?;
                let hash: String = match algo.as_str() {
                    "md5" => format!("{:x}", md5::compute(text)).to_owned(),
                    "sha256" => format!("{:x}", Sha256::digest(text)).to_owned(),
                    "sha512" => format!("{:x}", Sha512::digest(text)).to_owned(),
                    _ => "Algorithm not supported".to_owned(),
                };
                bot.edit_message_text(msg.chat.id, m.id, format!("{algo}: {hash}"))
                    .await?;
            }

            Err(_) => {
                bot.send_message(msg.chat.id, "Command not found!").await?;
            }
        }
    }

    Ok(())
}
