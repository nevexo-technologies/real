const fs = require('node:fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
const { prisma } = require('@real/database');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log("Ready!");
});

client.on("guildMemberAdd", async member => {
    try {
        console.log(`Member ${member.id} joined`);
        let newAmbasador = await prisma.ambasador.create({
            data: {
                discordName: member.displayName,
                discordId: member.id,
            }
        });

        let refCode = `AMB${("000" + (newAmbasador.id)).slice(-3)}`;

        member.send(`Bună, ${member.displayName}!\n
        Bine ai venit în Registrul Educațional Alternativ! Ne bucurăm că ai ales să ni te alături ca ambasador și sperăm că împreună vom reuși să ajutăm cât mai mulți viitori liceeni!\n
        Poți intra pe acest link: https://estereal.ro/bine-ati-venit-ambasadori/, unde ai o descriere mai pe larg a proiectului și instrucțiuni pentru câteva activități pe care le poți face chiar acum!\n
        Când vom începe colectarea răspunsurilor pentru chestionarul REAL, te rugăm să folosești acest link: https://formular.estereal.ro/?ref=${refCode} pentru a îl da mai departe. Este link-ul tău personal, iar cu ajutorul lui vom ști cât de multe completări ai adus! Fiecare completare a chestionarului făcută de pe link-ul tău valorează x puncte. Ambasadorii care au strâns cele mai multe puncte vor fi premiați la Gala REAL, care se va desfășura la finalul lunii mai.\n
        În rest, poți oricând să lași întrebări pe canalul general sau în privat la unul din membrii echipei.\n
        Te așteptăm pe server!\n
        #estereal\n`);

        console.log(`Sent newcomer message for ${member.id}.`);
    }
    catch (err) {
        if (err.code && err.code === "P2002") {
            member.send(`Bine ai revenit, ${member.displayName}!\nCând vom începe colectarea răspunsurilor pentru chestionarul REAL, te rugăm să folosești acest link: https://formular.estereal.ro/?ref=${refCode} pentru a îl da mai departe.`);
            console.log(`Resent (partial) newcomer message for ${member.id}.`);
        }
    }
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