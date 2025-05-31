import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
