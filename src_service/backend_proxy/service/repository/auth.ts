import { TokenInterface } from "../../entity/token"

interface AuthApplicationTokenInterface {
    saveToken(token:TokenInterface):void,
    getToken():TokenInterface | undefined,
    deleteToken():void
}

export default AuthApplicationTokenInterface;

// getAppToken(endpoint: string, payload: AuthApplicationPayloadInterface):(req: Request, res: Response, next: NextFunction) => Promise<void>;