exports.up = function up (knex, Promise) {
  return knex.schema
  .createTable('users', t => {
    t.text('digest')
    t.text('email')
    t.uuid('id').primary().defaultTo(knex.raw(`uuid_generate_v1mc()`))
    t.text('name')
    t.timestamp('registered_at')
    t.timestamps()
  })
}

exports.down = function down (knex, Promise) {
  return knex.schema
  .dropTable('users')
}
