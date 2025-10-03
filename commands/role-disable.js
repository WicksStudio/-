import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("role-disable")
    .setDescription(" إيقاف نظام الرتب")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction, autoRole, setAutoRole) {
    if (!autoRole) return interaction.reply({ content: " النظام معطل بالفعل.", ephemeral: true });
    setAutoRole(null);
    await interaction.reply({ content: " تم إيقاف نظام الرتب.", ephemeral: true });
  }
};