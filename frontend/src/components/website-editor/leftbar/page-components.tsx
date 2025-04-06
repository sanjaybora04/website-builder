'use client'

import { useAtom } from "jotai";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { websiteEditorAtom } from "@/lib/atoms";
import { useMemo } from "react";
import AddComponent from "./add-component";
import { Grip,Trash2 } from "lucide-react";
import { Component } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function PageComponents() {
    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom);

    // Find the active page once instead of chaining ?. multiple times
    const activePage = useMemo(() =>
        websiteEditor?.website?.pages?.find(p => p.path === websiteEditor.activePage),
        [websiteEditor]
    );

    const items = activePage?.components || [];

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!active || !over || active.id === over.id) return;

        const oldIndex = items.findIndex((item) => item.dndId === active.id);
        const newIndex = items.findIndex((item) => item.dndId === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex).map((item, idx) => ({ ...item, index: idx }));

        // Update only the active page, keeping the rest unchanged
        setWebsiteEditor((prev: any) => ({
            ...prev,
            website: {
                ...prev.website,
                pages: prev.website.pages.map((p: any) =>
                    p.path === prev.activePage ? { ...p, components: newItems } : p
                ),
            },
        }));
    };

    return (
        <div className="mt-2">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map(i => i.dndId)} strategy={verticalListSortingStrategy}>
                    <div className="w-px h-2 border mx-auto" />
                    <AddComponent index={0} />
                    <div className="w-px h-2 border mx-auto" />
                    {items.map((component) => (
                        <div key={component.dndId}>
                            <SortableItem component={component} />
                            <div className="w-px h-2 border mx-auto" />
                            <AddComponent index={component.index + 1} />
                            <div className="w-px h-2 border mx-auto" />
                        </div>
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}


function SortableItem({ component }: { component: Component }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.dndId });
    const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom);

    const style = {
        transform: transform ? `translateY(${transform.y}px)` : undefined,
        transition,
    };

    function onDelete(dndId: string, event: React.MouseEvent) {
        event.stopPropagation(); // Prevent select interference

        setWebsiteEditor((prev:any) => {
            const updatedPages = prev?.website?.pages?.map((p: any) => {
                if (p.path === prev.activePage) {
                    const filteredComponents = p.components.filter((c: any) => c.dndId !== dndId);

                    // Re-index components after deletion
                    const reIndexedComponents = filteredComponents.map((c: any, idx: number) => ({
                        ...c,
                        index: idx,
                    }));

                    return { ...p, components: reIndexedComponents };
                }
                return p;
            });

            return {
                ...prev,
                activeComponent:prev?.activeComponent==dndId?undefined:prev?.activeComponent, // if active component was deleted, set active component to null
                website: {
                    ...prev?.website,
                    pages: updatedPages,
                },
            };
        });
    }

    function setActiveComponent(dndId: string, event: React.MouseEvent) {
        event.preventDefault()
        console.log('hello')
        setWebsiteEditor((prev: any) => ({ ...prev, activeComponent: dndId }))
    }

    return (
        <div ref={setNodeRef} style={style} className={cn("p-3 bg-background flex justify-between items-center gap-1 border cursor-pointer", websiteEditor?.activeComponent == component.dndId && 'border-primary')}
            onClick={(e) => setActiveComponent(component.dndId, e)}>
            {/* Grip icon - Only this should be draggable */}
            <span {...attributes} {...listeners} className="cursor-grab">
                <Grip className="text-muted-foreground" />
            </span>

            {component.name}

            {/* Delete button should work normally */}
            <button onClick={(e) => onDelete(component.dndId, e)} className="cursor-pointer">
                <Trash2 className="w-5 h-5 text-red-500" />
            </button>
        </div>
    );
}


