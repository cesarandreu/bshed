# bshed

bikeshedding app

## Application

* Vote is a value 0 to N where N is (Bikeshed.bikes.length - 1). If you have 2 bikes, each time someone votes it'll create two votes. One vote with score 1 and one vote with score 0.

## Database

Requires running Postgres. For OSX you can install and run [Postgres.app](http://postgresapp.com/).

### Commands

* `NODE_ENV=(development|test|production) npm run db:create`
* `NODE_ENV=(development|test|production) npm run db:drop`
* `NODE_ENV=(development|test|production) npm run db:migrate`
* `NODE_ENV=(development|test|production) npm run db:refresh` - runs drop, create, migrate

### Relations

* User has many Bikesheds
* User has many Votes
* Bikeshed has one User
* Bikeshed has many Bikes
* Bikeshed has many Votes
* Bike has many Votes
* Bike belongs to Bikeshed
* Vote belongs to Bikeshed
* Vote belongs to Bike
* Vote belongs to User

### Schema

```
User {
  id:integer:pk,
  administrator:boolean,
  name:string,
  email:string,
  hashedPassword:string,

  createdAt:date,
  updateAt:date,
  deletedAt:date
}

Bikeshed {
  id:integer:pk,
  name:string,
  body:text,
  published:boolean,
  publishedAt:date,

  createdAt:date,
  updatedAt:date,
  deletedAt:date,

  UserId:integer
}

Bike {
  id:integer:pk,
  name:string,
  body:text,
  imageLink:string,
  imageType:string,

  createdAt:date,
  updatedAt:date,
  deletedAt:date

  BikeshedId:integer
}

Vote {
  id:integer:pk,
  value:integer,

  createdAt:date,
  updatedAt:date,
  deletedAt:date,

  BikeshedId:integer,
  BikeId:integer,
  UserId:integer
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

**Downloads:**

* Set `X-Content-Type-Options: nosniff` header

## Workflow

Initial thought was to have one endpoint where you created bikeshed and sent all images at once, but decided against it because then that endpoint would be too big and complicated for my taste. Endpoints should be smaller and simpler.

New idea is to have multiple endpoints and have the bikeshed creation process take multiple steps.

Initially I didn't want users, but having users makes it really easy to apply constraints.

### Bikeshed creation

1. register / sign in
2. create Bikeshed by declaring title
3. add images (minimum of 2, maximum of 5) and publish


