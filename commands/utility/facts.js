const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('facts')
		.setDescription('Tells you pure facts!'),
	async execute(interaction) {
		await interaction.reply('Kai is very cute');
	},
};
