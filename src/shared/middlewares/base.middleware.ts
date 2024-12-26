export class BaseMiddleware {
  private readonly middleware = 'middleware'

  public middleFunction(): void {
    console.log(this.middleware)
  }
}
