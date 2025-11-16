import { atom, useAtom } from 'jotai';
type ModalType = {
    id:''|'addWebsite',
    data?:any
}

const modalAtom = atom<ModalType>({
    id:''
})

export default function useModal() {
  const [modal,setModal] = useAtom(modalAtom)
  return {
    modal,setModal
  };
}