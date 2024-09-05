"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import GlobalApi from "@/app/_services/GlobalApi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
const Settori = () => {
  const { data, status } = useSession();

  const [settori, setSettori] = useState([]);

  useEffect(() => {
    getSettori();
  }, []);

  const getSettori = () => {
    GlobalApi.getSettori().then((res) => {
      console.log("Settori: ", res.settores);
      setSettori(res.settores);
    });
  };

  if (status == "loading") {
    return <p>Caricamento...</p>;
  }

  if(status=='unauthenticated'){
    signIn('descope');
  }

  if(status=='authenticated'){
    return (
      <>
        <h2 className="font-bold text-[30px] text-center">
          Seleziona un <span className="text-primary">Settore</span>:
        </h2>
        <div className="flex flex-col md:flex-row md:justify-around items-center">
          {settori.length > 0
            ? settori.map((set, i) => (
                <Link
                  href={`/prenota/${set.id}`}
                  key={i}
                  className={`text-center flex md:flex-col justify-start md:justify-center gap-3 p-3 items-center bg-secondary my-8 w-[300px] md:w-[150px] md:h-[200px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all ease-in-out rounded-lg`}
                >
                  <Image
                    alt="icon-sector"
                    width={100}
                    height={100}
                    src={set.immagine.url}
                  />
                  <h2>{set.nome}</h2>
                </Link>
              ))
            : [1, 2, 3].map((item, i) => (
                <div
                  key={i}
                  className="flex md:flex-col justify-start md:justify-center m-3 items-center bg-slate-200 w-[300px] h-[124px] md:w-[150px] md:h-[200px] animate-pulse rounded-lg"
                ></div>
              ))}
        </div>
  
        <div className="flex justify-center mt-9">
          <Link href="/">
            <Button className="bg-primary">Indietro</Button>
          </Link>
        </div>
      </>
    );
  }  
};

export default Settori;
