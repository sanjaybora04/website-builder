import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';
import useWebsites from './use-websites';

export type User = {
    token:string,
    name:string,
    email:string,
    plan: 'FREE' | 'PRO'
}

export const userAtom = atomWithStorage<User|undefined>('user',undefined)
const isUserHydratedAtom = atom(false)

export default function useAuth() {
  const {loadWebsites} = useWebsites()
  const [user, setUser] = useAtom(userAtom);
  const [isUserHydrated,setIsUserHydrated] = useAtom(isUserHydratedAtom)

  useEffect(()=>{
    setIsUserHydrated(true)
  },[setIsUserHydrated])

  return {
    user,
    isUserHydrated,
    authorize(userData: User) {
      loadWebsites()
      setUser(userData);
    },
    unauthorize() {
      setUser(undefined);
    },
  };
}