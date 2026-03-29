import User, { UserOutput } from '../models/User';

// Data access for User model
// Called by: AuthService, AuthMiddleware
// FR-25/30: findByCredential, incrementFailedAttempts, lockAccount, resetFailedAttempts

class UserRepository {
    // TODO: implement each method

    async findById(id: number): Promise<UserOutput | null> {
        throw new Error('Not implemented');
    }

    async findByEmail(identifier: string): Promise<UserOutput | null> {
        throw new Error('Not implemented');
    }

    async create(): Promise<UserOutput> {
        throw new Error('Not implemented');
    }
    //data: Partial<Pick<UserOutput, 'username' | 'email'>>
    async updateProfile(id: number, data: UserOutput): Promise<void> {
        throw new Error('Not implemented');
    }

    async updatePassword(id: number, passwordHash: string): Promise<void> {
        throw new Error('Not implemented');
    }

    // FR-30: lockout logic
    async incrementFailedAttempts(id: number): Promise<void> {
        throw new Error('Not implemented');
    }

    async lockAccount(id: number, until: Date): Promise<void> {
        throw new Error('Not implemented');
    }

    async resetFailedAttempts(id: number): Promise<void> {
        throw new Error('Not implemented');
    }

    // FR-09: delete account
    async deleteById(id: number): Promise<void> {
        throw new Error('Not implemented');
    }

    async updateLastActive(id: number): Promise<void> {
        throw new Error('Not implemented');
    }
}

export default new UserRepository();
