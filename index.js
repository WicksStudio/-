import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// تجاهل تحذيرات Deprecation
process.removeAllListeners("warning");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();
const commands = [];

// تحميل الأوامر
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
  commands.push(command.default.data.toJSON());
}

let autoRole = null; // الرتبة التلقائية

function setAutoRole(role) {
  autoRole = role;
}

// تشغيل البوت
client.once("ready", async () => {
  // ASCII art بسيط (مافيه اسم البوت)
  console.log(` __          ___      _    
\\ \\        / (_)    | |   
 \\ \\  /\\  / / _  ___| | __
  \\ \\/  \\/ / | |/ __| |/ /
   \\  /\\  /  | | (__|   < 
    \\/  \\/   |_|\\___|_|\\_\\`);

  // رابط سيرفرك + نص مخصص
  console.log("\n https://discord.gg/wicks");
  
  
  console.log("wick top 1 \n");

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log("✅ Slash commands registered globally.");
  } catch (err) {
    console.error(err);
  }
});

// التفاعل مع الأوامر
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (command) await command.execute(interaction, autoRole, setAutoRole);
  }

  // منيو البانل
  if (interaction.isStringSelectMenu() && interaction.customId === "roles-menu") {
    if (interaction.values[0] === "list") {
      const roles = interaction.guild.roles.cache
        .filter(r => r.name !== "@everyone")
        .map(r => r.name)
        .join(", ") || " لا توجد رتب.";

      const embed = {
        color: 0x808080,
        title: " قائمة الرتب",
        description: roles
      };
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (interaction.values[0] === "enable") {
      await interaction.reply({ content: " استخدم `/role-enable` لتحديد رتبة للأعضاء الجدد.", ephemeral: true });
    }

    if (interaction.values[0] === "disable") {
      autoRole = null;
      await interaction.reply({ content: " تم إيقاف نظام الرتب التلقائي.", ephemeral: true });
    }

    if (interaction.values[0] === "add") {
      await interaction.reply({ content: " استخدم `/role-add` لإنشاء رتبة جديدة.", ephemeral: true });
    }

    if (interaction.values[0] === "remove") {
      await interaction.reply({ content: " استخدم `/role-remove` لحذف رتبة.", ephemeral: true });
    }
  }
});

// عند دخول عضو جديد
client.on("guildMemberAdd", async (member) => {
  if (autoRole) {
    try {
      await member.roles.add(autoRole);
      console.log(`تم إعطاء ${member.user.tag} رتبة ${autoRole.name}`);
    } catch (err) {
      console.error(" خطأ أثناء إعطاء الرتبة:", err);
    }
  }
});

client.login(process.env.TOKEN);