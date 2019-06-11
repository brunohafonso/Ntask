import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

module.exports = (sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cant be null',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'This field cant be null',
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'The email you entered is invalid or is already in our system.',
        },
        notEmpty: {
          msg: 'This field cant be null',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cant be null',
        },
      },
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Tasks);
  };

  Users.isPassword = (password, encodedPassword) => bcrypt.compare(password, encodedPassword);

  return Users;
};
