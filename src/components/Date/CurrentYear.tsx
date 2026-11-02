"use client";

import React, { useEffect, useState } from "react";

const CurrentYear = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return <>{year ?? "..."}</>;
};

export default CurrentYear;