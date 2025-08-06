import { Extension, applicationCommand, listener } from '@pikokr/command.ts'
import { EmbedBuilder, ApplicationCommandType, ChatInputCommandInteraction, GuildMember, Message } from 'discord.js'

class UtillModule extends Extension {
    @applicationCommand({
        name: '핑',
        type: ApplicationCommandType.ChatInput,
        description: '봇의 지연시간을 확인할 수 있어요!',
    })
    async ping(i: ChatInputCommandInteraction) {
        const embed = new EmbedBuilder()
            .setTitle(`🏓 Client : ${i.client.ws.ping}ms`)
            .setColor(0x3498db)
        await i.reply({ embeds: [embed] })
    }

    @applicationCommand({
        name: '대시보드',
        type: ApplicationCommandType.ChatInput,
        description: '대시보드로 이동할 수 있는 링크를 드려요!',
    })
    async dashboard(i: ChatInputCommandInteraction) {
        const embed = new EmbedBuilder()
            .setDescription(`**파란색 부분을 눌러 [대시보드](https://dstat.life/dashboard)로 이동할 수 있어요!**`)
            .setColor(0x3498db)
        await i.reply({ embeds: [embed] })
    }

    @applicationCommand({
        name: '포인트상점',
        type: ApplicationCommandType.ChatInput,
        description: '상점으로 갈 수 있는 링크를 드려요!',
    })
    async pointshop(i: ChatInputCommandInteraction) {
        const embed = new EmbedBuilder()
            .setDescription(`**파란색 부분을 눌러 [포인트 상점](https://dstat.life/shop)으로 이동할 수 있어요!**`)
            .setColor(0x3498db)
        await i.reply({ embeds: [embed] })
    }
}

export const setup = async () => {
    return new UtillModule()
}
