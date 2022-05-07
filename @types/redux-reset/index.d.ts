import { StoreEnhancer } from 'redux';

declare module 'redux-reset' {
  export type ObjectOption = {
    type: string;
    data: string;
  };
  export type ResetReduxOption = string | symbol | ObjectOption | undefined;

  declare function resetMiddleware(
    // eslint-disable-next-line
    option?: ResetReduxOption,
  ): StoreEnhancer;

  export default resetMiddleware;
}
