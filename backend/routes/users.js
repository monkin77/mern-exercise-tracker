const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {       // the url will be localhost:5000/users/
    User.find()         // find is a mongoose method that will act on the mongoDB
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()       // save is a mongoose method that will act on the mongoDB
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));        
});

module.exports = router;