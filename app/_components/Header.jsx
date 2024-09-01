"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {

  const {data} = useSession();

  useEffect(()=> {
    console.log(data)
  },[data])

  return (
    <div className="p-5 shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Image
            alt="logo"
            className="p-3"
            src="/logo.jpg"
            width={180}
            height={100}
          />
        </Link>
      </div>

      <Button onClick={() => signIn("descope", { callbackUrl: "/dashboard" })}>
        Accedi/Registrati
      </Button>
    </div>
  );
};

export default Header;
