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
            if(!bot.data.users[userID]) return false;
            return true;
        },

        balance: {
            add: (userID, amount) => {
                bot.data.users[userID].balance += amount;
                bot.dbManager.write();
            },
    
            get: (userID) => {
                return bot.data.users[userID].balance;
            }
        },
    
        cooldowns: {
            isOver: (userID, cooldownType, cooldownTime) => {
                let userCooldown = bot.data.users[userID].cooldowns[cooldownType];
                if(userCooldown === undefined) {
                    bot.dbManager.user.cooldowns.update(userID, cooldownType);
                    return {status: true};
                }
                let total = userCooldown - Date.parse(new Date());
                if(total < cooldownTime) {
                    let milliseconds = userCooldown + cooldownTime - Date.parse(new Date());;
                    let convert = bot.dbManager.user.cooldowns.convertMS(milliseconds);
                    return {
                        status: false,
                        hour: convert.hour,
                        minute: convert.minute,
                        seconds: convert.seconds
                    }
                }
                bot.dbManager.user.cooldowns.update(userID, cooldownType);
                return {status: true};
            },

            update: (userID, cooldownType) => {
                let user = bot.data.users[userID];
                user.cooldowns[cooldownType] = Date.parse(new Date());
            },

            convertMS: function(milliseconds) {
                var hour, minute, seconds;
                seconds = Math.floor(milliseconds / 1000);
                minute = Math.floor(seconds / 60);
                seconds = seconds % 60;
                hour = Math.floor(minute / 60);
                minute = minute % 60;
                hour = hour % 24;
                return {
                    hour: hour,
                    minute: minute,
                    seconds: seconds
                };
            },
        },
    
        items: {

            isValidItem: (type, item) => {
                if(!bot.items[type][item]) return false;
                return true;
            },

            get: (userID) => {
                let user = bot.data.users[userID];
                let userItems = Object.keys(user.items);
                let items = [];

                userItems.forEach(item => {
                    items.push([item, `x${user.items[item].number}, total usage: ${user.items[item].usage}`]);
                })
                return items;
            },

            add: (userID, type, name, number, status) => {
                let user = bot.data.users[userID];
                
                switch(type) {
                    case 'minerals':
                        if(!user.items[name]) {
                            user.items[name] = {
                                raw: 0,
                                refined: 0
                            }
                        }
                        user.items[name][status] += number;
                    break;
                    case 'cards':
                        if(!number){
                            number = 1;
                        }
                        if(!user.items[name]) {
                            user.items[name] = {
                                number: 0,
                                usage: 0
                            }
                        }
                        user.items[name].number += number;
                        user.items[name].usage += bot.items.cards[name].usage * number;
                    break;
                }
                bot.dbManager.write();
            }
        }
    },
}