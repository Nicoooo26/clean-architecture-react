import { AuthApplicationPayloadInterface } from "../../entity/authApplicationPayload";
import { AuthApplicationResponseInterface } from "../../entity/authApplicationResponse";

interface AuthApplicationDriverInterface {
  doLogin(payload: AuthApplicationPayloadInterface): Promise<AuthApplicationResponseInterface>;
}

export default AuthApplicationDriverInterface;
