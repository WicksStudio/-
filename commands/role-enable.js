import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("role-enable")
    .setDescription(" تفعيل نظام الرتب")
    .addRoleOption(option => option.setName("role").setDescription("اختر رتبة للأعضاء الجدد").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction, autoRole, setAutoRole) {
    const role = interaction.options.getRole("role");
    setAutoRole(role);
    await interaction.reply({ content: ` تم تفعيل النظام. الرتبة للأعضاء الجدد: **${role.name}**`, ephemeral: true });
  }
};