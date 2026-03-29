import CollectionRepository from '../repositories/CollectionRepository';
import { Express } from 'express';

// Business logic for flashcard collections
// FR-01 (Use Case 10): import from file;
// FR-04 (Use Case 16): share; 
// FR-05 (Use Case 11): export PDF; 
// FR-07: list all; 
// FR-12: create; 
// FR-13: delete; 
// FR-14: persistence across logout;
// FR-18: rename;
// FR-22: notify if file type is not supported;
// FR-23: validate file content format 

class CollectionService {
    async getAllByUser(userId: number) {
        throw new Error('Not implemented');
    }

    async create() {
        throw new Error('Not implemented');
    }

    async rename() {
        throw new Error('Not implemented');
    }

    async delete() {
        throw new Error('Not implemented');
    }

    async share() {
        throw new Error('Not implemented');
    }

    async importFromFile(file: Express.Multer.File) {
        throw new Error('Not implemented');
    }

    async exportAsPdf(): Promise<Buffer> {
        throw new Error('Not implemented');
    }
}

export default new CollectionService();
