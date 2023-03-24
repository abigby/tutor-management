module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Fetch all Tutorials
    router.get("/", tutorials.findAll);

    // Fetch all Published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Fetch Tutorial by id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial by id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorial
    router.delete("/", tutorials.deleteAll);

    // set app base url
    app.use('/api/tutorials', router);
}