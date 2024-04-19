import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ExternalLink,
  RedoDot,
  ShoppingBasket,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import HomeCharts from "./HomeCharts";

// Card examples analytics
const cardExamples = [
  {
    title: "Vistas de productos",
    icon: ShoppingBasket,
    value: "10 vistas",
    description: "Vistas totales a tus productos en el mes",
  },
  {
    title: "Redirigidos a la tienda",
    icon: RedoDot,
    value: "10 redirecciones",
    description: "Redirecciones totales hacia la tienda",
  },
  {
    title: "Producto más visitado",
    icon: TrendingUp,
    value: "512 GB SSD NVMe",
    href: "/products/1",

    description: "Producto más visitado en el mes",
  },
  {
    title: "Producto menos visitado",
    icon: TrendingDown,

    value: "Ismael Benjamin Nico 4080",

    href: "/products/2",

    description: "Producto menos visitado en el mes",
  },
];

const HomeOverview = async () => {
  return (
    <div>
      <div className="flex space-x-4 mt-4">
        {cardExamples.map((card, index) => (
          <Card
            key={index}
            className="w-1/4 px-2 hover:border-primary/30 transition-all"
          >
            <CardHeader className="flex flex-row justify-between items-center">
              <h4 className="font-semibold">{card.title}</h4>
              <card.icon className="w-6 h-6" />
            </CardHeader>
            <CardContent className="font-bold">
              <div className="flex gap-1">
                {card.href ? (
                  <Link
                    href="/products/1"
                    className="hover:bg-primary/10 p-2  flex rounded-lg items-center w-fit gap-2"
                  >
                    {card.value}{" "}
                    <ExternalLink className="w-4 h-4 inline" />
                  </Link>
                ) : (
                  <span className="p-2">{card.value}</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="text-gray-500 text-sm">
              <span>{card.description}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
      <HomeCharts />
    </div>
  );
};

export default HomeOverview;
