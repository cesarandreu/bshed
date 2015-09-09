#!/usr/bin/env iojs -r babel/register

import loadModels from '../models'
import * as config from '../config'
import loadSchema from '../db/schema'

import express from 'express'
import graphQLHTTP from 'express-graphql'

const models = loadModels(config.database)
const Schema = loadSchema(models)

const graphQLServer = express()

// import path from 'path'
// graphQLServer.use(express.static(path.resolve(__dirname, '../../graphiql/example/dist')))
// graphQLServer.use('/graphql', graphQLHTTP({ schema: Schema, pretty: true }))

graphQLServer.use('/', graphQLHTTP({ schema: Schema, pretty: true }))
graphQLServer.listen(config.port, () => console.log(`Listening on port ${config.port}`))

// const { User, Bikeshed } = models

// async function doStuff () {
//   const [user] = await User.findAll()
//   console.log('user', user)

//   const [bikeshed] = await Bikeshed.findAll()
//   console.log('bikeshed', bikeshed)
// }
// doStuff()
