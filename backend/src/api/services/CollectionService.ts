import { Collection } from '../models';
import { CollectionCreationAttributes } from '../models/Collection';
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

export type CollectionActionConfirmation = 'Confirm' | 'Cancel' | 'Dismiss';

export interface ShareCollectionResult {
    shared: boolean;
    message: string;
    collection: Collection | null;
}

class CollectionService {
    async getAllCollectionsByUser() {
        throw new Error('Not implemented');
    }

    async create(data: CollectionCreationAttributes): Promise<Collection> {
        // 1. Call repo.createCollection(data)
        // 2. Return created collection
        throw new Error('Not implemented');
    }

    async rename() {
        throw new Error('Not implemented');
    }

    async update() {
        throw new Error('Not implemented');
    }

    async delete(userID: number, collectionID: number): Promise<void> {
        // 1. Call repo.findCollectionById(collectionID), throw 404 if not found
        // 2. Verify collection.userID === userID, throw 403 if not owner
        // 3. Call repo.deleteCollectionById(collectionID) — cascades to Flashcard, StudySession
        throw new Error('Not implemented');
    }

    async share(
        userID: number,
        collectionID: number,
        confirmation: CollectionActionConfirmation
    ): Promise<ShareCollectionResult> {
        if (confirmation === 'Cancel') {
            return {
                shared: false,
                message: 'Collection sharing canceled.',
                collection: null,
            };
        }

        if (confirmation === 'Dismiss') {
            return {
                shared: false,
                message: 'Collection sharing dismissed.',
                collection: null,
            };
        }

        const collection = await CollectionRepository.findCollectionById(collectionID);

        if (!collection) {
            throw new Error('Collection not found.');
        }

        if (collection.userID !== userID) {
            throw new Error('You can only share collections you own.');
        }

        if (collection.visibility !== 'public') {
            await CollectionRepository.updateCollection(collectionID, { visibility: 'public' });
            collection.visibility = 'public';
        }

        return {
            shared: true,
            message: 'Collection shared successfully.',
            collection,
        };
    }

    async importFromFile(file: Express.Multer.File) {
        throw new Error('Not implemented');
    }

    async exportAsPdf(): Promise<Buffer> {
        throw new Error('Not implemented');
    }
}

export default new CollectionService();
