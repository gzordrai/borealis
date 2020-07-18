module.exports.user = {

    register: (userID) => {
        init.data.users[userID] = {
            balance: 100,
            cooldowns: {},
            items: {}
        }
    },

    isValidAccount: (userID) => {
        if(init.data.users[userID] === undefined)
            return false;
        return true;
    },

    balance: {
        add: (userID, amount) => {
            if(init.data.users[userID] === undefined)
                return;
            if(typeof amount !== 'number')
                return;
            init.data.users[userID].balance += amount;
        },

        show: (userID) => {
            return init.data.users[userID].balance;
        }
    },

    cooldowns: {

    },

    items: {
        add: (userID, name, number, statut) => {
            if(init.data.users[userID] === undefined)
                return;
            if(typeof name !== 'string')
                return;
            if(typeof number !== 'number')
                return;
            if(typeof statut !== 'string')
                return;
            if(init.data.users[userID].items[name] === undefined) {
                init.data.users[userID].items[name] = {
                    number: number,
                    statut: statut,
                }
            } else {
                init.data.users[userID].items[name].number += number
            }
        }
    }
}