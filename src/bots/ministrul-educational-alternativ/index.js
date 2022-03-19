const fs = require('node:fs');
const path = require('path');
const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log("Ready!");
});

client.on("guildMemberAdd", member => {
    member.guild.channels.get('951520741315190814').send(`Welcome ${member.nickname}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.log(error);
        await interaction.reply({ content: 'Oops.. a aparut o eroare', ephemeral: true });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);