import { ImageInputValue } from "@/components/ui/editor/image-input"
import { clsx, type ClassValue } from "clsx"
import { CSSProperties } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * This function takes the rgb value and converts it to hex
 * @param color 
 * @returns 
 */
export function rgbToHex(color: string): string {
  if (color.startsWith('#')) return color

  const result = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/.exec(color)
  if (!result) return '#000000'

  const [, r, g, b] = result
  return (
    '#' +
    [r, g, b]
      .map((x) => parseInt(x).toString(16).padStart(2, '0'))
      .join('')
  )
}

/**
 * This function takes a target object and a source object and it merges the source to the target
 * @param target Target Object
 * @param source Source Object
 * @returns 
 */
export function deepMergeWithDeletion(target: any, source: any): any {
  const output = { ...target }

  for (const key in source) {
      const sourceVal = source[key]
      const targetVal = target?.[key]

      if (sourceVal === undefined) {
          delete output[key]
      } else if (
          typeof sourceVal === 'object' &&
          !Array.isArray(sourceVal) &&
          typeof targetVal === 'object' &&
          targetVal !== null
      ) {
          output[key] = deepMergeWithDeletion(targetVal, sourceVal)
      } else {
          output[key] = sourceVal
      }
  }

  return output
}

/**
 * Generate Layout style for components
 * @returns 
 */
export function layoutStyleGenerator(layout:any){
  let style: CSSProperties = {};

  if (layout?.backgroundImage?.url) {
    style = {
      backgroundImage: `url(${layout?.backgroundImage.url})`,
      backgroundSize: layout?.backgroundImage.objectFit || 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  } else if (layout?.backgroundColor) {
    style = {
      backgroundColor:layout.backgroundColor,
    };
  } else {
    style.background = "none";
  }

  if (layout?.color) {
    style.color = layout?.color;
  }

  return style;
}