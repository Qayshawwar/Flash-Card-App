import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../../database/config';

// Intermediate between StudySession and Flashcard

interface StudyResultAttributes {}

class StudyResult extends Model<StudyResultAttributes>
    implements StudyResultAttributes {}

StudyResult.init(
    {    },
    { sequelize: db, tableName: 'study_results' }
);

export default StudyResult;
