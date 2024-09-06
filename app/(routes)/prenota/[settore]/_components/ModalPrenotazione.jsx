import React, { useEffect, useState } from "react";

// Import modale apertura UI
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// Import calendario prenotazioni
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const ModalPrenotazione = ({ children, operatori }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);

  useEffect(() => {
    getTime();
  }, []);

  // Lista orari ufficio
  const getTime = () => {
    const timeList = [];

    //Per ogni i che parte dalle 8 fino alle 12
    for (let i = 8; i < 13; i++) {
      timeList.push({
        //Aggiungi all'array timeList
        time: i + ":00", //l'oggetto time = (es. 8:00)
      });
      timeList.push({
        time: i + ":30", //(es. 8:30 e continua con il ciclo fino alle 12:30)
      });
    }
    for (let i = 15; i <= 17; i++) {
      //Stesso discorso il pomeriggio
      timeList.push({
        time: i + ":00",
      });
      timeList.push({
        time: i + ":30",
      });
    }

    setTimeSlot(timeList);//Aggiorna lo stato per renderizzarlo
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <h2 className="text-[26px]">
                Prenotazione appuntamento con{" "}
                <span className="text-primary">{operatori.nomeOperatore}</span>
              </h2>
            </SheetTitle>
            <SheetDescription>
              <p className="text-[20px]">
                Seleziona data e ora disponibili per l'operatore selezionato
              </p>
              <div className="mt-7 flex flex-col gap-2 items-baseline">
                <h2 className="text-[20px]">
                  Seleziona una <span className="text-primary">data</span>
                </h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-7">
                <h2 className="text-[20px]">
                  Seleziona un <span className="text-primary">orario</span>
                </h2>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {timeSlot.map((item, i) => (
                    <Button key={i} variant="outline">{item.time}</Button>
                  ))}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ModalPrenotazione;
