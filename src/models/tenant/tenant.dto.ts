import {
    IsString,
    IsDefined,
  } from "class-validator";

  /**
   * Data transfer object (DTO) with expected fields for creating roles
   */
  class CreateTenantDto {
    @IsString()
    @IsDefined()
    public name: string;
  }

  export default CreateTenantDto;
