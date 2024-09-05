"use client";
import React, { useEffect, useState } from "react";
import CardOperatore from "./_components/CardOperatore";
import GlobalApi from "@/app/_services/GlobalApi";

const page = ({params}) => {
  const [operatori, setOperatore] = useState([]);

  useEffect(() => {
    console.log("Parametro URL: ", params)
    getOperatoriById(params.settore);
  }, [params]);

  const getOperatoriById = (id) => {
    GlobalApi.getOperatoriBySettori(id).then((res) => {
      console.log("Lista Operatori: ", res.operatoris);
      setOperatore(res.operatoris);
    });
  };

  return (
    <>
      
      <div className="flex flex-wrap justify-around items-center">
        {operatori.length > 0
          ? operatori.map((op, i) => (
              <div key={i} className="m-5">
                <CardOperatore operatori={op} />
              </div>
            ))
          : [1,2,3,4].map((item, i) => (
              <div
                key={i}
                className="h-[150px] w-[100px] rounded-lg flex flex-col justify-center items-center text-center  bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
    </>
  );
};

export default page;
