
import client from 'API/axiosConfig';
import qs from "qs";


const getRequest = async (path, params) => {
    try {
        params = qs.stringify(params);
        const data = await client.get(path + params);
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
};

const postFormReqest = async (path, body) => {
    try {
        const data = await client.post(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const postJsonReqest = async (path, body) => {
    try {
        const data = await client.post(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const putJsonReqest = async (path, body) => {
    try {
        const data = await client.put(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const deleteJsonReqest = async (path) => {
    try {
        const data = await client.delete(path, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const Api = {
    // 이메일 인증코드 저장
    emailCode: null,

    // 한 페이지당 보여줄 컨텐츠 개수
    pageCount: 3,

    // 로그인
    postLogin: async (email, password) => {
        return await postJsonReqest('/auth/login', {
            email,
            password
        });
    },
    // 로그아웃
    postLogout: async () => {
        return await postJsonReqest('/auth/logout', null);
    },
    // 이메일 인증 번호 전송
    postEmail: async (email) => {
        return await postJsonReqest('/auth/sendmail', { email }
        );
    },
    // 이메일 인증 번호 확인
    postAuthEmail: async (email, authkey) => {
        console.log(email, authkey)
        return await postJsonReqest('/auth/authmail', { email, authkey });
    },
    // 회원가입
    postSignup: async (info) => {
        return await postJsonReqest('/auth/signup', info);
    },
    // 회원탈퇴
    getWithdrawal: async () => {
        return await deleteJsonReqest('/user');
    },

    // movie------------------------------------------------------------------------------------
    // 상영 영화 리스트 조회
    getNowMovie: async (page, size) => {
        return await getRequest(`/films/now?`, { page, size });
    },
    // 영화 상세 조회
    getMovieDetail: async (filmId) => {
        return await getRequest(`/films/${filmId}`);
    },
    // 영화 통계 조회
    getMovieStatistic: async (filmId) => {
        return await getRequest(`/films/statistics?`, { filmId });
    },
    // 전체 영화 리스트 조회
    getAllMovie: async (sort) => {
        return await getRequest(`/films?`, { sort });
    },

    // likes------------------------------------------------------------------------------------
    // 좋아요 여부 확인
    getBoardIsLike: async (boardId) => {
        return await getRequest(`/board/islike?`, { boardId });
    },
    // 좋아요
    getBoardLike: async (boardId) => {
        return await postJsonReqest(`/board/like`, { boardId });
    },
    // 좋아요 취소
    getBoardUnlike: async (boardId) => {
        return await postJsonReqest(`/board/unlike`, { boardId });
    },

};

export default Api;