const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: ObjectId(req.params.userId) })
        .populate("thoughts")
        .populate("friends", "_id username");

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found with that ID!" });
      }
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async postUser(req, res) {
    try {
      const postUser = await User.create(req.body);
      res.json(postUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.ObjectId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updateUser) {
        return res.status(400).json({ message: "No user with this id!" });
      }
      res.json(updateUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndDelete({
        _id: req.params.ObjectId,
      });

      if (!deleteUser) {
        return res.status(404).json({ message: "No user with this ID!" });
      }
      await Thought.deleteMany({ _id: { $in: deleteUser.thoughts } });
      res.json({ message: "User and thoughts deleted!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async postFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: "User or friend not found!" });
      }
      user.friends.push(friend._id);
      await user.save();
      res.json({ message: "Friend added successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        res.status(404).json({ message: "User or friend not found!" });
      }

      user.friends.pull(friend._id);
      await user.save();
      res.json({ message: "Friend removed succesfully!" });
      32;
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
