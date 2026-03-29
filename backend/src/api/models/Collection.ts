import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../../database/config';

// Belongs to User; Has many Flashcard, CollectionShare
// TODO
export interface CollectionAttributes {}


class Collection extends Model<CollectionAttributes> implements CollectionAttributes {}

Collection.init(
    {     },
    { sequelize: db, tableName: 'collections' }
);

export default Collection;
