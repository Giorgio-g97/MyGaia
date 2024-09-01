"use client"
import { useEffect } from "react";
import Hero from "./_components/Hero";
import Servizi from "./_components/Servizi";
import GlobalApi from "./_services/GlobalApi";

export default function Home() {

  useEffect(() => {
    getServizi();
  },[])

  const getServizi = () =>{
    GlobalApi.getServizi().then(res => console.log(res))
  }

  return (
    <>
      <Hero />

      <Servizi />
    </>
  );
}
