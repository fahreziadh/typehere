import { type ClassValue, clsx } from "clsx";
import { AtSign, Hand, Text, UserSquare2 } from "lucide-svelte";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const typeToLabel = (type: string) => {
    switch (type){
        case 'text':
            return {label: "Text", icon: Text, defaultTitle: ""};
        case 'greetings':
            return {label: "Intro", icon:Hand, defaultTitle: "Halo, Selamat datang!"}
        case 'fullname':
            return {label: "Nama Lengkap", icon: UserSquare2, defaultTitle: "Boleh kenalan nama kamu siapa?"};
        case 'email':
            return {label: "Email", icon: AtSign, defaultTitle: "Silahkan masukkan email kamu"};
        default:
            return {label: "Unknown", icon: Text, defaultTitle:""};
    }
}