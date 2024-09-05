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
        <Button className="bg-primary">
          <Link href="/prenota">Indietro</Link>
        </Button>
      </div>
    </>
  );
};

export default layout;
