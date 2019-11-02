import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from '../constant';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    err: {},
    fetchingRepos: true
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                err: payload,
                loading: false,
                fetchingRepos: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                profiles: [],
                repos: [],
                loading: true,
                err: {},
                fetchingRepos: true
            }
        case GET_REPOS:
            return {
                ...state, 
                repos: payload,
                loading: false,
                fetchingRepos: false
            }
        default:
            return state
    }
}