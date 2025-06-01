/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.alterTable('words', (table) => {
        table.dropColumns('user_id');
        table.string('category').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
	await knex.schema.alterTable('words', (table) => {
		table.integer('user_id')
		table.foreign('user_id').references('users.id');
	});
};
