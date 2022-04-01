export default Object.freeze({
  initial: (data = null) => ({
    loading: false,
    data,
    error: null,
  }),
  loading: (data = null) => ({
    loading: true,
    data,
    error: null,
  }),
  success: (data) => ({
    loading: false,
    data,
    error: null,
  }),
  failure: (error) => ({
    loading: false,
    data: null,
    error,
  }),
});
