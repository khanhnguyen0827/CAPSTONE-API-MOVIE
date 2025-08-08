import { statusCodes } from "./status-code.helper";

// export class BadrequestException extends Error {}
export class BadrequestException extends Error {
   constructor(message = "Bad request") {
      super(message);//new Error(message);
      this.code = statusCodes.BAD_REQUEST;
   }
}

// export class UnauthorizedException extends Error {}

export class UnauthorizedException extends Error {
   constructor(message = "Unauthorized") {
      super(message);//new Error(message);
      this.code = statusCodes.UNAUTHORIZED;//401 logout
   }
}
