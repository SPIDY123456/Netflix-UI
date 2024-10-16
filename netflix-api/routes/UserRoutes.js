const router = require("express").Router();

const {
    addToLikedMovies,
    getLikedMovies,
    removeFromLikedMovies,
} = require("../controller/UserController");





router.post("/add", addToLikedMovies);
router.get("/liked/:email",getLikedMovies);
router.put("/delete",removeFromLikedMovies);


module.exports = router;
