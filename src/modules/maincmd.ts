import { Extension, applicationCommand, option, listener } from '@pikokr/command.ts'
import {
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    User,
    EmbedBuilder,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    ApplicationCommandOptionType,
    ActionRowBuilder,
    Interaction
} from 'discord.js'
import * as mod from '../database/modules'

const UNKNOWN_USER = new EmbedBuilder()
    .setTitle("오류")
    .setDescription("데이터베이스에서 유저 정보를 찾을 수 없어요.\n[웹사이트](https://dstat.life)에서 먼저 로그인을 진행해 주세요.")

class InfoModule extends Extension {
    @applicationCommand({
        name: '정보',
        type: ApplicationCommandType.ChatInput,
        description: '유저의 정보를 확인할 수 있어요!',
    })
    async info(
        @option({
            name: '유저',
            description: '정보를 확인할 유저를 선택해요',
            type: ApplicationCommandOptionType.User,
            required: false,
        })
        user: User | null,
        i: ChatInputCommandInteraction
    ) {
        const targetUserId = user ?? i.user.id
        let targetUser
        try {
            targetUser = await i.client.users.fetch(targetUserId)
        } catch {
            targetUser = i.user
        }
        if (!(await mod.uidindb(targetUser.id))) {
            return i.reply({ embeds: [UNKNOWN_USER], ephemeral: true })
        }

        const loadingEmbed = new EmbedBuilder()
            .setTitle("잠시만 기다려 주세요!")
            .setDescription("-# 서버에서 유저 정보를 불러오는 중이에요...")

        await i.reply({ embeds: [loadingEmbed] })

        const pointloader = (await mod.userpoint(targetUser.id)) ?? 0
        const invenloader = await mod.userinven(targetUser.id)

        if (!invenloader || invenloader.length === 0) {
            return i.editReply({
                content: '보유한 아이템이 없어요!',
                embeds: [],
                components: []
            })
        }

        const homeOption = new StringSelectMenuOptionBuilder()
            .setLabel('정보')
            .setDescription(`보유 포인트 : ${pointloader} | 보유 exp : 데이터를 찾을 수 없어요.`)
            .setValue('info')

        const itemOptions = invenloader.map(itemId =>
            new StringSelectMenuOptionBuilder()
                .setLabel(`${itemId}`)
                .setDescription(`그냥 설명이에요...`)
                .setValue(String(itemId))
        )

        const allOptions = [homeOption, ...itemOptions]

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(`starter_${i.user.id}`)
            .setPlaceholder('이곳을 클릭하여 메뉴를 선택하세요')
            .addOptions(allOptions)

        const newEmbed = new EmbedBuilder()
            .setTitle(`${targetUser.username}님의 정보`)
            .setDescription(`**포인트** : ${pointloader}포인트 \n **exp** : 데이터를 찾을 수 없어요.`)

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu)

        return i.editReply({ embeds: [newEmbed], components: [row] })
    }

    @listener({ event: 'interactionCreate' })
    async onInteraction(interaction: Interaction) {
        if (!interaction.isStringSelectMenu()) return
        if (!interaction.customId.startsWith('starter_')) return

        const ownerId = interaction.customId.split('_')[1]

        if (interaction.user.id !== ownerId) {
            return interaction.reply({
                content: '이 메뉴는 당신을 위한 메뉴가 아닙니다.',
                ephemeral: true,
            })
        }

        const selectedValue = interaction.values[0]

        if (selectedValue === 'info') {
            const targetUser = await interaction.client.users.fetch(ownerId)
            const pointloader = (await mod.userpoint(ownerId)) ?? 0
            const embed = new EmbedBuilder()
                .setTitle(`${targetUser.username}님의 정보`)
                .setDescription(`**포인트** : ${pointloader}포인트 \n **exp** : 데이터를 찾을 수 없어요.`)
            await interaction.update({
                embeds: [embed],
                components: interaction.message.components
            })
        } else {
            const embed = new EmbedBuilder()
                .setTitle(`${selectedValue}`)
                .setDescription(`상세 정보를 불러올 수 없어요..`)
            await interaction.update({
                embeds: [embed],
                components: interaction.message.components
            })
        }
    }
}

export const setup = async () => {
    return new InfoModule()
}
