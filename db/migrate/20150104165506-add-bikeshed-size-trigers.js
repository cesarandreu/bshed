"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    var sql = [
      'CREATE OR REPLACE FUNCTION bikeshed_size() RETURNS trigger as $bikeshed_size$',
        'DECLARE',
          'max_bikeshed_size INTEGER := 5;',
          'bikeshed_size INTEGER;',
        'BEGIN',
          'PERFORM 1 FROM "Bikesheds" WHERE id = NEW."BikeshedId" FOR UPDATE;',
          'SELECT count(*) INTO bikeshed_size FROM "Bikes" WHERE "BikeshedId" = NEW."BikeshedId";',
          'IF bikeshed_size <= max_bikeshed_size THEN',
            'UPDATE "Bikesheds" SET "size" = bikeshed_size WHERE "id" = NEW."BikeshedId";',
          'ELSE',
            'RAISE EXCEPTION \'cannot insert over % bikes per bikeshed\', max_bikeshed_size;',
          'END IF;',
        'RETURN NEW;',
        'END;',
      '$bikeshed_size$ LANGUAGE plpgsql;',
      'CREATE TRIGGER bikeshed_size AFTER INSERT ON "Bikes"',
        'FOR EACH ROW EXECUTE PROCEDURE bikeshed_size();'
    ].join('\n');

    migration.sequelize.query(sql)
    .then(function () {
      done();
    }, function (err) {
      console.error(err);
      done(err);
    });
  },

  down: function(migration, DataTypes, done) {
    var sql = [
      'DROP TRIGGER IF EXISTS bikeshed_size ON "Bikes";',
      'DROP FUNCTION IF EXISTS bikeshed_size();'
    ].join('\n');

    migration.sequelize.query(sql)
    .then(function () {
      done();
    }, function (err) {
      console.error(err);
      done(err);
    });
  }
};

/*
-- UP
CREATE OR REPLACE FUNCTION bikeshed_size() RETURNS trigger as $bikeshed_size$
  DECLARE
    max_bikeshed_size INTEGER := 5;
    bikeshed_size INTEGER;
  BEGIN
    PERFORM 1 FROM "Bikesheds" WHERE id = NEW."BikeshedId" FOR UPDATE;
    SELECT count(*) INTO bikeshed_size FROM "Bikes" WHERE "BikeshedId" = NEW."BikeshedId";

    IF bikeshed_size <= max_bikeshed_size THEN
      UPDATE "Bikesheds" SET "size" = bikeshed_size WHERE "id" = NEW."BikeshedId";
    ELSE
      RAISE EXCEPTION 'cannot insert over % bikes per bikeshed', max_bikeshed_size;
    END IF;
    RETURN NEW;
  END;
$bikeshed_size$ LANGUAGE plpgsql;

CREATE TRIGGER bikeshed_size AFTER INSERT ON "Bikes"
  FOR EACH ROW EXECUTE PROCEDURE bikeshed_size();
*/

/*
-- DOWN
DROP TRIGGER IF EXISTS bikeshed_size ON "Bikes";
DROP FUNCTION IF EXISTS bikeshed_size();
*/
