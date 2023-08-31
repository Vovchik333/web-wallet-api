import User from "../models/User";

export default interface IUserRepository {
    save(user: User): Promise<string | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    update(user: User): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}