const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
//import * as fastAvgColor from 'fast-average-color-node';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Embeds the user\'s avatar.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user whose avatar to send')),
				//.setRequired(true)),
	async execute(interaction) {
		/*
		if (interaction.options.getUser('user')){
		const user = interaction.options.getUser('user');
		}else {
		const user = interaction.user;
		};
		*/

		const avatarEmbed = new EmbedBuilder()
	.setColor(0xbb51d6)
	.setTitle('Avatar')
	//.setURL('https://discord.js.org/')
	.setAuthor({ name: interaction.user.username, /*iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org'*/ })
	.setDescription('Displays the avatar of the specified user')
	//.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	/*.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)*/
	//.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage(interaction.user.displayAvatarURL({size:256, dynamic:true}))
	.setTimestamp()
	//.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		await interaction.reply({embeds: [avatarEmbed]});
		const url = interaction.user.avatarURL();

		//await getAverageColor(url).then(color => {console.log("The colour is: "+color);});
	},
};
