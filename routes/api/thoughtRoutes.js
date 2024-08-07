const router = require('express').Router();
const {
    getOneThought,
    getThoughts,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions/').get(getOneThought).post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;