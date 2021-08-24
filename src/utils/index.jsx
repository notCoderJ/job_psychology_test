import { API_BASE_URL } from '../constants/api';

export const createBaseURL = (type) => {
  const URL = { test: '/openapi/test', result: '/api/psycho' };
  return `${API_BASE_URL}${URL[type]}`;
};

// TODO: Error handle wrapper
// export const safetyWrapper = () =>{
//   return () => {
//   }
//   try {

//   } catch(err) {
//     console.log(err);
//   }
// }
