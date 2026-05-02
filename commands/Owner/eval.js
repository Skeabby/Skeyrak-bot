const { SlashCommandBuilder, codeBlock } = require('discord.js')
const { isOwner, mkEmbed } = require('../../utils/helpers')
const { colors, emojis } = require('../../../config')
module.exports = {
  data: new SlashCommandBuilder().setName('eval').setDescription('[Owner] Exécute du JS').addStringOption(o => o.setName('code').setDescription('Code').setRequired(true)),
  async execute(interaction, client) {
    if (!isOwner(interaction.user.id)) return interaction.reply({ content: emojis.error + ' Owner only.', ephemeral: true })
    const code = interaction.options.getString('code')
    try {
      let out = eval(code); if (out instanceof Promise) out = await out; if (typeof out !== 'string') out = require('util').inspect(out, { depth: 1 })
      out = out.replace(new RegExp(client.token, 'g'), '[TOKEN]')
      await interaction.reply({ embeds: [mkEmbed('', colors.success).setTitle('✅ Eval').addFields({ name: 'Input', value: codeBlock('js', code.slice(0, 900)) }, { name: 'Output', value: codeBlock('js', out.slice(0, 900)) })], ephemeral: true })
    } catch (e) {
      await interaction.reply({ embeds: [mkEmbed('', colors.error).setTitle('❌ Eval Error').addFields({ name: 'Input', value: codeBlock('js', code.slice(0, 900)) }, { name: 'Error', value: codeBlock('js', e.message.slice(0, 900)) })], ephemeral: true })
    }
  },
}