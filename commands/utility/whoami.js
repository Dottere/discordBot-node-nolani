const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whoami')
		.setDescription('Who used this command?'),
	async execute(interaction) {
		await interaction.reply(`User tag: ${interaction.user.tag}\nGlobal name: ${interaction.user.globalName}\nID: ${interaction.user.id}\nJoin date: ${interaction.user.createdAt.toLocaleString()}`);
	},
};
