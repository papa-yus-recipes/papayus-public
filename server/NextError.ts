export default class NextError extends Error {
  public readonly status_code: number;

  constructor(status_code: number, message: string) {
    super(message);
    this.status_code = status_code;
  }
}

export const InvalidError = (key: string) => new NextError(400, `Invalid ${key}`);

export const UnauthenticatedError = () => new NextError(401, "Unauthorized");

export const UnauthorizedError = () => new NextError(403, "Forbidden");
