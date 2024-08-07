const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            console.log(req.params.userId)
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true });

            // console.log(req.params);
            if (!userData) {
                return res.status(404).json({
                    message: 'no user found',
                });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        console.log(req);
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};