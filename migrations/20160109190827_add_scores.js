exports.up = function up (knex, Promise) {
  return knex.schema
  .createTable('scores', t => {
    t.uuid('bike_id').references('bikes.id').index()
    t.uuid('vote_id').references('votes.id').index()
    t.uuid('id').primary().defaultTo(knex.raw(`uuid_generate_v1mc()`))
    t.integer('value')
    t.timestamps()
    t.unique(['vote_id', 'bike_id'])
  })
}

exports.down = function down (knex, Promise) {
  return knex.schema
  .dropTable('scores')
}
