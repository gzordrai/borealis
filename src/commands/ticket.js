module.exports = {
    name: 'ticket',
    description: 'Allows you to manage tickets',

    execute: (message, args) => {

        let author = message.author;
        let embed = new bot.Discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor(author.username)
        .setFooter(new Date())

        if(!message.member.permissions.has('ADMINISTRATOR') &&
            message.guild.id !== '733993285323980810')
            return message.channel.send(`You cannot use this command !`);

        if(args[0] === undefined && args[1] === undefined)
            return message.channel.send('Invalid argument !');

        let ticket = bot.data.tickets[args[1]];

        switch(args[0]) {
            case 'delete':

                if(!args[1].startsWith('#') && ticket === undefined)
                    return message.channel.send('Invalid argument !');

                bot.ticketManager.delete(ticket);
                message.channel.send('Ticket successfully deleted !');

            break;
            case 'reply':

                if(!args[1].startsWith('#') && ticket === undefined)
                    return message.channel.send('Invalid argument !');

                let answer = message.content.split(' ').slice(3).join(' ');
                embed.addField(`Answer:`, answer);
                bot.client.users.cache.get(ticket.author.id).send(embed);
                message.channel.send('Response successfully sent !');

            break;
            case 'list':

                message.channel.send(bot.ticketManager.list());

            break;
        }
    }
}