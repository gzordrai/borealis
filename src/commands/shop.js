module.exports = {
    name: 'shop',
    description: "Allows you to recover an average amount of coins ",

    execute(message, args) {

        let author = message.author;
        let emojis = bot.client.guilds.cache.get('733993285323980810').emojis.cache;
        let embed = new bot.Discord.MessageEmbed()
            .setTitle(`Shop`)
            .setColor('BLUE')
            .setFooter(bot.config.footer);

        let items = Object.keys(bot.items.cards);
        let cards = bot.items.cards;

        items.forEach(card => {
            embed.addField(`${emojis.get(cards[card].emoji)} ${card} card`,
            `Price: ${emojis.get(bot.items.coin)} x${cards[card].price}\n Use: ${cards[card].use}`);
        })
        message.channel.send(embed);
    }
}