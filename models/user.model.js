const bcrypt = require("bcrypt");
const {DataTypes} = require('sequelize');
const db = require('../middlewares/config/database');


const userSchema = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
}

const User = db.define('user', userSchema, {
    freezeTableName: true,
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(10));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

module.exports = User;