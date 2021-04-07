/**
 * Use within 'connection' block in server to create test data
 */
import { Connection } from "typeorm";
import { Permission } from "../models/permissions/permission.entity";
import { Role } from "../models/roles/role.entity";
import { User } from "../models/users/user.entity";
import { hashPassword } from "../utils/authentication.helper";
import logger from "../config/logger";
import cache from "../config/cache";
import { connect } from "http2";

// truncate entity tables in database
const clearDb = async (connection: Connection) => {
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = await connection.getRepository(entity.name);
    await repository.query(`DELETE FROM "${entity.tableName}" CASCADE;`);
  }
};

const resetUserPermissionCache = async () => {
  await cache.del("authorization:grants");
};

const isDataAlreadyLoaded = async (connection: Connection) => {
  try {
    const adminUser: User =
            await connection.manager.findOneOrFail(User, { email: "admin@example.com" });

    if (adminUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false; // user not found so proceed
  }
};

const loadData = async (connection: Connection) => {
  await resetUserPermissionCache();
  logger.info("Reset user permission cache");

  // logout
  const logoutPermission = connection.manager.create(Permission, {
    action: "update:any",
    attributes: "*",
    resource: "authentication",
  });

  // search
  const searchPermission = connection.manager.create(Permission, {
    action: "read:any",
    attributes: "*",
    resource: "search",
  });

  const userRoleViewPermission = connection.manager.create(Permission, {
    action: "read:any",
    attributes: "*, !permissions",
    resource: "role",
  });

  const userUserDeleteTokens = connection.manager.create(Permission, {
    action: "delete:own",
    attributes: "*",
    resource: "token",
  });

  const userUserUpdatePermission = connection.manager.create(Permission, {
    action: "update:own",
    attributes: "*",
    resource: "user",
  });

  const userUserViewPermission = connection.manager.create(Permission, {
    action: "read:any",
    attributes: "*, !age, !password",
    resource: "user",
  });

  const userUserViewTokens = connection.manager.create(Permission, {
    action: "read:own",
    attributes: "*",
    resource: "token",
  });

  const skillPermission = connection.manager.create(Permission, {
    action: "read:own",
    attributes: "*",
    resource: "skill",
  })

  const userRole = connection.manager.create(Role, {
    description: "Authenticated user with basic privileges",
    id: "tenant",
    permissions: [
      logoutPermission,
      searchPermission,
      userRoleViewPermission,
      userUserDeleteTokens,
      userUserUpdatePermission,
      userUserViewPermission,
      userUserViewTokens,
    ],
  });

  await connection.manager.save(userRole);
  return [userRole];
}
/**
 * Run this once but if data already exists
 * @param connection
 */
const createTestData = async (connection: Connection) => {
    if (!await isDataAlreadyLoaded(connection)) {
      logger.info("Loading data for first time...");
      // await clearDb(connection);
      // await resetUserPermissionCache();
      await loadData(connection);
    } else {
      logger.info("Data already loaded so running tests...");
    }
  };

export default createTestData;
