import { useReducer, useEffect } from "react";
import axios from 'axios'

const ACTION = {
    MAKE_REQUEST: 'MAKE_REQUEST',
    GET_DATA: 'GET_DATA',
    ERROR : 'ERROR',
    UPDATE_HAS_NEXT_PAGE: 'UPDATE_HAS_NEXT_PAGE'
}

const BASE_URL = 'https://jobs.github.com/positions.json'

const reducer = (state: any, action:any) => {
    switch (action.type) {
        case ACTION.MAKE_REQUEST:
            return {loading: true, jobs: []}
        case ACTION.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs}
            
        case ACTION.ERROR:
            return {...state, loading: false, error: action.payload.error, 
            jobs: []}
        case ACTION.UPDATE_HAS_NEXT_PAGE:
            return {...state, hasNextPage: action.payload.hasNextPage}
        default :
            return state
    }
} 

const useFetchJobs = (params: any, page: number) => {

    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true})

    useEffect( () => {
        const cancelToken = axios.CancelToken.source()
        dispatch({type: ACTION.MAKE_REQUEST})
         axios.get(BASE_URL, {
             cancelToken: cancelToken.token,
            params: {markdown: true, page: page, params},
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then( res => {
            console.log(res.data);
            dispatch({type: ACTION.GET_DATA,  payload: {jobs: res.data} })
        }).catch (e => {
            if (axios.isCancel(e)) return
            dispatch({type: ACTION.ERROR, payload: {error: e}})
            })

        const cancelToken2 = axios.CancelToken.source()
         axios.get(BASE_URL, {
             cancelToken: cancelToken2.token,
            params: {markdown: true, page: page, params},
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then( res => {
            console.log(res.data);
            dispatch({type: ACTION.UPDATE_HAS_NEXT_PAGE,  
                payload: {hasNextPage: res.data?.length !== 0 } })
        }).catch (e => {
            if (axios.isCancel(e)) return 
            dispatch({type: ACTION.ERROR, payload: {error: e}})
            })
        
        return () => {
            cancelToken.cancel()
            cancelToken2.cancel()
        }
        
    }, [params, page] )
    console.log(state)
    return state
};

export {useFetchJobs};
