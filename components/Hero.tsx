import React from "react";

import Link from "next/link";

export default function Hero() {
  return (
    <div className="absolute">
      <Link href={"/sign-up"}>
        <button>Let&#39;s get planning &#8594;</button>
      </Link>
    </div>
  );
}
