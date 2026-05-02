const { SlashCommandBuilder } = require('discord.js')
const { err } = require('../../utils/helpers')
const MusicQueue = require('../../structures/client/MusicQueue')
const play = require('play-dl')
module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder().setName('play').setDescription('Joue une musique YouTube')
    .addStringOption(o => o.setName('q').setDescription('Titre ou URL').setRequired(true)),
  async execute(interaction, client) {
    const vc = interaction.member.voice.channel
    if (!vc) return interaction.reply({ content: '❌ Rejoignez un salon vocal.', ephemeral: true })
    await interaction.deferReply()
    try {
      const q    = interaction.options.getString('q')
      const info = play.yt_validate(q) === 'video'
        ? (await play.video_info(q)).video_details
        : (await play.search(q, { limit: 1 }))[0]
      if (!info) return interaction.editReply({ content: '❌ Aucun résultat.' })
      const song = { title: info.title, url: info.url, duration: info.durationRaw || '?', thumbnail: info.thumbnails?.[0]?.url || null, requestedBy: interaction.user.tag }
      let queue  = client.queue.get(interaction.guild.id)
      if (!queue) { queue = new MusicQueue(interaction.guild, interaction.channel, vc); client.queue.set(interaction.guild.id, queue) }
      await queue.add(song)
      await interaction.editReply({ content: queue.songs.length > 1 ? '🎵 **' + song.title + '** ajouté (#' + queue.songs.length + ')' : '🎵 Lecture de **' + song.title + '**' })
    } catch (e) { console.error('[Play]', e); await interaction.editReply({ content: '❌ Erreur de chargement.' }) }
  },
}