"use client";

// Import Shadcn
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import React, { useEffect } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data } = useSession(); //Recupero i dati della sessione (es. Google, Email ecc..)

  useEffect(() => {
    console.log(data);
  }, [data]);

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

      <div>
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                alt="icon-user"
                className="rounded-full"
                width={50}
                height={50}
                src={data?.user?.image}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 text-right">
              <DropdownMenuLabel>
                {data?.user?.name.toString().split(" ")[0]}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-end">
                Profilo
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-end">
                Le mie prenotazioni
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut()}
                className="flex justify-end"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("descope", { callbackUrl: "/" })}>
            Accedi/Registrati
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
