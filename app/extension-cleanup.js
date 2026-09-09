"use client";

import { useEffect } from "react";

const EXTENSION_ATTRIBUTES = ["bis_skin_checked", "bis_register"];

export default function ExtensionCleanup() {
  useEffect(() => {
    const strip = () => {
      document.querySelectorAll("*").forEach((el) => {
        EXTENSION_ATTRIBUTES.forEach((attr) => {
          if (el.hasAttribute(attr)) el.removeAttribute(attr);
        });
        if (el.attributes) {
          Array.from(el.attributes)
            .filter((a) => a.name.startsWith("__processed_"))
            .forEach((a) => el.removeAttribute(a.name));
        }
      });
    };
    strip();
    const observer = new MutationObserver(strip);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: EXTENSION_ATTRIBUTES,
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
