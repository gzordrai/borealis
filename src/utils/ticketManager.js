module.exports = {

    add: (message) => {
        let author = message.author;
        let ticketContent = message.content.split(' ').slice(1).join(' ')
        if(ticketContent === undefined)
            return message.channel.send(`The content of your ticket is invalid !`);
        let ticketNumber = bot.data.tickets.ticketNumber++;
        bot.data.tickets['#' + ticketNumber] = {
            author: {
                id: author.id,
                username: author.username
            },
            content: ticketContent,
            date: new Date()
        }
        bot.dbManager.write();

        let embed = new bot.Discord.MessageEmbed()
        .setAuthor(author.username)
        .setColor('GREEN')
        .addField(`Content:`, ticketContent)
        .setFooter(new Date())

        bot.client.guilds.cache.get('733993285323980810').channels.cache.get('734536953390825513').send(embed);
        message.channel.send(`Your message has been forwarded to staff !`);
    },

    delete: (ticket) => {
        delete ticket;
        bot.dbManager.write();
    },

    list: () => {
        let tickets = Object.keys(bot.data.tickets);
        let embed = new bot.Discord.MessageEmbed()
            .setTitle('List of ticket(s)')
            .setColor('BLUE');
        tickets.forEach(ticket => {
            if(ticket === 'ticketNumber')
                return;
            embed.addField(ticket, bot.data.tickets[ticket].content);
        })
        return embed;
    }
}