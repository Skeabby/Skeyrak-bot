const { createAudioPlayer, createAudioResource, AudioPlayerStatus, joinVoiceChannel } = require('@discordjs/voice')
const { EmbedBuilder }   = require('discord.js')
const { colors, emojis } = require('../../../config')
const play               = require('play-dl')

class MusicQueue {
  constructor(guild, textCh, voiceCh) {
    this.guild   = guild
    this.textCh  = textCh
    this.songs   = []
    this.loop    = false

    this.conn   = joinVoiceChannel({ channelId: voiceCh.id, guildId: guild.id, adapterCreator: guild.voiceAdapterCreator })
    this.player = createAudioPlayer()
    this.conn.subscribe(this.player)

    this.player.on(AudioPlayerStatus.Idle, () => {
      if (this.loop && this.songs[0]) return this._play(this.songs[0])
      this.songs.shift()
      this.songs.length ? this._play(this.songs[0]) : this.destroy()
    })
    this.player.on('error', e => console.error('[Music]', e.message))
  }

  async _play(song) {
    try {
      const stream   = await play.stream(song.url)
      const resource = createAudioResource(stream.stream, { inputType: stream.type })
      this.player.play(resource)
      this.textCh.send({ embeds: [new EmbedBuilder().setColor(colors.primary).setTitle(`${emojis.music} En cours`).setDescription(`**[${song.title}](${song.url})**`).addFields({ name: 'Durée', value: song.duration, inline: true }, { name: 'Par', value: song.requestedBy, inline: true }).setThumbnail(song.thumbnail)] }).catch(() => {})
    } catch (e) {
      console.error('[Music] Lecture :', e.message)
      this.songs.shift()
      if (this.songs.length) this._play(this.songs[0])
    }
  }

  async add(song) { this.songs.push(song); if (this.songs.length === 1) await this._play(song) }
  skip()   { this.player.stop() }
  pause()  { this.player.pause() }
  resume() { this.player.unpause() }
  destroy() { this.songs = []; this.player.stop(); this.conn.destroy() }
}

module.exports = MusicQueue
