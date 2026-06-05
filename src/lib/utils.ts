import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGia(n: number | string): string {
  return Number(n).toLocaleString('vi-VN') + 'đ';
}

export function validateSdtVN(val: string): boolean {
  return /^(0[35789])[0-9]{8}$/.test(val.replace(/\s/g, ''));
}

export function generateOrderCode(): string {
  return 'DH' + Date.now().toString().slice(-10);
}

// ── ĐẶT URL APPS SCRIPT VÀO ĐÂY ──
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFRRJ9evuKjbOu1k4ph_fZxJoTl6hPG617XZmPOxvp98zJkvcBDDMiZ9yhZkfmovr_/exec";
export const DEMO_MODE = false; // Đổi sang false khi đã có URL thật