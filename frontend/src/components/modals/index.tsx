import useModal from "@/hooks/use-modal";
import { Dialog, DialogContent } from "../ui/dialog";

import dynamic from "next/dynamic";

const AddWebsite = dynamic(() => import('./addWebsite'), {
    ssr: false,
});

export default function ModalProvider() {
    const { modal, setModal } = useModal()

    let component;

    switch (modal.id) {
        case 'addWebsite':
            component = <AddWebsite website={modal.data?.website}/>
            break
    }

    return (
        <Dialog open={modal.id!=''} onOpenChange={()=>setModal({id:''})}>
            <DialogContent>
                {component}
            </DialogContent>
        </Dialog>
    )
}