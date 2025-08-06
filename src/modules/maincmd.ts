import { Extension, applicationCommand } from '@pikokr/command.ts'
import { EmbedBuilder, ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js'
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class MainModule extends Extension {

    @applicationCommand({
        name: '포인트',
        type: ApplicationCommandType.ChatInput,
        description: '현재 보유한 포인트를 확인해요!',
    })
    async dashboard(i: ChatInputCommandInteraction) {
        const LoadEmbed = new EmbedBuilder()
            .setTitle("포인트 정보를 불러오는 중이에요...")
            .setDescription("-# 서버 상태에 따라 소요 시간이 늘어날 수 있어요!")
        await i.reply({ embeds: [LoadEmbed] })
        await sleep(2000);
        const embed = new EmbedBuilder()
            .setDescription(`**NaN Point**`)
            .setColor(0x3498db)
        await i.editReply({ embeds: [embed] })
    }
}

export const setup = async () => {
    return new MainModule()
}
