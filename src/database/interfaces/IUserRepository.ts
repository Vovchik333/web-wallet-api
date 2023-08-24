import User from "../models/User";

export default interface IUserRepository {
    save(user: User): Promise<string | undefined>;
    findById(id: string): Promise<User | undefined>;
    update(user: User): Promise<number | undefined>;
    delete(id: string): Promise<number | undefined>;
}