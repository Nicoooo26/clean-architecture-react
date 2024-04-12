import RepositoryInterface from "../service/repository/log";

class MemoryRepostory implements RepositoryInterface {
    private stack: Array<String> = [];
    save = (mensaje: String) => this.stack.push(mensaje);
    getAll = (): Array<String> => this.stack
}

export default MemoryRepostory