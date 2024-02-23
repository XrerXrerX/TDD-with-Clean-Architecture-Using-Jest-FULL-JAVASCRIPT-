/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('threads', {
        id: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(50)',
        },
        body: {
            type: 'TEXT',
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        is_delete: {
            type: 'VARCHAR(7)',
        },
    })
});
};

exports.down = pgm => {
    pgm.dropTable('threads');

};
