import LogLevel from "./levelLog";
import RepositoryInterface from "./repository/interface";
import LoggerTypeInterface from "./interface";

abstract class AbstractLogger implements LoggerTypeInterface {

  private repository: RepositoryInterface;

  constructor(repositorio: RepositoryInterface) {
    this.repository = repositorio
  }

  private _format = (tipo: LogLevel, message: String): String => `[${tipo}]${message}`

  error = (a: String) => this.repository.save(this._format(LogLevel.Error, a))

  log = (a: String) => this.repository.save(this._format(LogLevel.Log, a))

  trace = (a: String) => this.repository.save(this._format(LogLevel.Trace, a))

  warning = (a: String) => this.repository.save(this._format(LogLevel.Warning, a))

  debug = (a: String) => this.repository.save(this._format(LogLevel.Debug, a))

}
export default AbstractLogger