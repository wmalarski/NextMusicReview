import Link from "next/link";
import React from "react";

export default function Footer(): JSX.Element {
  return (
    <footer>
      <div>
        © {new Date().getFullYear()}, Built with{" "}
        <Link href="https://nextjs.org/">NextJS</Link>,{" "}
        <Link href="https://www.typescriptlang.org">Typescript</Link> and{" "}
        <Link href="https://tailwindui.com">Tailwind</Link>
      </div>
    </footer>
  );
}
