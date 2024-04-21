import Link from "next/link";
import React from "react";


// TODO: Hacer logo personalizado del topo para el notfound, no tan complejo
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h4>LOGO</h4>
      <p>
        Parece que andas perdido,{" "}
        <Link href="/" className="text-blue-500 hover:underline">
          vuelve al inicio
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
