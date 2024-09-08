import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CronologiaPrenotazioni from "./_components/CronologiaPrenotazioni";

const leMiePrenotazioni = () => {
  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">Le mie prenotazioni</h2>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="prenotati">Prenotati</TabsTrigger>
          <TabsTrigger value="completati">Completati</TabsTrigger>
        </TabsList>
        <TabsContent value="prenotati">
          <CronologiaPrenotazioni />
        </TabsContent>
        <TabsContent value="completati">Qui vedrai la lista dei tuoi appuntamenti completati</TabsContent>
      </Tabs>
    </div>
  );
};

export default leMiePrenotazioni;
