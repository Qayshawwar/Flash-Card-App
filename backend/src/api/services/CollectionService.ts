import Collection, { CollectionCreationAttributes, CollectionUpdateAttributes } from '../models/Collection';
import CollectionRepository from '../repositories/CollectionRepository';
import { Express } from 'express';
import {
    AppError,
    CollectionNotFoundError,
    ValidationError,
} from '../../errors';

export interface ImportResult {
    count: number;
    message: string;
}

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

export interface ShareCollectionResult {
    shared: boolean;
    message: string;
    collection: Collection | null;
}

class CollectionService {
    // Centralized collection existence check used by authz helpers.
    private async getCollectionOrThrow(collectionID: number): Promise<Collection> {
        const collection = await CollectionRepository.findCollectionById(collectionID);
        if (!collection) {
            throw new CollectionNotFoundError();
        }
        return collection;
    }

    private async ensureCanReadCollection(userID: number, collectionID: number): Promise<Collection> {
        const collection = await this.getCollectionOrThrow(collectionID);
        if (collection.visibility !== 'public' && collection.userID !== userID) {
            throw new AppError('You can only access public collections or your own collections.', 403);
        }
        return collection;
    }

    private async ensureOwnsCollection(userID: number, collectionID: number): Promise<Collection> {
        const collection = await this.getCollectionOrThrow(collectionID);
        if (collection.userID !== userID) {
            throw new AppError('You can only modify collections you own.', 403);
        }
        return collection;
    }

    async getAllCollectionsByUser(userID: number): Promise<Collection[]> {
        // FR-07: list collections for authenticated user.
        return CollectionRepository.findAllCollectionsByUser(userID);
    }

    async create(data: CollectionCreationAttributes): Promise<Collection> {
        // FR-12: create new collection.
        if (!data.collectionName?.trim()) {
            throw new ValidationError('Collection name is required.');
        }

        return CollectionRepository.createCollection({
            ...data,
            collectionName: data.collectionName.trim(),
        });
    }

    async rename(collectionID: number, collectionName: string, userID: number): Promise<void> {
        await this.ensureOwnsCollection(userID, collectionID);

        // FR-18: rename collection.
        if (!collectionName?.trim()) {
            throw new ValidationError('Collection name is required.');
        }

        await CollectionRepository.updateCollection(collectionID, { collectionName: collectionName.trim() });
    }

    async update(collectionID: number, data: CollectionUpdateAttributes, userID: number): Promise<void> {
        await this.ensureOwnsCollection(userID, collectionID);
        await CollectionRepository.updateCollection(collectionID, data);
    }

    async delete(userID: number, collectionID: number): Promise<void> {
        // FR-13: owner-only collection deletion.
        await this.ensureOwnsCollection(userID, collectionID);
        await CollectionRepository.deleteCollectionById(collectionID);
    }

    async share(userID: number, collectionID: number): Promise<ShareCollectionResult> {
        // FR-04: frontend confirms; backend performs owner-only share action.
        const collection = await this.ensureOwnsCollection(userID, collectionID);

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

    async importFromFile(
        collectionId: number,
        file: Express.Multer.File | undefined,
        userID?: number
    ): Promise<ImportResult> {
        throw new Error('Not implemented');
    }

    async exportAsPdf(collectionId: number, userID?: number): Promise<Buffer> {
        throw new Error('Not implemented');
    }
}

export default new CollectionService();
