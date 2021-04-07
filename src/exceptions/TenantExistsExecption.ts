import HttpException from "./HttpException";

class TenantExistsExecption extends HttpException {
  constructor() {
    super(401, "Tenant does not exist");
  }
}

export default TenantExistsExecption;
