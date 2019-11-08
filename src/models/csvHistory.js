const { Model, Timestamps } = require('nedb-models');
const path = require('path');

class CsvHistory extends Model {
    static datastore() {
        return {
            filename: path.join(__dirname, '../database/csvHistory.db')
        }
    }
}

CsvHistory.use([Timestamps]);

module.exports = CsvHistory;
