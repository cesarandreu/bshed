exports.up = function up (knex, Promise) {
  return knex.schema
  .createTable('votes', t => {
    t.uuid('bike_id').references('bikes.id').index()
    t.uuid('bikeshed_id').references('bikesheds.id').index()
    t.uuid('id').primary().defaultTo(knex.raw(`uuid_generate_v1mc()`))
    t.uuid('user_id').references('users.id').index()
    t.integer('value')
    t.timestamps()
    t.unique(['bikeshed_id', 'user_id', 'value'])
  })
}

exports.down = function down (knex, Promise) {
  return knex.schema
  .dropTable('votes')
}
