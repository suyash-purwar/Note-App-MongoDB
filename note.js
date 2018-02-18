const {MongoClient, ObjectId} = require('mongodb');

printNote = data => console.log(`---- \n${JSON.stringify(data, undefined, 3)}`);
printError = (error) => console.log(`Unable to connect to mongoDB server \n${error}`);

module.exports.write = (title, body, completed) => {
    MongoClient.connect('mongodb://localhost:27017/Notes', (error, db) => {
        if (error) {
           printError(error);
        } else {
            console.log('Connected to mongodb server');
            db.collection('Note').insertOne({title, body, completed}, (err, result) => {
                if (err) {
                    console.log('Unable to write a new note');
                } else {
                    console.log('Added note');
                    printNote(result.ops);
                }
            })
            db.close();
        }
    });
}

module.exports.read = (title) => {
    MongoClient.connect('mongodb://localhost:27017/Notes', (error, db) => {
        if (error) {
            printError(error);
        } else {
            db.collection('Note')
                .find({title})
                .toArray()
                .then(doc => {
                    if (doc.length === 0) {
                        console.log('Note not found');
                    } else {
                        console.log('Note found');
                        printNote(doc);
                    }
                });

            db.close();
        }
    });
};

module.exports.update = (updateNoteName, noteData) => {
    console.log(updateNoteName);
    MongoClient.connect('mongodb://localhost:27017/Notes', (error, db) => {
        if (error) {
            printError(error);
        } else {
            noteData.forEach(key => {
                db.collection('Notes').findOneAndUpdate({
                    title: updateNoteName
                }, {
                    $set: key
                }, {
                    returnOriginal: true
                }).then(doc => {
                    console.log('Note is updated');
                    printNote(doc);
                }, error => {
                    console.log('Unable to find note');
                });

                db.close();
            });
        }
    });
}
