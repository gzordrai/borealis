const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'register',
    description: 'Vous permet de créer un compte',
    aliases: ['archives', 'log', 'record', 'annals'],

    execute: (message) => {

        let author = message.author;
        let authorID = author.id;
        let coinEmoji = bot.client.guilds.cache.get('733993285323980810').emojis.cache.get(bot.items.coin);
        let embed = new bot.Discord.MessageEmbed()
        .setColor('BLUE')
        .setFooter(`Please contact the bot by private message if you encounter a problem`)

        if(bot.dbManager.user.isValidAccount(authorID))
            return message.channel.send('You already have an account !');

        bot.dbManager.user.register(authorID);
        embed.setTitle(`${author.username} your account has been created ! You receive ${coinEmoji} x100 coins for your registration`)
        message.channel.send(embed);
    }
}