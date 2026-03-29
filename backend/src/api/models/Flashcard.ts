import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../../database/config';

// Belongs to Collection

interface FlashcardAttributes {}


class Flashcard extends Model<FlashcardAttributes>    implements FlashcardAttributes { }

Flashcard.init(
    {      },
    { sequelize: db, tableName: 'flashcards' }
);

export default Flashcard;
