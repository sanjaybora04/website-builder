import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown, EllipsisIcon, Trash2 } from "lucide-react";
import AddPage from "./add-page";
import EditPage from "./edit-page";
import useWebsiteEditor from "@/hooks/use-website-editor";

export default function Pages() {
    const editor = useWebsiteEditor()

    if (!editor.website) return null

    async function deletePage(path: string) {
        editor.deletePage(path)
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
                    {editor.activePage || 'Select Page'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <CommandInput placeholder="Search pages..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {editor.website?.pages?.map((p) => (
                                <CommandItem
                                    key={p.path}
                                    value={p.path}
                                    keywords={[p.title, p.description]}
                                    onSelect={(val) => editor.setActivePage(val)}
                                    className="block"
                                >
                                    <div className="flex w-full justify-between">
                                        {p.path}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><EllipsisIcon /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <EditPage page={p}/>
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
                    <AddPage />
                </Command>
            </PopoverContent>
        </Popover>
    )
}