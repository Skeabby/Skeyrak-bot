const { SlashCommandBuilder } = require('discord.js')
const { mkEmbed } = require('../../utils/helpers')
const { colors } = require('../../../config')
const { readdirSync } = require('fs'), path = require('path')
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('help').setDescription('Liste des commandes'),
  async execute(interaction, client) {
    const base = path.join(__dirname, '..')
    const embed = mkEmbed('', colors.primary).setTitle('📋 Commandes').setThumbnail(client.user.displayAvatarURL()).setFooter({ text: client.commands.size + ' commandes' }).setTimestamp()
    for (const cat of readdirSync(base)) {
      try {
        const cmds = readdirSync(base + '/' + cat).filter(f => f.endsWith('.js')).map(f => { try { const c = require(base + '/' + cat + '/' + f); return '/' + c.data.name + ' — ' + c.data.description } catch { return null } }).filter(Boolean)
        if (cmds.length) embed.addFields({ name: '📁 ' + cat, value: cmds.join('
') })
      } catch {}
    }
    await interaction.reply({ embeds: [embed], ephemeral: true })
  },
}