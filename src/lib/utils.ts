import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function downloadFile(path: string) {
    const response = await fetch(path);
    const blob = await response.blob();
    const urlObject = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    const file = path.split('/')[path.split('/').length - 1].split('.');
    link.href = urlObject;
    link.download = file[0]
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlObject);
}