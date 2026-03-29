import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../../database/config';

// Belongs to User and Collection; Has many StudyResult

interface StudySessionAttributes {}

class StudySession extends Model<StudySessionAttributes>
    implements StudySessionAttributes {}

StudySession.init(
    {    },
    { sequelize: db, tableName: 'study_sessions' }
);

export default StudySession;
