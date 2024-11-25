import { type ClassValue, clsx } from "clsx";
import { GestureResponderEvent, Platform } from "react-native";
import { twMerge } from "tailwind-merge";
import * as WebBrowser from "expo-web-browser";

/**
 * Combines class names using clsx and then merges them with tailwind-merge.
 * This function allows for dynamic class name generation with conditional
 * and grouped class names support, optimized for Tailwind CSS.
 * This function is mostly used by `shadcn/ui` components.
 * @param inputs - An array of class values to be combined and merged.
 * @returns The merged class names as a single string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Chunks an array into smaller arrays of a specified size.
 * @param {Array<T>} array - The input array to be chunked.
 * @param {number} size - The desired size of each chunk.
 * @returns {Array<Array<T>>} - A 2D array containing the chunked elements.
 * @template T
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  return array.reduce<T[][]>((chunks, item, index) => {
    if (index % size === 0) {
      chunks.push([item]);
    } else {
      chunks[chunks.length - 1].push(item);
    }
    return chunks;
  }, []);
}

// This function removes all non-alphanumeric characters except hyphens and underscores,
// converts the string to lowercase, and replaces spaces with hyphens.
export const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]/g, "") // Remove all non-alphanumeric characters except hyphens and underscores.
    .split(" ")
    .join("-");
};

export function formatPhoneNumber(phoneNumber: string) {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Check if the number has the correct length
  if (cleaned.length !== 10) {
    return "Invalid phone number";
  }

  // Format the number
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

export const uid = function () {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12),
    ).toString(36)
  );
};

/**
 * Custom date formatting to look nice
 * @param date Date string to be formatted
 * @returns Date in the format (Full Month Day, Year) ex. (October 10, 2022)
 */
export const dateFormatting = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const openExternalLink = (e: GestureResponderEvent, link: string) => {
  if (Platform.OS !== "web") {
    // Prevent the default behavior of linking to the default browser on native.
    e.preventDefault();
    // Open the link in an in-app browser.
    const cleanedLink = link.replace(/\.$/, "");
    WebBrowser.openBrowserAsync(cleanedLink);
  }
};

export const isPhoneNumber = (string: string) => {
  const phoneRegex = /^(1[-\s.]?)?\(?[2-9]\d{2}\)?[-\s.]?\d{3}[-\s.]?\d{4}$/;
  return phoneRegex.test(string);
};
export const sanitizePhoneNumber = (phoneNumber: string): string => {
  const digitsOnly = phoneNumber
    .replace(/\+1/g, "") // Remove +1 anywhere in the string
    .replace(/[-\s()]/g, "") // Remove other special characters
    .replace(/\D/g, ""); // Keep only digits

  // Remove leading 1 if present
  const withoutLeadingOne = digitsOnly.replace(/^1/, "");

  // Take only the first 10 digits
  return withoutLeadingOne.slice(0, 10);
};
