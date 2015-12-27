exports.up = function up (knex, Promise) {
  return knex.schema
  .createTable('bikesheds', t => {
    t.integer('duration')
    t.timestamp('ended_at')
    t.timestamp('ended_processing_at')
    t.uuid('id').primary().defaultTo(knex.raw(`uuid_generate_v1mc()`))
    t.text('processing_output')
    t.uuid('request_id')
    t.timestamp('started_at')
    t.timestamp('started_processing_at')
    t.text('status')
    t.text('title')
    t.uuid('user_id').references('users.id')
    t.timestamps()
  })
}

exports.down = function down (knex, Promise) {
  return knex.schema
  .dropTable('bikesheds')
}
