const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "user_id",
});
// User-Post relationship
User.hasMany(Comment, {
  foreignKey: "user_id",
});
//Post-User relationship
Post.belongsTo(User, {
  foreignKey: "user_id",
});
// Post-Comment relationship
Post.hasMany(Comment, {
  foreignKey: "post_id",
});
// Comment-User relationship
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// Export the modules
module.exports = {
  User,
  Post,
  Comment,
};
