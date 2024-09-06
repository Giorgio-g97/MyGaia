"use client";
import React, { useEffect, useState } from "react";
import CardOperatore from "./_components/CardOperatore";
import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";

const page = ({ params }) => {
  const [operatori, setOperatore] = useState([]);

  const { data, status } = useSession();

  useEffect(() => {
    console.log("Parametro URL: ", params);
    getOperatoriById();
  }, [params]);

  const getOperatoriById = () => {
    GlobalApi.getOperatoriBySettori(params.settore).then((res) => {
      console.log("Lista Operatori: ", res.operatoris);
      setOperatore(res.operatoris);
    });
  };

  if (status == "loading") {
    return <p>Caricamento...</p>;
  }

  if (status == "unauthenticated") {
    signIn("descope");
  }

  if (status == "authenticated") {
    return (
      <>
        <div className="flex flex-wrap justify-around items-center cursor-pointer">
          {operatori.length > 0
            ? operatori.map((op, i) => (
               
                  <div key={i} className="m-5">
                    <CardOperatore operatori={op} />
                  </div>
                
              ))
            : [1, 2, 3, 4].map((item, i) => (
                <div
                  key={i}
                  className="h-[150px] w-[100px] rounded-lg flex flex-col justify-center items-center text-center  bg-slate-200 animate-pulse"
                ></div>
              ))}
        </div>
      </>
    );
  }
};

export default page;
