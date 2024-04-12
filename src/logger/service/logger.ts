// Dominio
import LogLevel from '../entity/log';

// Firma del repositorio
import RepositoryInterface from './repository/log';

// Firma del logger
export interface LoggerInterface {
    error(str: string): void;
    log(str: string): void;
    trace(str: string): void;
    warning(str: string): void;
    debug(str: string): void;
}

// Lógica abstracta
export abstract class AbstractLogger implements LoggerInterface {

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

// Implementación
class Logger extends AbstractLogger {}

export default Logger;