"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CronologiaPrenotazioni from "./_components/CronologiaPrenotazioni";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const lemieprenotazioni = () => {
  const { data } = useSession();
  const [cronPrenot, setCronPrenot] = useState([]);

  useEffect(() => {
    data && getUserPrenotCronol();
  }, [data]); //avviamo la funct solo quando "data" è disponibile

  const getUserPrenotCronol = () => {
    GlobalApi.getUserPrenotCronol(data.user.email).then((res) => {
      console.log(res);
      setCronPrenot(res.prenotaziones);
    });
  };

  const prenotFiltrati = (tipo) => {
    const ris = cronPrenot.filter(
      (item) =>
        tipo == "prenotati" //sono nella sezione "Prenotati"?
          ? item.data >= format(new Date(), "dd MMMM yyyy", { locale: it }) //filtro allora con gli appuntamenti del giorno odierno o successivi
          : item.data < format(new Date(), "dd MMMM yyyy", { locale: it }) //altrimenti filtro con gli appuntamenti passati e li metto in "Completati"
    );

    return ris;
  };

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">Le mie prenotazioni</h2>
      <Tabs defaultValue="prenotati" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="prenotati">Prenotati</TabsTrigger>
          <TabsTrigger value="completati">Completati</TabsTrigger>
        </TabsList>
        <TabsContent value="prenotati">
          <CronologiaPrenotazioni cronPrenot={prenotFiltrati("prenotati")} />
        </TabsContent>
        <TabsContent value="completati">
          <CronologiaPrenotazioni cronPrenot={prenotFiltrati("completati")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default lemieprenotazioni;
