const router = require('express').Router();
const {
    getOneThought,
    getThoughts,
    createThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:postId').get(getOneThought);

module.exports = router;