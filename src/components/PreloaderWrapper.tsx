"use client";

import React from "react";
import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("./Preloader"), { ssr: false });

export default function PreloaderWrapper() {
  return <Preloader />;
}
