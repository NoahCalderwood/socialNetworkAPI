const { Thought, User } = require('../models');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types;

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought head empty' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {

        try {
            const thoughtData = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                });
            }
            console.log(req.body.userId);
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought, head empty' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'thought deleted, but no user found',
                });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true, runValidators: true });

            if (!thought) {
                return res.status(404).json({ message: 'No thought head empty' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: { _id: req.params.thoughtId } },
                { $set: req.body },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'thought deleted, but no user found',
                });
            }

            res.json({ message: 'Thought successfully changed' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {

        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought, head empty' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            console.log(req.params.reactionId);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $pull: {
                        reactions: {
                            reactionId: req.params.reactionId
                        }
                    }
                },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought, head empty' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};