exports.up = function up (knex, Promise) {
  return knex.schema
  .createTable('votes', t => {
    t.uuid('bikeshed_id').references('bikesheds.id').index()
    t.uuid('id').primary().defaultTo(knex.raw(`uuid_generate_v1mc()`))
    t.uuid('user_id').references('users.id').index()
    t.timestamps()
    t.unique(['user_id', 'bikeshed_id'])
  })
}

exports.down = function down (knex, Promise) {
  return knex.schema
  .dropTable('votes')
}
