import Image from "next/image";
import React from "react";

const CardOperatore = ({ operatori }) => {
  return (
    <>
      <div className="h-[150px] w-[100px] rounded-lg flex flex-col justify-center items-center text-center  bg-secondary shadow-lg hover:scale-105 hover:shadow-2xl transition-all ease-in-out">
        <Image alt="avatar-icon" width={50} height={50} src="/avatar.svg" />
        <h2>{operatori.nomeOperatore}</h2>
      </div>
    </>
  );
};

export default CardOperatore;
