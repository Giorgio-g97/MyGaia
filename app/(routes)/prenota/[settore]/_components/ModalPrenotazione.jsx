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

const ModalPrenotazione = ({ children, operatori }) => {
  const [date, setDate] = useState(new Date()); //Aggiorna stato data
  const [timeSlot, setTimeSlot] = useState([]); //Aggiorna stato orari
  const [selectedTime, setSelectedTime] = useState(); //Aggiorna stato ora selezionata
  const [slotPrenotato, setSlotPrenotato] = useState([]);
  const { data } = useSession(); //Prendi dati dalla sessione utente

  useEffect(() => {
    date && getPrenByIdEData();
  }, [date]);

  const getPrenByIdEData = () => {
    GlobalApi.GetPrenByIdEData(operatori.id, date).then((res) => {
      setSlotPrenotato(res.prenotaziones); //Salva tra gli orari prenotati
    });
  };

  //ritorna boolean filtrando l'array confrontando l'ora iterata dall'ora "slotPrenotato"
  const isOraPrenotata = (ora) => {
    return slotPrenotato.find((item) => item.ora == ora);
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
      date,
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

  const confrontaTime = (time, date) => {
    const today = new Date().toString(); //Data selezionata parsata in stringa
    const currHour = new Date().getHours(); //Ora attuale
    console.log("Ora corrente: ", currHour);
    console.log("Data selezionata: ", date?.toString());
    console.log("Data ipotetica di oggi: ", today);
    // return today == date?.toString();
    return currHour == time || today == date?.toString();
  };

  //TEST
  // useEffect(() => {
  //   console.log(confrontaTime(date));
  // }, [date])

  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-[26px]">
              Prenotazione appuntamento con{" "}
              <span className="text-primary">{operatori.nomeOperatore}</span>
            </SheetTitle>
            <SheetDescription className="text-[20px] my-5">
              Seleziona data e ora disponibili per l'operatore selezionato
              <div className="flex flex-col gap-2 items-baseline text-[20px] font-bold">
                <div>
                  Seleziona una <span className="text-primary">data</span>
                </div>
                <Calendar
                  disabled={isWeekend}
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-7">
                <div className="text-[20px] font-bold">
                  Seleziona un <span className="text-primary">orario</span>
                </div>
                {/* ITERO GLI ORARI DISPONIBILI */}
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {date?.toString().startsWith("Sat" || "Sun") ||
                  date < new Date()
                    ? ""
                    : timeSlot.map((item, i) => (
                        <Button
                          //Se l'ora iterata è uguale all'ora della prenotazione, ritorna true, disattivando quindi l'ora
                          disabled={
                            isOraPrenotata(item.time) ||
                            confrontaTime(item.time.split(":")[0], date)
                          }
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
