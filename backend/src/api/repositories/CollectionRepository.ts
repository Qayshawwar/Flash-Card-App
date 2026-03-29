import Collection from '../models/Collection';

// Data access for Collection model
// Called by: CollectionService
// FR-12: create; 
// FR-13: delete; 
// FR-18: rename; 
// FR-07: list all

class CollectionRepository {
    // TODO: implement each method

    async findAllByUser(): Promise<Collection[]> {
        throw new Error('Not implemented');
    }

    async findById(): Promise<Collection | null> {
        throw new Error('Not implemented');
    }

    async create(): Promise<Collection> {
        throw new Error('Not implemented');
    }

    async rename(): Promise<void> {
        throw new Error('Not implemented');
    }

    async deleteById(): Promise<void> {
        throw new Error('Not implemented');
    }
}

export default new CollectionRepository();
