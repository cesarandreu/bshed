# Schema

```
bikes {
  bikeshed_id: !uuid
  created_at: !timestamptz
  field: text
  height: int
  *id: !uuid
  key: int
  name: text
  mimetype: text
  size: int
  updated_at: !timestamptz
  width: int
}

bikesheds {
  created_at: !timestamptz
  duration: !int
  ended_at: timestamptz
  ended_processing_at: timestamptz
  *id: !uuid
  processing_output: text
  request_id: uuid
  started_at: timestamptz
  started_processing_at: timestamptz
  status: !text
  title: !text
  user_id: !uuid
  updated_at: !timestamptz
}

users {
  created_at: !timestamptz
  digest: text
  email: text
  *id: !uuid
  name: text
  registered_at: timestamptz
  updated_at: !timestamptz
}

votes {
  bike_id: !uuid
  bikeshed_id: !uuid
  created_at: !timestamptz
  *id: !uuid
  user_id: !uuid
  updated_at: !timestamptz
  value: !int
}
```
