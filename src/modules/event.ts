import { Extension, listener } from '@pikokr/command.ts'
import { Message } from 'discord.js'

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
}

export const setup = async () => {
  return new EventModule()
}
