//getTokenapp
import AuthApplicationTokenInterface from '../service/repository/auth';
import { TokenInterface } from '../entity/token';
class BackendRepository implements AuthApplicationTokenInterface {
    private _token?: TokenInterface;
    saveToken = (token: TokenInterface) => (this._token = token);
    getToken = (): TokenInterface | undefined => this._token;
    deleteToken = () => this._token = undefined;
}

export default BackendRepository;
