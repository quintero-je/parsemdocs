const { Model, Timestamps } = require('nedb-models');
const path = require('path');

class DocsHistory extends Model {
    static datastore() {
        return {
            filename: path.join(__dirname, '../database/docsHistory.db')
        }
    }
}

DocsHistory.use([Timestamps]);

module.exports = DocsHistory;
