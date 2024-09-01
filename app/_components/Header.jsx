import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="p-5 shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <Image
          alt="logo"
          className="p-3"
          src="/logo.svg"
          width={180}
          height={100}
        />
        </div>
        <div className="md:flex items-center gap-6 hidden">
          <h2 className="transition-all ease-in-out hover:scale-105 hover:text-primary">Home</h2>
          <h2 className="transition-all ease-in-out hover:scale-105 hover:text-primary">Servizi</h2>
          <h2 className="transition-all ease-in-out hover:scale-105 hover:text-primary">Chi siamo</h2>
        </div>
      
        <Button>Accedi/Registrati</Button>
    </div>
  );
};

export default Header;
