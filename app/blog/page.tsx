import type { Metadata } from "next";

import BlogFooter from "@/components/blog/blogfooter";
import BlogMain from "@/components/blog/blogmain";
import BlogNavbar from "@/components/blog/blognavbar";

export const metadata: Metadata = {
  title: "The Dropline Journal",
  description:
    "Marketing insights, digital strategy, and design trends curated by Dublin's leading marketing agency.",
};

export default function BlogPage() {
  return (
    <>
      <BlogNavbar />
      <BlogMain />
      <BlogFooter />
    </>
  );
}
