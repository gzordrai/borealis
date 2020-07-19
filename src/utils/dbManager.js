module.exports = {

    write: () => {
        bot.fs.writeFileSync('./data/database.json', JSON.stringify(bot.data, null, 4), err => {
            if (err) throw err;
        })
    },

    user: {
        register: (userID) => {
            bot.data.users[userID] = {
                balance: 100,
                cooldowns: {},
                items: {}
            }
            bot.dbManager.write();
        },
    
        isValidAccount: (userID) => {
            if(bot.data.users[userID] === undefined)
                return false;
            return true;
        },
    },

    balance: {
        add: (userID, amount) => {
            bot.data.users[userID].balance += amount;
            bot.dbManager.write();
        },

        show: (userID) => {
            return bot.data.users[userID].balance;
        }
    },

    cooldowns: {

    },

    items: {
        add: (userID, name, status, number) => {

            let item = bot.data.users[userID].items[name];
            if(item === undefined){
                item = {
                    raw: 0,
                    refined: 0
                }
            }
            item[status] += number;
            bot.dbManager.write();
        }
    }
}