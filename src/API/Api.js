
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
    postLogin: async (loginId, password) => {
        return await postJsonReqest('/signin', {
            loginId,
            password,
        });
    },
    // 로그아웃
    postLogout: async () => {
        return await postJsonReqest('/auth/logout', null);
    },
    // 회원가입
    postSignup: async (info) => {
        return await postJsonReqest('/signup', info);
    },
    // 회원탈퇴
    getWithdrawal: async () => {
        return await deleteJsonReqest('/user');
    },

    // movie------------------------------------------------------------------------------------
    // 상영 영화 리스트 조회
    getNowMovie: async (page, size, sort) => {
        return await getRequest(`/films/now?`, { page, size, sort });
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
    // 전체 영화 리스트 조회 + 영화제목
    getMovieTitle: async (sort, title) => {
        return await getRequest(`/films?`, { sort, title });
    },
    // 전체 영화 리스트 조회 + 영화배우
    getMovieActor: async (sort, actor) => {
        return await getRequest(`/films?`, { sort, actor });
    },
    // 영화 댓글 조회
    getReadComment: async (filmsId) => {
        return await getRequest(`/films/${filmsId}/comments`);
    },
    // 영화 댓글 수정
    getUpdateComment: async (filmsId, commentId, data) => {
        console.log(filmsId, commentId, data);
        return await putJsonReqest(`/films/${filmsId}/comments/${commentId}`, data);
    },
    // 영화 댓글 삭제
    getDeleteComment: async (filmsId, commentId) => {
        return await deleteJsonReqest(`/films/${filmsId}/comments/${commentId}`);
    },
    // 영화 댓글 작성
    getCreateComment: async (filmsId, data) => {
        return await postJsonReqest(`/films/${filmsId}/comments/write`, data);
    },
    // Mypage--------------------------------------------------------------------------------
    // 내 정보 조회
    getInfo: async () => {
        return await getRequest(`/myinfo`);
    },
    // 내 예매 내역
    getReservation: async () => {
        return await getRequest(`/myticket`);
    },
    
    // Ticket--------------------------------------------------------------------------------
    // 선택한 영화의 상영 정보 리스트 조회
    getScreen: async (filmId) => {
        return await getRequest(`/screening?`, {filmId});
    },
    // 선택한 상영의 상세정보 조회
    getScreenDetail: async (screeningId) => {
        return await getRequest(`/screening/${screeningId}`);
    },
    // 예매
    postTickets: async (ticket) => {
        return await postJsonReqest('/ticket', ticket);
    },

    // likes------------------------------------------------------------------------------------
    // 댓글 좋아요
    getCommentLike: async (filmsId, commentId) => {
        return await postJsonReqest(`/films/${filmsId}/comments/${commentId}/like`);
    },


};

export default Api;