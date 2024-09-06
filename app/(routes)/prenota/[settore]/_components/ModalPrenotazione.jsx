import React from "react";

// Import calendario UI
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ModalPrenotazione = ({children, operatori}) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle><h2 className="text-[26px]">Prenotazione appuntamento con <span className="text-primary">{operatori.nomeOperatore}</span></h2></SheetTitle>
            <SheetDescription>
              <p className="text-[20px]">
              Seleziona data e ora disponibili per l'operatore selezionato
              </p>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ModalPrenotazione;
