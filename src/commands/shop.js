module.exports = {
    name: 'shop',
    description: "Allows you to recover an average amount of coins.",
    usage: '<buy> <card rarity> <number (optional)> \n <sell> <mineral> <number/all>',

    execute(message, args) {

        let author = message.author;
        let authorID = author.id;
        let emojis = bot.client.guilds.cache.get('733993285323980810').emojis.cache;
        let user = bot.dbManager.user;
        let number, rarety;
        let embed = new bot.Discord.MessageEmbed()
            .setTitle(`Shop`)
            .setColor('BLUE')
            .setDescription('`You can also purchase items from the store with the command specified in /help shop`')
            .setFooter(bot.config.footer);

        if(args[0]) {
            switch(args[0]) {
                case 'buy':

                    if(!args[1])
                        return message.channel.send('Missing argument !');

                    rarety = args[1].toLowerCase();

                    if(!user.items.isValidItem('cards',  rarety))
                        return message.channel.send('This rarity does not exist !');
                        
                    if(!args[2]){
                        number = 1;
                    } else {
                        if(!Number.isInteger(parseInt(args[2])))
                            return message.channel.send(`${args[2]} is not a number !`);
                        number = parseInt(args[2]);
                    }

                    let price = bot.items.cards[rarety].price * number;
                    if(user.balance.get(authorID) < price)
                        return message.channel.send(`You don't have enough ${emojis.get(bot.items.coin)} to buy this`);

                    bot.dbManager.user.items.add(authorID, 'cards', rarety, number);
                    bot.dbManager.user.balance.add(authorID, -price);
                    message.channel.send(`${number}x ${rarety} card purchased successfully !`);

                break;
                case 'sell':



                break;
            }
        } else {

            let items = Object.keys(bot.items.cards);
            let cards = bot.items.cards;

            items.forEach(card => {
                embed.addField(`${emojis.get(cards[card].emoji)} ${card} card`,
                `Price: ${emojis.get(bot.items.coin)} x${cards[card].price}\n Use: ${cards[card].usage}`);
            })
            message.channel.send(embed);
        }
    }
}