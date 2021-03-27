declare module 'egg' {
  export interface Context {
    userOid: string;
    isLoggedIn: boolean;
  }
}
declare module 'mongoose' {
  export interface DocumentQuery {
    externalPopulate(path: any, select?: string, model?: Model): this;
  }
}
