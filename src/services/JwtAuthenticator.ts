import * as jwt from "jsonwebtoken";

export class JwtAuthenticator {
  private static EXPIRES_IN = "1y";
  public generateToken(text: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: text.id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: JwtAuthenticator.EXPIRES_IN,
      }
    );
    return token;
  }
  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
    };
    return result;
  }
}
interface AuthenticationData {
  id: string;
}
