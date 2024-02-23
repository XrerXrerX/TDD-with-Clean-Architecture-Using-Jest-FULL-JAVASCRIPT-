/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        threadid: {
            type: 'VARCHAR(50)',
            refrences: 'threads(id)',  // Menunjukkan foreign key ke tabel threads
            notnull: true,
            onDelete: 'CASCADE',// Tambahkan opsi ON DELETE CASCADE di sini
        },
        content: {
            type: 'TEXT',
            notnull: true,
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
};

exports.down = pgm => {
    pgm.dropTable('comments');
};
