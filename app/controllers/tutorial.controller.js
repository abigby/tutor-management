const db = require("../models");
const Tutorial = db.tutorials;

// Create Tutorial ----------------------------------
exports.create = (req, res)=> { 
    // Validate Request
    if(!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial ----------------------------------
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database ----------------------------------
    tutorial
    .save(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An Error occurred while creating the Tutorial"
        });
    });
};

// Find all Tutorials ----------------------------------
exports.findAll = (req, res) => { 
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tutorial.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An Error occurred while retrieving tutorials."
        });
    });
};

// Find Tutorial by id ----------------------------------
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
    .then((data)=> {
        if(!data) {
            res.status(404).send({ message: `Tutorial with id:${id}` });
        } else {
            res.send(data);
        }
    })
    .catch((err) => {
        res.status(500)
        .send({ message: `Error retrieving Tutorial with id:${id}` });
    });
 };

// Update a Tutorial by id ----------------------------------
exports.update = (req, res) => { 
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data)=> {
        if(!data) {
            res.status(404).send({
                message: `Cannot Update/Find Tutorial with id:${id}`
            })
        } else {
            res.send({ message: `Tutorial was UPDATED successfully`});
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: `Error updating Tutorial with id:${id}`
        });
    });
};

// Delete a Tutorial by id ----------------------------------
exports.delete = (req, res) => { 
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
    .then((data)=> {
        if(!data) {
            res.status(404).send({
                message: `Cannot Delete/Find Tutorial with id:${id}`
            })
        } else {
            res.send({
                message: `Tutorial was DELETED successfully!`
            });
        }
    })
    .catch((err)=> {
        res.send({
            message: `Cannot Delete Tutorial with id: ${id}`
        })
    })
};

// Delete all Tutorials ----------------------------------
exports.deleteAll = (req, res) => { 
    Tutorial.deleteMany({})
    .then((data)=> {
        res.send({
            message: `${data.deleteCount} All Tutorials were DELETED successfully.`
        });
    })
    .catch((err)=> {
        res.status(500)
        .send({
            message: err.message || `An error occurred while Deleting All Tutorials`
        })
    })
};

// Find all Published Tutorials ----------------------------------
exports.findAllPublished = (req, res) => {
    Tutorial.find( { published: true })
    .then((data) => {
        res.send(data);
    })
    .catch((err)=> {
        res.status(500).send({
            message: err.message || `An error occurred while retrieving Tutorials that are Published: ${published}`
        });
    });
 };