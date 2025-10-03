import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("role-remove")
    .setDescription(" حذف رتبة")
    .addRoleOption(option => option.setName("role").setDescription("اختر الرتبة").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const role = interaction.options.getRole("role");
    try {
      await role.delete(`تم بواسطة ${interaction.user.tag}`);
      await interaction.reply({ content: ` تم حذف الرتبة: **${role.name}**`, ephemeral: true });
    } catch {
      await interaction.reply({ content: ` حدث خطأ ولم يتم حذف الرتبة.`, ephemeral: true });
    }
  }
};