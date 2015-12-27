exports.up = function up (knex, Promise) {
  return knex.schema
  .createTable('bikes', t => {
    t.uuid('bikeshed_id').references('bikesheds.id').index()
    t.text('field')
    t.integer('height')
    t.uuid('id').primary().defaultTo(knex.raw(`uuid_generate_v1mc()`))
    t.integer('key')
    t.text('name')
    t.text('mimetype')
    t.integer('size')
    t.integer('width')
    t.timestamps()
  })
}

exports.down = function down (knex, Promise) {
  return knex.schema
  .dropTable('bikes')
}
