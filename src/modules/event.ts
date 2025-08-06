import { Extension, listener } from '@pikokr/command.ts'
import { GuildMember, Message } from 'discord.js'

class EventModule extends Extension {
  @listener({ event: 'ready' })

  async ready() {
    this.logger.info(`Logged in as ${this.client.user?.tag}`)
    await this.commandClient.fetchOwners()
  }

  @listener({ event: 'applicationCommandInvokeError', emitter: 'cts' })
  async errorHandler(err: Error) {
    this.logger.error(err)
  }

  @listener({ event: 'messageCreate' })
  async onMessage(message: Message) {
    if (message.author.bot) return
    console.log(`[MSG] ${message.guild?.name || 'DM'} | #${message.channel?.toString()} | ${message.author.tag}, ${message.author.id}: ${message.content}`)
  }

  @listener({ event: 'guildMemberAdd' }) /*새로운 유저가 들어오면 유저 역할 적용*/
  async onMemberJoin(member: GuildMember) {
    const roleId = '1402583759353544765'
    const role = member.guild.roles.cache.get(roleId)
    if (!role) {
      this.logger.warn(`역할이 변경되었거나 찾을 수 없어요 : ${roleId}`)
      return
    }
    try {
      await member.roles.add(role)
    } catch (err) {
      this.logger.error(`역할 지급 실패 : `, err)
    }
  }
}

export const setup = async () => {
  return new EventModule()
}
