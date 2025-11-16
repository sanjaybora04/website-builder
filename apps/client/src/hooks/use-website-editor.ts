import api from '@/lib/api';
import { Component, Page, WebsiteEditor } from '@/lib/types';
import { deepMergeWithDeletion } from '@/lib/utils';
import { arrayMove } from '@dnd-kit/sortable';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { toast } from 'sonner';

export const websiteEditorAtom = atomWithStorage<WebsiteEditor | undefined>('editor', undefined)

export default function useWebsiteEditor() {
  const [editor, setEditor] = useAtom(websiteEditorAtom);

  async function load(websiteId: string) {
    const res = await api.website.get(websiteId)
    setEditor({
      website: res.data,
      activePage: res.data.pages?.[0]?.path,
      leftSidebarOpen: true,
      previewSize: 'desktop'
    })
  }

  async function publish() {
    const id = toast.loading('Publishing website...')
    try {
      await api.website.update(editor?.website?.id, { pages: editor?.website?.pages })
      toast.success('Website Published!!!', { id })
    } catch {
      toast.dismiss(id)
    }
  }

  function setPreviewSize(mode: 'desktop' | 'mobile') {
    setEditor((prev: any) => ({ ...prev, previewSize: mode }))
  }

  function toogleLeftSidebar() {
    setEditor((prev: any) => ({ ...prev, leftSidebarOpen: !prev?.leftSidebarOpen }))
  }

  function addPage(page: Page) {
    if (editor?.website.pages?.some(p => p.path == page.path)) {
      toast.error("Path already exists.\nPlease add a different path")
      return false
    }

    setEditor((prev: any) => ({
      ...prev,
      website: {
        ...prev?.website,
        pages: [...prev?.website?.pages || [], page]
      }
    }))

    return true
  }

  function updatePage(path: string, page: Page) {

    setEditor((prev: any) => ({
      ...prev, website: {
        ...prev?.website,
        pages: prev?.website?.pages?.map((p: any) => {
          if (p.path != path) return p;
          return page
        })
      }
    }))

    return true
  }

  function deletePage(path: string) {
    setEditor((prev: any) => ({
      ...prev,
      activePage: prev?.activePage == path ? undefined : prev?.activePage, // if delete page is active set activepage to undefined
      activeComponent: prev?.activePage == path ? undefined : prev?.activeComponent, // if component of deleted page is active then set it to undefined
      website: { ...prev?.website, pages: prev?.website?.pages?.filter((p: any) => p.path != path) }
    }))
  }

  function setActivePage(path: string) {
    setEditor((prev: any) => ({ ...prev, activePage: path, activeComponent: undefined }))
  }

  function addComponent(index: number, component: Component) {
    setEditor((prev: any) => ({
      ...prev,
      website: {
        ...prev?.website,
        pages: prev?.website.pages.map((p: any) => {
          if (p.path === prev.activePage) {
            // Insert the new component at the correct index
            const newComponents = [...p.components];
            newComponents.splice(index, 0, component);

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
  }

  function deleteComponent(dndId: string | undefined) {
    setEditor((prev: any) => {
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
        activeComponent: prev?.activeComponent == dndId ? undefined : prev?.activeComponent, // if active component was deleted, set active component to null
        website: {
          ...prev?.website,
          pages: updatedPages,
        },
      };
    });
  }

  function moveComponent(fromId: string, toId: string) {
    const activePageComponents = editor?.website?.pages?.find(p => p.path === editor.activePage)?.components;
    if (!activePageComponents) return;
    const oldIndex = activePageComponents?.findIndex((item) => item.dndId === fromId);
    const newIndex = activePageComponents?.findIndex((item) => item.dndId === toId);
    const newItems = arrayMove(activePageComponents, oldIndex, newIndex).map((item, idx) => ({ ...item, index: idx }));

    // Update only the active page, keeping the rest unchanged
    setEditor((prev: any) => ({
      ...prev,
      website: {
        ...prev.website,
        pages: prev.website.pages.map((p: any) =>
          p.path === prev.activePage ? { ...p, components: newItems } : p
        ),
      },
    }));
  }

  function setActiveComponent(dndId: string | undefined) {
    setEditor((prev: any) => ({ ...prev, activeComponent: dndId }))
  }

  function updateComponent(config: any) {
    setEditor((prev: any) => ({
      ...prev,
      website: {
        ...prev.website,
        pages: prev.website.pages.map((p: any) => {
          if (p.path === prev.activePage) {
            return {
              ...p,
              components: p.components.map((comp: any) =>
                comp.dndId === prev.activeComponent
                  ? {
                    ...comp,
                    config: deepMergeWithDeletion(comp.config, config),
                  }
                  : comp
              ),
            };
          }
          return p;
        }),
      },
    }));
  }

  return {
    website: editor?.website,
    leftSidebarOpen: editor?.leftSidebarOpen,
    activePage: editor?.activePage,
    activeComponent: editor?.activeComponent,
    previewSize: editor?.previewSize,
    load,
    toogleLeftSidebar,
    publish,
    setPreviewSize,
    addPage,
    updatePage,
    deletePage,
    setActivePage,
    addComponent,
    deleteComponent,
    moveComponent,
    setActiveComponent,
    updateComponent,
  };
}