const fs = require('fs');
const Discord = require('discord.js');

//Create a client and make a commands list
const client = new Discord.Client();
client.commands = new Discord.Collection();

bot = {
    fs: fs,
    Discord: Discord,
    client: client,
    config: { prefix } = require('./config/config.js'),
    data: JSON.parse(fs.readFileSync('./data/database.json', 'utf8')),
    dbManager: require('./src/utils/dbManager.js'),
    items: require('./data/items.json')
}

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`${file} has been loaded !`)
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

//Verify if the author of the message is not the bot and if the message starts with the prefix
if (!message.content.startsWith(prefix) ||
    message.author.bot) return;

//Remove the prefix from the beginning of the message
const args = message.content.slice(prefix.length).split(' ');
const commandName = args.shift().toLowerCase();

//Aliases part
//Verify if the command has been declared or if an command alias is included
const command = client.commands.get(commandName) ||
client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if (!command) return;

//Args part
//Verify if the command take an argument and if the argument has been declared
if (command.args && !args.length) {
    let reply = `No arguments were provided !`;
    if (command.usage) {
    reply += `\n The correct usage would be : \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
}

//Try to execute the command, if an error has occurred the command execution is canceled
try {
    command.execute(message, args)
} catch (error) {
    console.error(error);
    message.reply("An error occurred while executing the command! Please contact a manager");
}
});

//Client connection
client.login(token);