import { getDictionary } from "@/content";
import { ogContentType, ogImage, ogSize } from "@/components/site/og";

const t = getDictionary("en");

export const alt = `${t.meta.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpengraphImage() {
  return ogImage("en");
}
