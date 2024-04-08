import AbstractLogger from "./service/abstractLogger";
import RepositoryInterface from "./service/repository/interface";

class Logger extends AbstractLogger {
      constructor(repository: RepositoryInterface) {
        super(repository);
      }
  }
export default Logger