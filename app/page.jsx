"use client"; // Imposta la pagina come client page (e non server page impost. di default)
import { useEffect, useState } from "react";
import Hero from "./_components/Hero";
import Servizi from "./_components/Servizi";
import GlobalApi from "./_services/GlobalApi";

export default function Home() {
  const [servizi, setServizi] = useState([]);

  useEffect(() => {
    getServizi();
  }, []);

  const getServizi = () => {
    GlobalApi.getServizi().then((res) => {
      console.log("Servizi: ", res.servizis);
      setServizi(res.servizis);
    });
  };

  

  return (
    <>
      <Hero />

      <Servizi servizi={servizi} />
    </>
  );
}
