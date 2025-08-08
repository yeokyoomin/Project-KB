import { Extension, applicationCommand, option } from '@pikokr/command.ts'
import { User, EmbedBuilder, ApplicationCommandType, ChatInputCommandInteraction, ApplicationCommandOptionType } from 'discord.js'
import * as mod from '../database/modules'
//디스코드 명령어 임베드
const UNKNOWN_USER = new EmbedBuilder()
    .setTitle("오류")
    .setDescription("데이터베이스에서 유저 정보를 찾을 수 없어요.\n[웹사이트](https://dstat.life)에서 먼저 로그인을 진행해 주세요.")

class MainModule extends Extension {
    @applicationCommand({
        name: '포인트',
        type: ApplicationCommandType.ChatInput,
        description: '현재 보유한 포인트를 확인해요!',
    })
    async point(@option({
        name: '유저',
        description: '포인트를 확인할 유저를 선택해요',
        type: ApplicationCommandOptionType.User,
        required: false,
    })
    user: User,
        i: ChatInputCommandInteraction
    ) {
        let targetUser = user ?? i.user.id;
        if (!await mod.uidindb(String(targetUser))) {
            return i.reply({ embeds: [UNKNOWN_USER] })
        } else {
            const LoadEmbed = new EmbedBuilder()
                .setTitle("잠시만 기다려 주세요!")
                .setDescription("-# 서버에서 포인트 정보를 불러오는 중이에요...")
            await i.reply({ embeds: [LoadEmbed] })
            const pointloader = await mod.userpoint(String(targetUser))
            const embed = new EmbedBuilder()
                .setDescription(`**${pointloader} Point**`)
                .setColor(0x3498db)
            await i.editReply({ embeds: [embed] })
        }
    }
    @applicationCommand({
        name: '인벤토리',
        type: ApplicationCommandType.ChatInput,
        description: '인벤토리를 확인해요',
    })
    async inventory(i: ChatInputCommandInteraction) {
        if (!await mod.uidindb(String(i.user.id))) {
            return i.reply({ embeds: [UNKNOWN_USER] })
        } else {
            const LoadEmbed = new EmbedBuilder()
                .setTitle("잠시만 기다려 주세요!")
                .setDescription("-# 서버에서 포인트 정보를 불러오는 중이에요...")
            await i.reply({ embeds: [LoadEmbed] })
            const invenloader = await mod.userinven(String(i.user.id))
            console.log(invenloader)
            const embed = new EmbedBuilder()
                .setDescription(`${invenloader}`)
                .setColor(0x3498db)
            await i.editReply({ embeds: [embed] })
        }
    }
}

export const setup = async () => {
    return new MainModule()
}
