import Flashcard from '../models/Flashcard';

// Data access for Flashcard model
// Called by: FlashcardService
// FR-31: create; 
// FR-08: update; 
// FR-03: duplicate; 
// FR-11: flag; 
// FR-02: search by keyword

class FlashcardRepository {
    // TODO: implement each method

    async findAllByCollection(): Promise<Flashcard[]> {
        throw new Error('Not implemented');
    }

    async findFlaggedByCollection(): Promise<Flashcard[]> {
        throw new Error('Not implemented');
    }

    async searchByKeyword(): Promise<Flashcard[]> {
        throw new Error('Not implemented');
    }

    async findById(): Promise<Flashcard | null> {
        throw new Error('Not implemented');
    }

    async create(): Promise<Flashcard> {
        throw new Error('Not implemented');
    }
    // data: Partial<Pick<Flashcard, 'field| field2'>> to allow updating only certain fields
    async update(): Promise<void> {
        throw new Error('Not implemented');
    }

    async incrementCorrect(): Promise<void> {
        throw new Error('Not implemented');
    }

    async incrementIncorrect(): Promise<void> {
        throw new Error('Not implemented');
    }

    async deleteById(): Promise<void> {
        throw new Error('Not implemented');
    }
}

export default new FlashcardRepository();
