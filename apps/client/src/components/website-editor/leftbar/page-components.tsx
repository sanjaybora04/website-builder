'use client'

import { useAtom } from "jotai";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import AddComponent from "./add-component";
import { Copy, Edit, Grip, Trash2 } from "lucide-react";
import { Component } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import useWebsiteEditor from "@/hooks/use-website-editor";

export default function PageComponents() {
    const editor = useWebsiteEditor();

    // Find the active page once instead of chaining ?. multiple times
    const activePage = useMemo(() =>
        editor?.website?.pages?.find(p => p.path === editor.activePage),
        [editor.website?.pages, editor.activePage]
    );

    const items = activePage?.components || [];

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!active || !over || active.id === over.id) return;

        editor.moveComponent(active.id, over.id);
    };


    return (
        <div className="mt-2">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map(i => i.dndId)} strategy={verticalListSortingStrategy}>
                    <div className="w-px h-2 border mx-auto" />
                    <AddComponent index={0} />
                    <div className="w-px h-2 border mx-auto" />
                    {items.map((component) => (
                        <Comp key={component.dndId} component={component}/>
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}


function Comp({ component }: { component: Component }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: component.dndId });
    const editor = useWebsiteEditor();

    const style = {
        transform: transform ? `translateY(${transform.y}px)` : undefined,
        transition,
    };

    function onDelete(dndId: string, event: React.MouseEvent) {
        event.stopPropagation(); // Prevent select interference

        editor.deleteComponent(dndId)
    }

    function setActiveComponent(dndId: string, event: React.MouseEvent) {
        event.preventDefault()
        editor.setActiveComponent(dndId)
    }

    async function copy(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        const wrapper = {
            __sitecraft_clipboard__: true,
            type: 'component',
            payload: component,
        };

        try {
            await navigator.clipboard.writeText(JSON.stringify(wrapper));
            toast.success("Component copied!");
        } catch (err) {
            toast.error("Copy failed!!");
        }
    }

    return (
        <div key={component.dndId}>
            <div ref={setNodeRef} style={style} className={cn("p-3 bg-background flex justify-between items-center gap-1 border cursor-pointer", editor?.activeComponent == component.dndId && 'border-primary')}
                onClick={(e) => setActiveComponent(component.dndId,e)}
                title="Select"
                >
                {/* Grip icon - Only this should be draggable */}
                <span {...attributes} {...listeners} className="cursor-grab" title="Rearrange">
                    <Grip className="text-muted-foreground" />
                </span>
                <div className="max-w-36 text-ellipsis overflow-hidden">
                {component.name}
                </div>
                {/* Delete button should work normally */}
                <div className="flex gap-2">
                    <button className="cursor-pointer">
                        <Edit className="w-5 h-5 text-muted-foreground"/>
                    </button>
                    <button className="cursor-pointer"
                        onClick={(e) => copy(e)}
                        title="Copy"
                    >
                        <Copy className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button onClick={(e) => onDelete(component.dndId, e)} className="cursor-pointer" title="Delete">
                        <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                </div>
            </div>
            <div className="w-px h-2 border mx-auto" />
            <AddComponent index={component.index + 1} />
            <div className="w-px h-2 border mx-auto" />
        </div>
    );
}


