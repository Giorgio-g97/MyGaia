import React, { useEffect, useState } from "react";

// Import modale apertura UI
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// Import calendario prenotazioni
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// date-fns
import { format } from "date-fns";
import { it } from "date-fns/locale"

const ModalPrenotazione = ({ children, operatori }) => {
  const [date, setDate] = useState(new Date); //Aggiorna stato data
  const [timeSlot, setTimeSlot] = useState([]); //Aggiorna stato orari
  const [selectedTime, setSelectedTime] = useState(); //Aggiorna stato ora selezionata
  const { data } = useSession(); //Prendi dati dalla sessione utente

  useEffect(() => {
    date && getPrenByIdEData();
    console.log(date);
  }, [date]);

  const getPrenByIdEData = () => {
    GlobalApi.GetPrenByIdEData(operatori.id, date).then((res) => {
      console.log(res);
    });
  };

  // Lista orari ufficio
  useEffect(() => {
    getTime();
  }, []);

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

    setTimeSlot(timeList); //Aggiorna lo stato per renderizzarlo
  };

  //Salva prenotazione in DB
  const salvaPrenotazione = () => {
    GlobalApi.createPrenot(
      operatori.id,
      selectedTime,
      format(date, "dd MMMM yyyy", {locale: it}),
      data.user.email,
      data.user.name
    ).then(
      (res) => {
        console.log(res);
        if (res) {
          toast.success("Prenotazione effettuata!");
        }
      },
      (e) => {
        toast.error("Qualcosa è andato storto, riprova.", {
          classNames: { title: "text-red-500" },
        });
      }
    );
  };

  //Funzione per disabilitare il sabato e la domenica
  function isWeekend(date) {
    const day = date.getDay();
    return day == 0 || day == 6; // 0 is Sunday, 6 is Saturday
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              <h2 className="text-[26px]">
                Prenotazione appuntamento con{" "}
                <span className="text-primary">{operatori.nomeOperatore}</span>
              </h2>
            </SheetTitle>
            <SheetDescription>
              <h2 className="text-[20px] my-5">
                Seleziona data e ora disponibili per l'operatore selezionato
              </h2>
              <div className="flex flex-col gap-2 items-baseline">
                <p className="text-[20px] font-bold">
                  Seleziona una <span className="text-primary">data</span>
                </p>
                <Calendar
                  disabled={isWeekend}
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-7">
                <h2 className="text-[20px] font-bold">
                  Seleziona un <span className="text-primary">orario</span>
                </h2>
                {/* ITERO GLI ORARI DISPONIBILI */}
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {date?.toString().startsWith("Sat" || "Sun")
                    ? ""
                    : timeSlot.map((item, i) => (
                        <Button
                          //Se la data attuale è un sabato/domenica disabilita gli orari
                          onClick={() => setSelectedTime(item.time)}
                          className={`${
                            selectedTime == item.time &&
                            "border-primary border-[1.5px] shadow-xl text-black font-bold"
                          }`}
                          key={i}
                          variant="outline"
                        >
                          {item.time}
                        </Button>
                      ))}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-7">
            <SheetClose className="flex gap-3">
              <>
                <Button className="border-primary" variant="outline">
                  Annulla
                </Button>
                <Button
                  onClick={() => {
                    salvaPrenotazione();
                    setSelectedTime(null);
                    setDate(new Date());
                  }}
                  disabled={!(selectedTime && date)}
                >
                  Prenota
                </Button>
              </>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ModalPrenotazione;
