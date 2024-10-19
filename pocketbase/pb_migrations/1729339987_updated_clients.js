/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fhdy55g9udog8iq")

  // remove
  collection.schema.removeField("pyhix7yf")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fhdy55g9udog8iq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pyhix7yf",
    "name": "email",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})
