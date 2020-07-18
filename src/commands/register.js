module.exports = {
    name: 'register',
    description: 'Vous permet de créer un compte',
    aliases: ['archives', 'log', 'record', 'annals'],

    execute: (message) => {

        let author = message.author;
        let authorID = author.id;

        if(init.db.user.isValidAccount(authorID))
            return message.channel.send('You already have an account !');

        init.db.user.register(authorID);
        message.channel.send(`${author.username} your account has been created !`);
    }
}