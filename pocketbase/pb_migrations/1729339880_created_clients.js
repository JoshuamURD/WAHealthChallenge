/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fhdy55g9udog8iq",
    "created": "2024-10-19 12:11:20.266Z",
    "updated": "2024-10-19 12:11:20.266Z",
    "name": "clients",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "akbfxwtq",
        "name": "Avatar",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "zrrwdenn",
        "name": "first_name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mo1hm121",
        "name": "last_name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fhdy55g9udog8iq");

  return dao.deleteCollection(collection);
})
