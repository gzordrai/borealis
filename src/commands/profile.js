module.exports = {
    name: 'profile',
    aliases: ['character', 'profil', 'myself', 'account'],
    description: 'Vous permet de consulter votre compte',
    usage: '<@user> (optional)',

    execute(message, args) {

        let embed = new bot.Discord.MessageEmbed()
        .setColor('BLUE')
        .setFooter(bot.config.footer);

        if (args[0]) {
            if (args[0].startsWith('<@') && args[0].endsWith('>')) {
                let userID = args[0].slice(2, 20);
                let user = message.guild.members.cache.get(userID).user;
                if(!bot.dbManager.user.isValidAccount(userID))
                    return message.channel.send(`${user.username} does not have an account !`)

                embed.setTitle(`${user.username} account`)
                .setThumbnail(user.avatarURL({dynamic: true}))
                .addField('Balance', bot.dbManager.user.balance.get(userID))
                .addField('\u200B', '\u200B')
                .addField('Items', 'Cards:')
                bot.dbManager.user.items.get(userID).forEach(item => {
                    embed.addField(item[0], item[1]);
                })
            }
        } else {
            let author = message.author;
            let authorID = author.id;

            if(!bot.dbManager.user.isValidAccount(authorID))
                return message.channel.send(`You do not have an account !`)

            embed.setTitle(`${author.username} account`)
                .setThumbnail(author.avatarURL({dynamic: true}))
                .addField('Balance', bot.dbManager.user.balance.get(authorID))
                .addField('\u200B', '\u200B')
                .addField('Items', 'Cards:')

            bot.dbManager.user.items.get(authorID).forEach(item => {
                embed.addField(item[0], item[1]);
            })
        }
        message.channel.send(embed);
    }
}