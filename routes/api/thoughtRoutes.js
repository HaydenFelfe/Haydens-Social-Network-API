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
router.route('/').put(updateThought);
router.route('/').delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions').delete(deleteReaction);

module.exports = router;