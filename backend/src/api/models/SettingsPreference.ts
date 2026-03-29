import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../../database/config';

// Belongs to User (1:1)

interface SettingsPreferenceAttributes {}


class SettingsPreference extends Model<SettingsPreferenceAttributes>  implements SettingsPreferenceAttributes {
}

SettingsPreference.init(
    {    },
    { sequelize: db, tableName: 'settings_preferences' }
);

export default SettingsPreference;
