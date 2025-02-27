const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// User.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     // googleId: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true,

//     // },
//     // username is email 
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       validate: {
//         isEmail: true,
//       },

//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [8],
//         },
//       },
// // name
//     displayName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     // firstName: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true,
//     // },
//     // lastName: {
//     //     type: DataTypes.STRING,
//     //     allowNull: true,
//     // },
//     // image: {
//     //     type: DataTypes.STRING,
//     // },
// },
//     {
//         hooks: {
//             // check if password exists if(password)
//             beforeCreate: async (newUserData) => {
//                     newUserData.password = await bcrypt.hash(newUserData.password, 10);
//                     return newUserData;
//                 },
//             // beforeUpdate: async (updatedUserData) => {
//             //     if (updatedUserData.password) {
//             //         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//             //     }
//             //     return updatedUserData;
//             // },
//         },
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'user',
//     })

// module.exports = User;
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;