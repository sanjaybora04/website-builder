import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type User = {
    token:string,
    name:string,
    email:string
}

export const userAtom = atomWithStorage<User|undefined>('user',undefined)

export default function useAuth() {
  const [user, setUser] = useAtom(userAtom);

  return {
    user,
    authorize(userData: User) {
      setUser(userData);
    },
    unauthorize() {
      setUser(undefined);
      window.location.reload()
    },
  };
}