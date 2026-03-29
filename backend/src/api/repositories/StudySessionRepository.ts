import StudySession from '../models/StudySession';
import StudyResult from '../models/StudyResult';

// Data access for StudySession and StudyResult
// Called by: StudySessionService
// FR-19: pause/resume; 
// FR-20: summary; 
// NFR-05/06: restore within 2s with 99% reliability

class StudySessionRepository {
    // TODO: implement each method

    async create(): Promise<StudySession> {
        throw new Error('Not implemented');
    }

    async findActiveByUser(userId: number): Promise<StudySession | null> {
        throw new Error('Not implemented');
    }

    async findById(id: number): Promise<StudySession | null> {
        throw new Error('Not implemented');
    }

    async pause(id: number, currentCardIndex: number): Promise<void> {
        throw new Error('Not implemented');
    }

    async resume(id: number): Promise<void> {
        throw new Error('Not implemented');
    }

    async complete(id: number): Promise<void> {
        throw new Error('Not implemented');
    }

    async recordAnswer(data: {
        studySessionId: number;
        flashcardId: number;
        answer: 'correct' | 'incorrect' | 'skipped';
    }): Promise<StudyResult> {
        throw new Error('Not implemented');
    }

    async getSummary(studySessionId: number): Promise<StudyResult[]> {
        throw new Error('Not implemented');
    }
}

export default new StudySessionRepository();
