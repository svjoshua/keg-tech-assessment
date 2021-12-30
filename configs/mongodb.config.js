 module.exports = {
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://mongoadmin:secret@localhost:27017',
        db_name: 'goat_db',
        db_collection: 'goat_facts'
    }
}
