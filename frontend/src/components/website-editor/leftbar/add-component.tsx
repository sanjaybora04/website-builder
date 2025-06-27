"use client";
import { Clipboard, Plus, SquareArrowOutUpRight } from "lucide-react";
import { useSetAtom } from "jotai";
import { websiteEditorAtom } from "@/lib/atoms";
import { v4 as uuidv4 } from 'uuid'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import builderComponents from "@/lib/builder-components";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TagInput } from "@/components/ui/tag";
import Routes from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Component } from "@/lib/types";
import { toast } from "sonner";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

export default function AddComponent({ index }: { index: number }) {
    const setWebsiteEditor = useSetAtom(websiteEditorAtom);
    const [open, setOpen] = useState(false)

    // paste menu
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const [tags, setTags] = useState<any>([])

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

    const paste = async (insertIndex: number) => {
        try {
            const raw = await navigator.clipboard.readText();
            const parsed = JSON.parse(raw);

            if (
                !parsed ||
                typeof parsed !== 'object' ||
                !parsed.__sitecraft_clipboard__ ||
                parsed.type !== 'component'
            ) {
                toast.warning("Invalid clipboard data");
                return;
            }

            const copied = parsed.payload as Component;
            const newComponent = {
                ...copied,
                dndId: crypto.randomUUID(),
                index: insertIndex,
            };

            setWebsiteEditor((prev: any) => ({
                ...prev,
                website: {
                    ...prev?.website,
                    pages: prev?.website.pages.map((p: any) => {
                        if (p.path === prev.activePage) {
                            // Insert the new component at the correct index
                            const newComponents = [...p.components];
                            newComponents.splice(insertIndex, 0, newComponent);

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

            toast("Component pasted!");
        } catch (err) {
            toast.error("Paste failed");
        }
        setShowMenu(false)
    };

    return (
        <>
                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <button className="w-full cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            <Plus className="rounded-full bg-background border mx-auto" />
                        </button>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-52">
                        <ContextMenuItem inset
                            onClick={() => paste(index)}
                        >
                            <Clipboard />
                            Paste
                        </ContextMenuItem>
                        <ContextMenuItem inset
                            onClick={() => requestAnimationFrame(() => {
                                setOpen(true); // wait one tick to avoid UI conflict
                              })}
                        >
                            <Plus />
                            Select Component
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] grid-rows-[auto_1fr]">
                    <DialogHeader>
                        <DialogTitle>Select Component</DialogTitle>
                    </DialogHeader>
                    {/* <TagInput
                        allTags={[...new Set(builderComponents.flatMap(b => b.tags))].map(t => ({ label: t, value: t }))}
                        tags={tags}
                        setTags={(v) => setTags(v)}
                        className="w-80 mx-auto"
                        placeholder="Filter by tags"
                    /> */}
                    <ScrollArea className="h-[calc(100vh-7rem)]" >
                        <div className="flex flex-wrap gap-5 justify-center items-start">
                            {builderComponents.map(c => {
                                const matchCount = tags.filter((t: any) => c.tags.includes(t.value)).length
                                return { ...c, matchCount };
                            }).sort((a, b) => b.matchCount - a.matchCount).map(b =>
                                <Card key={b.id} className="cursor-pointer w-80">
                                    <CardHeader>
                                        <CardTitle>{b.name}</CardTitle>
                                    </CardHeader>
                                    <div
                                        className="relative w-full aspect-video overflow-hidden group"
                                        onMouseMove={(e) => {
                                            const target = e.currentTarget;
                                            const rect = target.getBoundingClientRect();
                                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                                            const img = target.querySelector("img") as HTMLImageElement;
                                            if (img) {
                                                img.style.transformOrigin = `${x}% ${y}%`;
                                            }
                                        }}
                                    >
                                        <img
                                            src={`/images/component-thumbnails/${b.id}.png`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-200"
                                            alt={b.name}
                                        />
                                    </div>

                                    <Button onClick={() => submit({
                                        dndId: uuidv4(),
                                        id: b.id,
                                        index,
                                        name: b.name,
                                        config: b.examples[0]
                                    })}
                                        className="mx-5"
                                    >
                                        Use</Button>
                                </Card>
                            )}
                        </div>
                    </ScrollArea>
                </DialogContent>

            </Dialog>
        </>
    );
}
