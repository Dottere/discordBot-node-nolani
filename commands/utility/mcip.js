const { SlashCommandBuilder } = require('discord.js');

async function myip() {
  return new Promise((resolve,reject) => {
    fetch('https://ipecho.io/json')
    .then(res => res.json())
    .then(res => resolve(res.ip))
    .catch(err => reject(err));        
  })
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mcip')
		.setDescription('Replies with the minecraft server\'s current IP address!'),
	async execute(interaction) {
		const ip = await myip();
		console.log("Your IP address is: ", ip);
		let response = "The server's address is: " + ip;
		await interaction.reply(response)
	},
};
