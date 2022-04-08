import axios from "axios"

const _execute = async (action: any, endpoint: string, options: any ) =>{
    return await action(endpoint, options).then((response: any) => response)
}

const _get = async( endpoint: string, options: any = {}) =>{
    return _execute(axios.get, endpoint, options)
}

const _post = (endpoint: string, data: any, options: any) =>{
    const actionWithDataPreApplied = (endpoint: string, options: any) =>{
        return axios.post(endpoint, data, options)
    }
    return _execute(actionWithDataPreApplied,endpoint, options)
}

export const Api = {

    getUser: ()=>{
        return _get('user')
    }
    
}