import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("roles-panel")
    .setDescription(" فتح بانل التحكم بنظام الرتب")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x808080)
      .setTitle(" بانل التحكم بنظام الرتب")
      .setDescription(" اختر أحد الخيارات من القائمة بالأسفل للتحكم بالرتب.");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("roles-menu")
      .setPlaceholder(" اختر العملية")
      .addOptions([
        { label: " إضافة رتبة", description: "إنشاء رتبة جديدة", value: "add" },
        { label: " حذف رتبة", description: "حذف رتبة موجودة", value: "remove" },
        { label: " عرض جميع الرتب", description: "مشاهدة قائمة الرتب", value: "list" },
        { label: " تفعيل نظام الرتب", description: "إعطاء رتبة تلقائيًا للأعضاء الجدد", value: "enable" },
        { label: " إيقاف نظام الرتب", description: "إلغاء إعطاء الرتب التلقائي", value: "disable" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);
    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  }
};