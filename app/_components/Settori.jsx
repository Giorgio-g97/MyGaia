import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";
import Image from "next/image";
const Settori = () => {
  const [settori, setSettori] = useState([]);

  useEffect(() => {
    getSettori();
  }, []);

  const getSettori = () => {
    GlobalApi.getSettori().then((res) => {
      console.log(res.settores);
      setSettori(res.settores);
    });
  };

  return (
    <>
      <h2 className="font-bold text-[30px] text-center">
        Seleziona un <span className="text-primary">Settore</span>:
      </h2>
      <div className="flex flex-col md:flex-row md:justify-around items-center">
        {settori.length>0?
          settori.map((set, i) => (
            <div key={i} className={`text-center flex md:flex-col justify-start md:justify-center gap-3 p-3 items-center bg-[${set?.coloreSettore?.hex}] bg-secondary my-8 w-[300px] md:w-[150px] md:h-[200px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all ease-in-out rounded-lg`}>
              <Image
                alt="icon-sector"
                width={100}
                height={100}
                src={set.immagine.url}
              />
              <h2>{set.nome}</h2>
            </div>
          ))
        :
        [1,2,3].map((item,i)=>(
          <div key={i} className="flex md:flex-col justify-start md:justify-center m-3 items-center bg-slate-200 w-[300px] h-[124px] md:w-[150px] md:h-[200px] animate-pulse rounded-lg">
            
          </div>
        ))
        }
      </div>
    </>
  );
};

export default Settori;
