import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("role-add")
    .setDescription(" إنشاء رتبة جديدة")
    .addStringOption(option => option.setName("name").setDescription("اسم الرتبة").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const roleName = interaction.options.getString("name");
    try {
      const role = await interaction.guild.roles.create({ name: roleName, color: "Grey", reason: `تم بواسطة ${interaction.user.tag}` });
      await interaction.reply({ content: ` تم إنشاء الرتبة: **${role.name}**`, ephemeral: true });
    } catch {
      await interaction.reply({ content: ` حدث خطأ ولم يتم إنشاء الرتبة.`, ephemeral: true });
    }
  }
};