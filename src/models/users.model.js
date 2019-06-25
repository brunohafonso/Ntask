const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
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
          msg: 'name cant be null',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The email informed is already in use',
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'The email you entered is invalid or is already in our system.',
        },
        notEmpty: {
          msg: 'email cant be null',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'passoword cant be null',
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
