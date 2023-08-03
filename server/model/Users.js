import {DataTypes, Model} from "sequelize";
import {sequelize} from "../database/database.js";
import {Messages} from "./Messages.js";
import {Channels} from "./Channels.js";
import {UsersRefChannels} from "./UsersRefChannels.js";

class User extends Model {
}

export const Users = User.init({
    id: {
        type: DataTypes.INTEGER
        , autoIncrement: true
        , primaryKey: true
    },
    avatar: {
        type: DataTypes.STRING
        , allowNull: true
    },
    username: {
        type: DataTypes.STRING
        , allowNull: false
    },
    email: {
        type: DataTypes.STRING
        , unique: true
        , allowNull: false
    },
    phone: {
        type: DataTypes.STRING
        , allowNull: false
    },
    password: {
        type: DataTypes.STRING
        , allowNull: false
    },
}, {
    sequelize: sequelize
    , tableName: 'users'
    , modelName: 'user'
    , timestamps: false
});

// One to Many
Channels.hasMany(Messages, {as: 'messages'});
Messages.belongsTo(Channels);

Users.hasMany(Messages);
Messages.belongsTo(Users);

// Super Many to Many
Users.belongsToMany(Channels, {through: UsersRefChannels});
Channels.belongsToMany(Users, {through: UsersRefChannels});

Users.hasMany(UsersRefChannels);
UsersRefChannels.belongsTo(Users);

Channels.hasMany(UsersRefChannels);
UsersRefChannels.belongsTo(Channels);
