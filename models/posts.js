'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.belongsTo(models.users, { targetKey: 'id', foreignKey: 'author', as: 'user' });
    }
  };
  posts.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT,
    author: DataTypes.INTEGER,
    cover: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
    hooks: {
      beforeCreate: (post, options) => {
        // Do stuff
        post.slug = post.title
          .toLowerCase()
          .replace(/[^A-Za-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-');
      },
    },
  });
  return posts;
};