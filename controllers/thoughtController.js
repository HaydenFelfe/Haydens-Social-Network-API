const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  async allThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      console.log('Fetching single thought...');
      
      const thought = await Thought.findOne({
        _id: new ObjectId(req.params.thoughtId),
      });
  
      console.log('Thought:', thought);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found!' });
      }
      return res.json({ thought });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json(err);
    }
  },

  async postThought(req, res) {
    try {
      const { thoughtText, username } = req.body;

      const thought = await Thought.create({ thoughtText, username });

      const user = await User.findOneAndUpdate(
        { username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }
      return res.json({ 
        message: "Thought created successfully",
        thoughtId: thought._id,
        thoughtText: thought.thoughtText,
     });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.ObjectId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updateThought) {
        return res.status(404).json({ message: "Thought not found!" });
      }
      res.json(updateThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({
        _id: req.params.ObjectId,
      });

      if (!deleteThought) {
        res.status(404).json({ message: "Thought not found!" });
      }
      return res.json({ message: "Thought has been deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const { reactionBody, username } = req.body;
      const thoughtId = req.params.thoughtId;
      const newReaction = { reactionBody, username };

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: newReaction } },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "Thought not found!" });
      }

      return res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought not found!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
