type ClassValue = string | number | false | null | undefined;

/** Join class names, dropping anything falsy. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
