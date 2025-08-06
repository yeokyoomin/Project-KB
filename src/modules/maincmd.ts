import { Extension, applicationCommand } from '@pikokr/command.ts'
import { EmbedBuilder, ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js'
//import { eq } from 'drizzle-orm'
import * as mod from '../database/modules'
//import { db } from '../database/db'
//import { users, purchases } from '../database/schema'

class MainModule extends Extension {

    @applicationCommand({
        name: '포인트',
        type: ApplicationCommandType.ChatInput,
        description: '현재 보유한 포인트를 확인해요!',
    })
    async point(i: ChatInputCommandInteraction) {
        if (!await mod.uidindb(i.user.id)) {
            const ErrorEmbed = new EmbedBuilder()
                .setTitle("오류")
                .setDescription("데이터 베이스에서 유저 정보를 찾을 수 없어요.\n[웹사이트](https://dstat.life)에서 먼저 로그인을 진행해 주세요.")
            return i.reply({ embeds: [ErrorEmbed] })
        }
        const LoadEmbed = new EmbedBuilder()
            .setTitle("잠시만 기다려 주세요!")
            .setDescription("-# 서버에서 포인트 정보를 불러오는 중이에요...")
        await i.reply({ embeds: [LoadEmbed] })
        const embed = new EmbedBuilder()
            .setDescription(`**NaN Point**`)
            .setColor(0x3498db)
        await i.editReply({ embeds: [embed] })
    }
}

export const setup = async () => {
    return new MainModule()
}
