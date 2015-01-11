-- keeps bike.score in sync with votes.value
CREATE OR REPLACE FUNCTION bike_score() RETURNS trigger as $bike_score$
  DECLARE
    vote_value INTEGER;
    bike_id INTEGER;
  BEGIN
    CASE TG_OP
      WHEN 'INSERT' THEN
        bike_id = NEW."BikeId";
        vote_value = NEW."value";
      WHEN 'UPDATE' THEN
        bike_id = NEW."BikeId";
        vote_value = NEW."value" - OLD."value";
      WHEN 'DELETE' THEN
        bike_id = OLD."BikeId";
        vote_value = 0 - OLD."value";
    END CASE;

    UPDATE "Bikes" SET "score" = "score" + vote_value WHERE "id" = bike_id;
    RETURN NEW;
  END;
$bike_score$ LANGUAGE plpgsql;

CREATE TRIGGER bike_score AFTER INSERT OR UPDATE OR DELETE ON "Votes"
  FOR EACH ROW EXECUTE PROCEDURE bike_score();
