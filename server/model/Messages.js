import {DataTypes, Model} from "sequelize";
import {sequelize} from "../database/database.js";

class Message extends Model{
}

export const Messages = Message.init({
    id: {
        type: DataTypes.INTEGER
        , autoIncrement: true, primaryKey: true
    },
    username:
        {type: DataTypes.STRING
            , allowNull: false
        },
    nameChannel: {
        type: DataTypes.STRING
        , allowNull: false
    },
    message: {
        type: DataTypes.TEXT
        , allowNull: true
    },
}, {
    sequelize: sequelize
    , tableName: 'messages'
    , modelName: 'message'
    // , timestamps:false
});
