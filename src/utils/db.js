const { italics } = require("../../config/token");

module.exports.user = {

    register: (userID) => {
        init.data.users[userID] = {
            balance: 100,
            cooldowns: {},
            items: []
        }
        init.db.write();
    },

    isValidAccount: (userID) => {
        if(init.data.users[userID] === undefined)
            return false;
        return true;
    },

    write: () => {
        fs.writeFileSync('./data/database.json', JSON.stringify(data, null, 4), err => {
            if (err) throw err;
        })
    },

    balance: {
        add: (userID, amount) => {
            let user = init.data.users[userID];
            if(user === undefined)
                return;
            if(typeof amount !== 'number')
                return;
            user.balance += amount;
            init.db.write();
        },

        show: (userID) => {
            return init.data.users[userID].balance;
        }
    },

    cooldowns: {

    },

    items: {
        add: (userID, name, status, number) => {

            let items = init.data.users[userID].items[name];
            if(items === undefined){
                items = {
                    raw: 0,
                    refined: 0
                }
            }
            items[status] += number;
            init.db.write();
        }
    }
}