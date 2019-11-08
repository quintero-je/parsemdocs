const { Model, Timestamps } = require('nedb-models');
const path = require('path');

class Docs extends Model {
    static datastore() {
        return {
            filename: path.join(__dirname, '../database/docs.db')
        }
    }
}

Docs.use([Timestamps]);

module.exports = Docs;
