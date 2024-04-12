import LogType from "../entity/state";

export interface UserInterface {
  getLogState(): LogType;
  getLanguage(): string;
}

export abstract class AbstractAplicattion implements UserInterface {
  private loggin: LogType = LogType.Unknown;
  private lenguage: string = "es-ES";

  getLogState = (): LogType => this.loggin;
  getLanguage = (): string => this.lenguage;

  setLogState = (logState: LogType) => (this.loggin = logState);
  setLanguage = (language: string) => (this.lenguage = language);
}

class Application extends AbstractAplicattion {}

export default Application;