import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { websiteEditorAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { ChevronsUpDown, Edit, EllipsisIcon, Trash2 } from "lucide-react";
import PageForm from "./add-page";
import { Page } from "@/lib/types";

export default function Pages() {
    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom)

    if (!websiteEditor) return null

    async function addPage(data: Page) {
        setWebsiteEditor((prev:any) => ({ 
            ...prev, 
            website: { 
                ...prev?.website, 
                pages: [...prev?.website?.pages||[], data] 
            } 
        }))
        return true
    }

    async function editPage(path: string, data: Page) {
        setWebsiteEditor((prev:any) => ({
            ...prev, website: {
                ...prev?.website, 
                pages: prev?.website?.pages?.map((p:any) => {
                    if (p.path != path) return p;
                    return data
                })
            }
        }))
        return true
    }

    async function deletePage(path: string) {
        setWebsiteEditor((prev:any) => ({ ...prev,
            activePage:prev?.activePage==path?undefined:prev?.activePage, // if delete page is active set activepage to undefined
            activeComponent:prev?.activePage==path?undefined:prev?.activeComponent, // if component of deleted page is active then set it to undefined
             website: { ...prev?.website, pages: prev?.website?.pages?.filter((p:any) => p.path != path) } }))
        return true
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className=" justify-between"
                >
                    {websiteEditor.activePage || 'Select Page'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <CommandInput placeholder="Search pages..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {websiteEditor.website?.pages?.map((p) => (
                                <CommandItem
                                    key={p.path}
                                    value={p.path}
                                    keywords={[p.title, p.description]}
                                    onSelect={(val) => setWebsiteEditor((prev: any) => ({ ...prev, activePage: val, activeComponent: undefined }))}
                                    className="block"
                                >
                                    <div className="flex w-full justify-between">
                                        {p.path}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><EllipsisIcon /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <Dialog>
                                                    <DialogTrigger asChild className="w-full">
                                                        <Button variant='ghost' className="justify-start"><Edit />Edit</Button>
                                                    </DialogTrigger>
                                                    <DialogContent><PageForm data={p} onSubmit={(v) => editPage(p.path, v)} /></DialogContent>
                                                </Dialog>
                                                <Button variant='ghost' className="justify-start w-full" onClick={() => deletePage(p.path)}><Trash2 />Delete</Button>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <img src={p.image} className=" w-10 h-10 object-cover flex-none" />
                                        <div>
                                            <div className="text-sm line-clamp-1 text-ellipsis">{p.title}</div>
                                            <div className="text-xs line-clamp-1 text-ellipsis">{p.description}</div>
                                        </div>
                                    </div>
                                </CommandItem>
                            ))}

                        </CommandGroup>
                        
                    </CommandList>
                        <CommandSeparator />
                            <Dialog>
                                <DialogTrigger className="w-full p-1">
                                    <Button className="w-full">Add Page</Button>
                                </DialogTrigger>
                                <DialogContent><PageForm onSubmit={(v)=>addPage(v)} /></DialogContent>
                            </Dialog>
                </Command>
            </PopoverContent>
        </Popover>
    )
}