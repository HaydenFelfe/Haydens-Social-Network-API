const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    postUser,
    updateUser,
    deleteUser,
    postFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers);
router.route('/:userId').get(getSingleUser);
router.route('/').post(postUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
router.route('/:userId/friends/:friendId').post(postFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;



