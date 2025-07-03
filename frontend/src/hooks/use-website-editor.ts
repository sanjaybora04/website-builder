import { WebsiteEditor } from '@/lib/types';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const websiteEditorAtom = atomWithStorage<WebsiteEditor|undefined>('editor',undefined)

export default function useWebsiteEditor() {
  const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom);

  return {
    websiteEditor,
    setWebsiteEditor,
    
  };
}