import { getConnection, Repository } from "typeorm";
import logger from "../../config/logger";

import Dao from "../../interfaces/dao.interface";
import { ActivityType, ActorType, ObjectType } from "../../interfaces/activitystream.interface";
import SearchResult from "../../interfaces/searchresult.interface";
import URLParams from "../../interfaces/urlparams.interface";

import DuplicateRecordException from "../../exceptions/DuplicateRecordException";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException";
import RecordsNotFoundException from "../../exceptions/RecordsNotFoundException";
import NotImplementedException from "../../exceptions/NotImplementedException";
import MissingParametersException from "../../exceptions/MissingParametersException";
import UserNotAuthorizedException from "../../exceptions/UserNotAuthorizedException";

import { event } from "../../utils/activity.helper";
import { AuthPermission, getPermission } from "../../utils/authorization.helper";
import { DataType, Formatter } from "../../utils/formatter";
import { Tenant } from "./tenant.entity";
import CreateTenantDto from "./tenant.dto";
import { User } from "../users/user.entity";

/**
 * Handles CRUD operations on Role data in database
 * Factoring to this class allows other (i.e. GraphQL to reuse this code in resolvers)
 */
class TenantDao implements Dao {
    private resource: string = "tenant"; // matches defined role role "resource"
  
    constructor() {
        // nothing
    }

    public getAll = async (user: User, params?: {[key: string]: any}): Promise<SearchResult> => {
        if (!user) {
            const message: string = "Required parameters missing";
            throw new MissingParametersException(message);
        }
        return;
    }

    public getOne = async (user: User, id: string): 
        Promise<Tenant | RecordNotFoundException | UserNotAuthorizedException> => {
            
            return;
    }

    public save = async (user: User, data: any):
            Promise<Tenant | RecordNotFoundException | UserNotAuthorizedException> => {
        return;
    }

    public update = async (user: User, data: any):
            Promise<Tenant | RecordNotFoundException | UserNotAuthorizedException> => {
        return; 
    }

    public remove = async (user: User, id: string):
            Promise<boolean | RecordNotFoundException | UserNotAuthorizedException> => {
        return; 
    }
}

export default TenantDao;