# bshed

bikeshedding app

## Database

Requires running Postgres. For OSX you can install and run [Postgres.app](http://postgresapp.com/).

To setup the database for development run:

```sh
$ npm run db:refresh
```

## Environment variables

* `NODE_ENV` - application environment
  * Allowed values: `production`, `development`, `test`
  * Default value: `development`

* `DB_USERNAME` - database username
  * Default value: null

## Commands

All commands are runnable by with `npm run [command]`, for example: `npm run db:refresh`

* `db:create` - creates database for NODE_ENV
* `db:drop` - drops database for NODE_ENV
* `db:migrate` - migrates database for NODE_ENV
* `db:refresh` - runs drop, create, migrate
* `fakes3` - run fakes3 with testing / development options
* `test` - run all tests
* `test:api` - run all API tests
* `test:model` - run all model tests

## Models

### Relations

* User has many bikesheds
* User has many votes
* Bikeshed belongs to user
* Bikeshed has many bikes
* Bikeshed has many votes
* Bike belongs to bikeshed
* Bike has many ratings
* Vote belongs to bikeshed
* Vote belongs to user
* Vote has many ratings
* Rating belongs to bike
* Rating belongs to vote

### Schema

All models have `createdAt:date` and `updatedAt:date`

```
User {
  id:uuid:pk
  name:string
  email:string:unique
  hashedPassword:string
}

Bikeshed {
  id:uuid:pk,
  description:string

  UserId:uuid
}

Bike {
  id:uuid:pk
  name:string
  size:number
  type:string

  BikeshedId:uuid
}

Vote {
  id:uuid:pk

  UserId:uuid
  BikeshedId:uuid
}

Rating {
  id:uuid:pk
  value:number

  BikeId:uuid
  VoteId:uuid
}
```

## Tests

**NOTE:** Must have [fake-s3](https://github.com/jubos/fake-s3) installed. All you typically need to do is run `gem install fakes3` and you'll get it.

### Running tests

First, in a separate session

```sh
$ npm run fakes3
```

After you have fakes3 running, run the following

```sh
$ NODE_ENV=test npm run db:refresh
$ npm run test
```

## Scripts

* `node scripts/secret` - generate an app secret (ripped from `rake secret`)

## Notes

### Image uploads

#### Performance

Uploads should go directly to S3, that'd be a lot more efficient than having this server do everything. I know that S3 allows direct uploads with a key, but I'm not sure if that feature is available on S3 alternatives or if it would work with fakes3 (probably not). Not doing this because it complicates testing.

#### Security

Allowing image uploads and downloads requires taking some precautions to prevent attacks. Gonna have to do some research on other safety precautions.

**Uploads:**

* Applying size limits per file (i.e. combination of all files should not pass 5MB)
* Applying total file limits (i.e. you cannot upload more than 5 images)
* Limit MIME type to popular formats (i.e. only allow image/png and image/jpeg, maybe image/gif)
* Check [file-type](https://github.com/sindresorhus/file-type), or even better, [image-type](https://github.com/sindresorhus/image-type)!

**Downloads:**

* Set `X-Content-Type-Options: nosniff` header
