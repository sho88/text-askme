import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const BackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    return router.back();
  };

  return (
    <button onClick={handleClick} className="write-new-message">
      <Image src="/images/back.png" alt="" height="128" width="128" />
    </button>
  );
};
