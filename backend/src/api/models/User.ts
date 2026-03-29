import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../../database/config';

// FR-25: username/email login; FR-26: password masked; FR-27: complexity enforced in AuthService
// FR-30: failedLoginAttempts + lockedUntil enforce account lockout (NFR-07/08)
// FR-24: lastActiveAt used to detect inactivity for auto-logout

interface UserAttributes {}

export interface UserOutput extends UserAttributes {}

// TODO: Define columns below following Sequelize DataTypes pattern
// TODO: Add associations in a separate index (User.hasMany(Collection), User.hasOne(SettingsPreference))
class User extends Model<UserAttributes> implements UserAttributes {}

User.init(
    {    },
    { sequelize: db, tableName: 'users' }
);

export default User;
