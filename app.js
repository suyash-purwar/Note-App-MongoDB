const note = require('./note');
const yargs = require('yargs');

const titleOptions = {
    alias: 't',
    desc: 'Title of a note'
};

const bodyOptions = {
    alias: 'b',
    desc: 'Body of a note'
};

const completedOptions = {
    alias: 'c',
    desc: 'Status of completion'
};

const command = yargs.argv._[0];

const argv = yargs
    .command('write', 'Writes a new note', {
        title: Object.assign({}, titleOptions, {demand: true}),
        body: Object.assign({}, bodyOptions, {demand: true}),
        completed: Object.assign({}, completedOptions, {default: undefined})
    })
    .command('read', 'Reads the note', {
        title: Object.assign({}, titleOptions, {demand: true})
    })
    .command('update', 'Updates the document', {
        title: Object.assign({}, titleOptions, {default: null}),
        body: Object.assign({}, bodyOptions, {default: null}),
        completed: Object.assign({}, completedOptions, {default: undefined})
    })
    .command('delete', 'Deletes the document', {
        title: Object.assign({}, titleOptions, {demand: true})
    })
    .command('list', 'Lists all notes')
    .command('count', 'Counts all the notes')
    .help().argv;


returnUpdateOptions = () => {
    const args = [];
    if (argv.title.trim() !== null) {
        args.push({title: argv.title.trim()});
    }

    if (argv.body.trim() !== null) {
        args.push({body: argv.body.trim()});
    }

    if (argv.completed !== undefined) {
        args.push({completed: argv.completed.trim()});
    } else {
        argv.push({completed: "false"});
    }

    return args;
}

if (command === 'write') {
    note.write(argv.title, argv.body, argv.completed);
} else if (command === 'read') {
    note.read(argv.title);
} else if (command === 'update') {
    const updateNoteName = yargs.argv._[1];
    const noteData = returnUpdateOptions();
    note.update(updateNoteName, noteData);
}
