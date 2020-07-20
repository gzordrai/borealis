module.exports = {
    name: 'help',

    execute(message, args) {

        const { commands } = message.client;
        let embed = new bot.Discord.MessageEmbed()
            .setFooter(bot.config.footer)
            .setColor('BLUE');

        if(!args.length){

            let commandsList = commands.map(command => command.name);
            embed.setTitle('Commands list')
            .setDescription(`For more information on a command: \n${bot.config.prefix}help [command name]`);

            commandsList.forEach(command => {

                if(command === 'help') return;
                if(command === 'ticket' && !message.member.permissions.has('MANAGE_MESSAGES')) return;
                let commandDescription = commands.get(command).description;
                embed.addField(command, commandDescription);

            });

            return message.channel.send(embed);
        }

        let commandName = args[0].toLowerCase();
        let command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(commandName));
        embed.setTitle(`Information on ${bot.config.prefix}${commandName}`);

        if(!command)
            return message.channel.send(`This command does not exist !`);

        if(command.aliases){
            embed.addField('Aliases:', command.aliases.join(', '));
        }

        if(command.description){
            embed.addField('Description:', command.description);
        }

        if(command.usage){
            embed.addField('Usage:', command.usage);
        }

        message.channel.send(embed);

    }
}