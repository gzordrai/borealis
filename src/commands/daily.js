module.exports = {
    name: 'daily',
    description: "Allows you to recover an average amount of coins ",
    aliases: ['quotidian', 'diurnal', 'routine'],

    execute(message, args) {

        let authorID = message.author.id;
        let coinEmoji = bot.client.guilds.cache.get('733993285323980810').emojis.cache.get(bot.items.coin);
        
        let embed = new bot.Discord.MessageEmbed()
            .setColor('GREEN')
            .setFooter(bot.config.footer);

        if(!bot.dbManager.user.isValidAccount(authorID))
            return message.channel.send(`You don't have an account !`);

        let timeRemaining = bot.dbManager.user.cooldowns.isCooldownOver(authorID, 'daily', 72000000);
        if(!timeRemaining.status)
            return message.channel.send(`Please wait ${timeRemaining.hour}H ${timeRemaining.minute}M ${timeRemaining.seconds}`);

        let reward = bot.rand.int(0, 200);
        bot.dbManager.user.balance.add(authorID, reward)

        embed.setTitle(`You found ${coinEmoji} x${reward}`)
        message.channel.send(embed);
    },
};