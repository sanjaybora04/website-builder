"use client";
import { Plus } from "lucide-react";
import { useSetAtom } from "jotai";
import { websiteEditorAtom } from "@/lib/atoms";
import { v4 as uuidv4 } from 'uuid'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import builderComponents from "@/lib/builder-components";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddComponent({ index }: { index: number }) {
    const setWebsiteEditor = useSetAtom(websiteEditorAtom);
    const [open, setOpen] = useState(false)

    const [category, setCategory] = useState('all')

    function submit(config: any) {
        setWebsiteEditor((prev: any) => ({
            ...prev,
            website: {
                ...prev?.website,
                pages: prev?.website.pages.map((p: any) => {
                    if (p.path === prev.activePage) {
                        // Insert the new component at the correct index
                        const newComponents = [...p.components];
                        newComponents.splice(index, 0, config);

                        // Update all indexes to match their order
                        const updatedComponents = newComponents.map((comp, idx) => ({
                            ...comp,
                            index: idx, // Ensure sequential indexes
                        }));

                        return { ...p, components: updatedComponents };
                    }
                    return p;
                }),
            },
        }));
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="w-full cursor-pointer">
                    <Plus className="rounded-full bg-background border mx-auto" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[calc(100%-2rem)] h-[calc(100%-2rem)] grid-rows-[auto_1fr]">
                <DialogHeader>
                    <DialogTitle>Select Component</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                    <div className="flex items-center gap-2 justify-center">
                        Category:
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {[...new Set(builderComponents.map(b=>b.category))].map(c=>
                                <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <ScrollArea className="h-full overflow-auto" >
                        <div className="flex flex-wrap gap-5 justify-center items-start h-full">
                            {builderComponents.filter(f=>category=='all'||f.category==category).map(b =>
                                <Card key={b.id} className="cursor-pointer w-80" onClick={() => submit({
                                    dndId: uuidv4(),
                                    id: b.id,
                                    index,
                                    name: b.name,
                                    config: b.examples[0]
                                })}>
                                    <CardHeader>
                                        <CardTitle>{b.name}</CardTitle>
                                        <CardDescription>{b.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
