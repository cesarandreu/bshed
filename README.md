# bshed

bikeshedding app

## Database

Requires running Postgres. For OSX you can install and run [Postgres.app](http://postgresapp.com/).

## Environment variables

* `NODE_ENV` - application environment
  * Allowed values: `production`, `development`, `test`
  * Default value: `development`

* `DB_USERNAME` - database username
  * Default value: null

### Commands

* `NODE_ENV=(development|test|production) npm run db:create` - creates database for NODE_ENV
* `NODE_ENV=(development|test|production) npm run db:drop` - drops database for NODE_ENV
* `NODE_ENV=(development|test|production) npm run db:migrate` - migrates database for NODE_ENV
* `NODE_ENV=(development|test|production) npm run db:refresh` - runs drop, create, migrate

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

```
User {
  id:string:pk
  name:string:unique
  email:string
  hashedPassword:string

  createdAt:date
  updatedAt:date
}

Bikeshed {
  id:string:pk,
  description:string

  createdAt:date
  updatedAt:date

  UserId:string
}

Bike {
  id:string:pk
  name:string
  size:number
  type:string

  createdAt:date
  updatedAt:date

  BikeshedId:string
}

Vote {
  id:string:pk

  createdAt:date
  updatedAt:date

  UserId:string
  BikeshedId:string
}

Rating {
  id:string:pk
  value:number

  createdAt:date
  updatedAt:date

  BikeId:string
  VoteId:string
}
```

## Testing

**NOTE:** Must have [fake-s3](https://github.com/jubos/fake-s3) installed. All you should need to do is run `gem install fakes3`.

* `NODE_ENV=test npm run db:create`
* `NODE_ENV=test npm run db:migrate`
* `npm run fakes3` in a separate session
* `npm test`

Check coverage by running `NODE_ENV=test npm run test:coverage`

Run specific set of tests with:

* `npm run test:models`
* `npm run test:api`


Drop the testing database with:

* `NODE_ENV=test npm run db:drop`


I'd suggest dropping and recreating the test database for every schema change.

These npm scripts are just aliases for longer node commands, check out `package.json`'s scripts section for the full commands.


## Debugging

**NOTE:** Must have [node-inspector](https://github.com/node-inspector/node-inspector) installed. This can normally done by running `npm install -g node-inspector`.

The following command will allow you to debug, although it's not great for asnyc code.
At least you'll be able to execute expressions and inspect values at different locations.

```sh
NODE_ENV=test node-debug --nodejs --harmony node_modules/.bin/_mocha --require co-mocha test/server/**/*.spec.js
```

Change `test/server/**/*.spec.js` if you don't want it to run all tests.


Run the server with node-inspector using:

```sh
NODE_ENV=development node-debug --nodejs --harmony server/index.js
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

## Workflow

Initial thought was to have one endpoint where you created bikeshed and sent all images at once, but decided against it because then that endpoint would be too big and complicated for my taste. Endpoints should be smaller and simpler.

New idea is to have multiple endpoints and have the bikeshed creation process take multiple steps.

Initially I didn't want users, but having users makes it really easy to apply constraints.

### Bikeshed creation

1. register / sign in
2. create Bikeshed
3. add Bikes (minimum of 2, maximum of 5)
4. open Bikeshed


## Notes

* Avoid folders with uppercase characters because it breaks webpack's file watcher
