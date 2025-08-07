/*디스코드 봇의 이벤트를 담당하는 파일이에요!*/
import { Extension, listener } from '@pikokr/command.ts'
import { Message } from 'discord.js'
import { pointedit, ConnectionCheck } from '../database/modules'
class EventModule extends Extension {
  @listener({ event: 'ready' })

  async ready() {
    this.logger.info(`Logged in as ${this.client.user?.tag}`)
    await this.commandClient.fetchOwners()
    this.logger.info(`${await ConnectionCheck()}`)
  }

  @listener({ event: 'applicationCommandInvokeError', emitter: 'cts' })
  async errorHandler(err: Error) {
    this.logger.error(err)
  }

  //메시지 감지
  @listener({ event: 'messageCreate' })
  async onMessage(message: Message) {
    if (message.author.bot) return
    pointedit(Number(message.author.id), 1)
  }
}

export const setup = async () => {
  return new EventModule()
}
