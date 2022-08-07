declare global {
  namespace Express {
    interface Request {
      payload: string | Object;
    }
  }
}
