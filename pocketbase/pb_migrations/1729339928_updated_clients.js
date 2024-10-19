/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fhdy55g9udog8iq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mwykzgbe",
    "name": "hospital_visits",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iaehgyv9",
    "name": "postcode",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fhdy55g9udog8iq")

  // remove
  collection.schema.removeField("mwykzgbe")

  // remove
  collection.schema.removeField("iaehgyv9")

  return dao.saveCollection(collection)
})
