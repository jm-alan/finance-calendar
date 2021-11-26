import util from 'util';

export class RequestError extends Error {
  public readonly title: string;
  public readonly message: string;
  public readonly status: number;
  public errors: string[];

  constructor(title: string, message: string, status: number) {
    super(message);
    this.title = title;
    this.errors = [];
    this.status = status;
  }
}

export class ExtendedValidationError {
  public readonly title: string;
  public readonly message: string;
  public readonly status: 401;
  public errors: string[];

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.status = 401;
  }

  [util.inspect.custom]() {
    let out = '';
    for (const error of this.errors) out += `\n    ${error}`;
    return `--------------------------------------------\n${this.title}\n  ${this.message}${out}`;
  }
}
