import { useSession } from "next-auth/react";
import React from "react";

const Hero = () => {
  const { data } = useSession();

  console.log(data)

  return (
    <>
      <h2 className="px-3 font-bold text-center text-[30px]">
        Benvenuto{" "} 
        {data ? (
          <span className="text-primary">
            {data?.user?.name.toString().split(" ")[0]}
          </span>
        ) : (
          <span className="text-slate-500">Utente Ospite</span>
        )}
        <br />
        {" "}{!data?"Accedi al portale e" : ""} seleziona un <span className="text-primary">Servizio</span>
      </h2>
    </>
  );
};

export default Hero;
