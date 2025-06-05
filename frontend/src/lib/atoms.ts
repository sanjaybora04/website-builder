import { WebsiteEditor } from "./types";
import { atom } from "jotai";

export const websiteEditorAtom = atom<WebsiteEditor|undefined>(undefined)