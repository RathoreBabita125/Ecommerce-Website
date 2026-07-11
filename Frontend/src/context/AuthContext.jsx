import  {createContext } from 'react';
import {GETME} from '../query/user';
import {useQuery} from '@apollo/client/react'

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{

    const{data, loading} =useQuery(GETME);
    const authUser=data?.getMe || {}
    
    return (
        <AuthContext.Provider value={{authUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}
