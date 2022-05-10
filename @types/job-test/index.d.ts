declare module 'job-test' {
  type NullableOne<T> = T | null;

  type InitState = {
    state: 'init';
  };

  type LoadingState = {
    state: 'loading';
  };

  type SuccessState<T> = {
    state: 'success';
    data: T;
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  export type DataState<T> =
    | InitState
    | LoadingState
    | SuccessState<T>
    | FailState;
}
