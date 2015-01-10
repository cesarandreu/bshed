CREATE OR REPLACE FUNCTION bikeshed_size() RETURNS trigger as $bikeshed_size$
  DECLARE
    max_bikeshed_size INTEGER := 5;
    bikeshed_size INTEGER;
    bikeshed_status VARCHAR(255);
  BEGIN
    SELECT status INTO bikeshed_status FROM "Bikesheds" WHERE id = NEW."BikeshedId" FOR UPDATE;
    SELECT count(*) INTO bikeshed_size FROM "Bikes" WHERE "BikeshedId" = NEW."BikeshedId";

    IF bikeshed_status != 'incomplete' THEN
      RAISE EXCEPTION 'can only add bikes to incomplete bikeshed';
    ELSIF bikeshed_size > max_bikeshed_size THEN
      RAISE EXCEPTION 'cannot insert over % bikes per bikeshed', max_bikeshed_size;
    ELSE
      UPDATE "Bikesheds" SET "size" = bikeshed_size WHERE "id" = NEW."BikeshedId";
    END IF;
    RETURN NEW;
  END;
$bikeshed_size$ LANGUAGE plpgsql;

CREATE TRIGGER bikeshed_size AFTER INSERT ON "Bikes"
  FOR EACH ROW EXECUTE PROCEDURE bikeshed_size();
