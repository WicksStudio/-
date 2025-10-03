import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("role-list").setDescription(" عرض جميع الرتب"),

  async execute(interaction) {
    const roles = interaction.guild.roles.cache.filter(r => r.name !== "@everyone").map(r => r.name).join(", ") || " لا توجد رتب.";
    await interaction.reply({ content: ` قائمة الرتب: ${roles}`, ephemeral: true });
  }
};