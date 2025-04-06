import { atomWithStorage } from "jotai/utils";
import { WebsiteEditor } from "./types";

export const websiteEditorAtom = atomWithStorage<WebsiteEditor|undefined>('editor',undefined)