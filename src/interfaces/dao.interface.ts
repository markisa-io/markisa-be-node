import { User } from "../models/users/user.entity";
import SearchResult from "./searchresult.interface";

/**
 * Standard data access object (DAO) with
 * basic CRUD methods
 */
export default interface Dao {
  getAll(user: User, params?: {[key: string]: any}): Promise<SearchResult | Error>;
  getOne(user: User, id: string): Promise<object | Error>;
  save(user: User, data: any): Promise<object | Error>;
  remove(user: User, id: string): Promise<boolean | Error>;
}
