const { Model, Timestamps, Encryption } = require('nedb-models');
const path = require('path');

class User extends Model {
    static datastore() {
        return {
            filename: path.join(__dirname, '../database/users.db')
        }
    }
}

User.use([Timestamps, Encryption]);

module.exports = User;
