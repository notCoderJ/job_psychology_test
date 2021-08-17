import axios from 'axios';

const apikey = ""; // 직업 심리 검사 API KEY를 넣어주세요.
const BASE_URL = "https://www.career.go.kr/inspct/openapi/test/";
const QUESTION_SEQ = 6;

const api = axios.create({
    baseURL: BASE_URL,
});

export const test_fetch = async () => {
    const res = await api.get('questions', {
        params: { apikey, q: QUESTION_SEQ },
    });
    if (res?.data?.SUCC_YN === 'Y') {
        return res.data.RESULT;
    }

    throw new Error(res);
};

