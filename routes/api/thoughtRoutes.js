const router = require('express').Router();

const {
    allThoughts,
    getSingleThought,
    postThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(allThoughts);
router.route('/:thoughtId').get(getSingleThought);
router.route('/').post(postThought);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;