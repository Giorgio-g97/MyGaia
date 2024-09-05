import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <h2 className="font-bold text-[30px] text-center">
        Seleziona un <span className="text-primary">Operatore</span>:
      </h2>

      {children}

      <div className="flex justify-center mt-9">
        <Link href="/prenota">
          <Button className="bg-primary">Indietro</Button>
        </Link>
      </div>
    </>
  );
};

export default layout;
