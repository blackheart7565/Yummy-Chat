import {DataTypes, Model} from "sequelize";
import {sequelize} from "../database/database.js";

class UserRefChannel extends Model {
}

export const UsersRefChannels = UserRefChannel.init({
    id: {
        type: DataTypes.INTEGER
        , autoIncrement: true
        , primaryKey: true
    }
}, {
    sequelize: sequelize
    , tableName: 'users_ref_channels'
    , modelName: 'userRefChannel'
    , timestamps: false
})
