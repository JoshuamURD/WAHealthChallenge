/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fhdy55g9udog8iq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vobe9inw",
    "name": "diagnosis",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "depression",
        "anxiety",
        "schizophrenia",
        "bipolar",
        "adhd",
        "ocd"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fhdy55g9udog8iq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vobe9inw",
    "name": "field",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "depression",
        "anxiety",
        "schizophrenia",
        "bipolar",
        "adhd",
        "ocd"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
