import {sequelize} from '../database/database.js';
import {DataTypes} from 'sequelize';

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    avatar: {type: DataTypes.STRING, allowNull: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false
});

const Channel = sequelize.define('channel', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    avatar: {type: DataTypes.STRING, allowNull: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
    type: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false
});

const UserChannel = sequelize.define('user_channel', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
}, {
    timestamps: false
});

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    message: {type: DataTypes.STRING, allowNull: true},
    username: {type: DataTypes.STRING, allowNull: false},
    nameChannel: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
});

// One to Many
Channel.hasMany(Message, {as: 'messages'});
Message.belongsTo(Channel);

User.hasMany(Message);
Message.belongsTo(User);

// Super Many to Many
User.belongsToMany(Channel, {through: UserChannel});
Channel.belongsToMany(User, {through: UserChannel});

User.hasMany(UserChannel);
UserChannel.belongsTo(User);

Channel.hasMany(UserChannel);
UserChannel.belongsTo(Channel);

export const table = {
    Channel,
    User,
    UserChannel,
    Message
}
