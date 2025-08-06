import { config } from '../config'
import {
  CommandClient,
  Extension,
  applicationCommand,
  ownerOnly,
} from '@pikokr/command.ts'
import { ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js'
import path from 'path'

class DevModule extends Extension {
  @applicationCommand({
    type: ApplicationCommandType.ChatInput,
    name: '리로드',
    description: '명령어를 다시 불러와요! (개발용)',
  })
  async reload(i: ChatInputCommandInteraction) {
    await i.deferReply()
    const result = await this.commandClient.registry.reloadModules()
    await i.editReply(
      `Succeed: ${result.filter((x) => x.result).length} Error: ${result.filter((x) => !x.result).length
      }`
    )
  }
}

export class CustomizedCommandClient extends CommandClient {
  async setup() {
    await this.enableApplicationCommandsExtension({ guilds: config.guilds })
    await this.registry.registerModule(new DevModule())

    await this.registry.loadAllModulesInDirectory(
      path.join(__dirname, '..', 'modules')
    )
  }
}
