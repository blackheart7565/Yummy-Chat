import {DataTypes, Model} from "sequelize";
import {sequelize} from "../database/database.js";

class Channel extends Model {
}

export const Channels = Channel.init({
    id: {
        type: DataTypes.INTEGER
        , autoIncrement: true
        , primaryKey: true
    },
    avatar: {
        type: DataTypes.STRING
        , allowNull: true
    },
    name: {
        type: DataTypes.STRING
        , allowNull: false
    },
    description: {
        type: DataTypes.STRING
        , allowNull: true
    },
    type: {
        type: DataTypes.STRING
        , allowNull: false
    },
}, {
    sequelize: sequelize
    , tableName: 'channels'
    , modelName: 'channel'
    , timestamps: false
});
