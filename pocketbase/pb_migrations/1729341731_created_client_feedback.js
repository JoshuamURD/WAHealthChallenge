/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "41j07pf353145eu",
    "created": "2024-10-19 12:42:11.892Z",
    "updated": "2024-10-19 12:42:11.892Z",
    "name": "client_feedback",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bd0fxzgh",
        "name": "client",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "fhdy55g9udog8iq",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "uar0rpcj",
        "name": "wellbeing_score",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("41j07pf353145eu");

  return dao.deleteCollection(collection);
})
