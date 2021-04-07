import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    NotContains,
    IsDefined,
  } from "class-validator";

  /**
   * Data transfer object (DTO) with expected fields for user login
   */
  class UserLoginDto {

    @IsString()
    @IsDefined()
    public tenant: string;

    @IsEmail()
    @IsDefined()
    public email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(24)
    @NotContains(" ", { message: "No spaces allowed" } )
    @IsDefined()
    public password: string;
  }

  export default UserLoginDto;
