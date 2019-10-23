import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE
} from '../constant';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    err: {}
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
        case PROFILE_ERROR:
            return {
                ...state,
                err: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                profiles: [],
                repos: [],
                loading: true,
                err: {}
            }
        default:
            return state
    }
}