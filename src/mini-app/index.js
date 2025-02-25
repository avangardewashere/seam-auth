const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();
const bot = new Telegraf(process.env.TOKEN);
const BANNER_IMG_PATH = "./assets/images/";
const BANNER_IMG = "minibanner.jpg";
// Set default commands for regular users - only shows start command
const banner = `${BANNER_IMG_PATH}${BANNER_IMG}`;
bot.telegram.setMyCommands(
  [{ command: "start", description: "Start the Bot" }],
  { scope: { type: "default" } }
);

bot.start(async (ctx) => {
  //   const { id: userId, username, first_name: firstName } = ctx?.from;
  //   const { message_id } = ctx?.message;
  const { id: userId, first_name: firstName } = ctx.from;

  //   users = getUsers();
  //   let user = users.find((user) => user?.id === userId);
  //   // If user doesn't exist, add them to users array and save to file
  //   if (!user) {
  //     users.push({ id: userId, username });
  //     saveUsers(users);
  //   }

  // Get welcome message markup with user's first name
  const replyMarkup = await postWelcomeMessage(firstName);
  //   // Send photo with welcome message and contact sharing button
  await bot.telegram.sendPhoto(userId, { source: banner }, replyMarkup);

  //   // Delete the /start command message for cleaner chat
  //   ctx.deleteMessage(message_id);

//   ctx.reply("hi");
});

const postWelcomeMessage = async (firstName) => {
  const replyMarkup = {
    width: 640,
    height: 360,
    caption: ` \n
      Welcome ${firstName}! to Casino Plus! Experience the excitement of live online games and slots, all certified by PAGCOR! Dive into a world of fun with our popular games like Live Color Game, Baccarat and many more, all from the comfort of your home! 🎨🎉
  Kunin ang P50 worth of Lucky Cards kapag sumali ka sa aming official Telegram Channel!  🎁 Simply subscribe and check the channel for the full mechanics. Ang Lucky Card ay isang card collection mechanism sa Lucky Plus kung saan pwede mag-collect, mag-convert at makakuha ng Lucky Coins that can be used as credits! A full set is worth P50 💎 \n\n
  To play, please share your contact by clicking the "Share Contact" button below.`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
            {
                text: "PLAY NOW ▶️",
                web_app: { url: "https://cf3c-113-19-29-34.ngrok-free.app" },
              },
        //   {
        //     text: "📞 Share Contact",
        //     request_contact: true,
        //   },
        ],
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  };

  return replyMarkup;
};

bot.launch();
