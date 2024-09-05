import Image from "next/image";
import Link from "next/link";
import React from "react";

const Servizi = ({ servizi }) => {
  return (
    <div className="my-10 mx-10 md:mx-64 grid grid-cols-2 gap-20">
      {servizi.length>0?
        servizi.map((item, i) => (
          <Link
            href={item.path}
            key={i}
            className="cursor-pointer bg-secondary p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all ease-in-out rounded-lg flex flex-col justify-center items-center text-center"
          >
            <Image
              width={150}
              height={150}
              alt="service-icon"
              src={item.immagine.url}
            />

            <h2>{item.nome}</h2>
          </Link>
        ))
        :
        [1,2].map((item,i)=>(
          <div key={i} className="bg-slate-200 w-full h-[200px] animate-pulse rounded-lg">
            
          </div>
        ))
      }
    </div>
  );
};

export default Servizi;
