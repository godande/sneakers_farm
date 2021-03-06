require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const awilix = require('../src/container')
const sneakerConfig = require('./config/sneakerConfig')
const DefaultSneakerFactory = require('./factories/DefaultSneaker')


const container = awilix.cradle
const Boostrap = container.Boostrap
Boostrap.assosiate()
Boostrap.loadClasses()


describe('When sneaker created',()=>{
  beforeEach(async ()=>{

    const sneaker = await DefaultSneakerFactory(container)
  })

  test('Prices is populated properly',async ()=>{
    const sneaker = await container.sneakersRepository.populate( {sneaker_id:sneakerConfig.sneaker_id}, {include :  [{ model:'prices', as: 'prices'}], limit: 1 } )
    expect(sneaker.prices.length).toEqual(3)
  })

  test('Hrefs is populated properly',async ()=>{
    const sneaker = (await container.sneakersRepository.populate( {sneaker_id:sneakerConfig.sneaker_id}, {include :  [{ model:'hrefs', as: 'hrefs'}], limit: 1 } ))
    expect(sneaker.hrefs.length).toEqual(3)
  })

  test('Other properties are populated properly',async ()=>{
    const sneaker = (await container.sneakersRepository.populate( {sneaker_id:sneakerConfig.sneaker_id}, { include:  [
      { model:'description', as: 'description'},
      { model:'extended', as: 'extended'},
      { model:'brands', as: 'brands'},
      { model:'model', as: 'model'},
      { model:'image', as: 'image'}
    ],
      limit: 1
    }))

    expect(sneaker.description).not.toBeNull()
    expect(sneaker.brands).not.toBeNull()
    expect(sneaker.model).not.toBeNull()
    expect(sneaker.extended).not.toBeNull()
    expect(sneaker.image).not.toBeNull()
  })

  test('Sneakers are populated from description',async ()=>{
    const description = await container.descriptionsRepository.populate(sneakerConfig.description,{include: [{ model:'sneakers', as: 'sneakers'}], limit: 1})
    expect(description.sneakers).not.toBeNull()
  })

  test('Sneakers are populated from brand',async ()=>{
    const brand = await container.brandsRepository.populate(sneakerConfig.brands[0],{ include: [{ model:'sneakers', as: 'sneakers'}], limit: 1})
    expect(brand.sneakers).not.toBeNull()
  })

  test('Sneakers are populated from model',async ()=>{
    const model = await container.modelsRepository.populate(sneakerConfig.model,{ include: [{ model:'sneakers', as: 'sneakers'}], limit:1})
    expect(model.sneakers).not.toBeNull()
  })

  test('Sneakers are populated from price',async ()=>{
    const price = await container.pricesRepository.populate(sneakerConfig.prices[0],{ include: [{model:'sneaker', as: 'sneaker'}], limit:1})
    expect(price.sneaker).not.toBeNull()
  })

  test('Sneakers are populated from image',async ()=>{
    const image = await container.imagesRepository.populate(sneakerConfig.image,{ include: [{ model:'sneaker', as: 'sneaker'}], limit:1})
    expect(image.sneaker).not.toBeNull()
  })

  afterEach(async ()=>{
    const sneaker = await container.sneakersRepository.find({sneaker_id:sneakerConfig.sneaker_id},{limit:1})
    await sneaker.removeGlobal()
  })
})
