"use client";

import Link from "next/link";

export default function MobilePublishButton() {
  return (
    <Link
      href="/publish"
      className="md:hidden fixed bottom-20 right-5 z-[9999]"
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <div className="h-14 w-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:bg-indigo-700 transition">
  <span className="text-3xl leading-none">+</span>
</div>
    </Link>
  );
}