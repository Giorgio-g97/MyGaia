"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CronologiaPrenotazioni from "./_components/CronologiaPrenotazioni";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";

const leMiePrenotazioni = () => {
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

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">Le mie prenotazioni</h2>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="prenotati">Prenotati</TabsTrigger>
          <TabsTrigger value="completati">Completati</TabsTrigger>
        </TabsList>
        <TabsContent value="prenotati">
          <CronologiaPrenotazioni cronPrenot={cronPrenot}/>
        </TabsContent>
        <TabsContent value="completati">
          Qui vedrai la lista dei tuoi appuntamenti completati
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default leMiePrenotazioni;
