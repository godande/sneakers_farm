require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const config = require('./config/shopConfig')
const awilix = require('../src/container')


const container = awilix.cradle
const Boostrap = container.Boostrap
Boostrap.assosiate()
Boostrap.loadClasses()

test('Prices from Stockx are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.Stockx.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)
})

test('Prices from UrbanNecessities are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.UrbanNecessities.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)
})

test('Prices from Stadiumgoods are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.Stadiumgoods.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)

})

test('Prices from Solesupremacy are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.Solesupremacy.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)
})

test('Prices from Solestage are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.Solestage.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)
})

test('Prices from Klekt are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.Klekt.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)
})

test('Prices from Goat are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.Goat.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)
})

test('Prices from Flightclub are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.Flightclub.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)
})

test('Prices from Farfetch are parserd',async ()=>{
  let prices = await container.Parser.resolvePrice(config.Farfetch.href, 'ee7287')
  prices = prices.prices
  expect(prices.length).toBeGreaterThan(1)
})
