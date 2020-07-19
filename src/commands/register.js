const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'register',
    description: 'Vous permet de créer un compte',
    aliases: ['archives', 'log', 'record', 'annals'],

    execute: (message) => {

        let author = message.author;
        let authorID = author.id;
        let coinEmoji = init.client.guilds.cache.get('733993285323980810').emojis.cache.get(init.items.coin);
        let embed = new init.Discord.MessageEmbed()
        .setColor('BLUE')
        .setFooter(`ui`)

        if(init.db.user.isValidAccount(authorID))
            return message.channel.send('You already have an account !');

        init.db.user.register(authorID);
        embed.setTitle(`${author.username} your account has been created ! You receive ${coinEmoji} x100 coins for your registration`)
        message.channel.send(embed);
    }
}