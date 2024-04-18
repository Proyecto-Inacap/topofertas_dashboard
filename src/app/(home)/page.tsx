import ChartBar from "@/components/charts/ChartBar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getAnalitycs } from "@/core/products/api/getAnalytics";
import {
  ExternalLink,
  RedoDot,
  ShoppingBasket,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const HomePage = async () => {

  const analytics = await getAnalitycs();
  return (
    <div>
      <h2 className="text-2xl font-semibold">Vista general</h2>
      <div className="flex space-x-4 mt-4">
        <Card className="w-1/4 px-2 hover:border-primary/30 transition-all">
          <CardHeader className="flex flex-row justify-between items-center">
            <h4 className="font-semibold">Vistas de productos</h4>
            <ShoppingBasket className="w-6 h-6" />
          </CardHeader>
          <CardContent className="font-bold">
            <div className="flex gap-1 py-2">
              <span>10</span> vistas
            </div>
          </CardContent>
          <CardFooter className="text-gray-500 text-sm">
            <span>Vistas totales a tus productos en el mes</span>
          </CardFooter>
        </Card>
        
        <Card className="w-1/4 px-2 hover:border-primary/30 transition-all">
          <CardHeader className="flex flex-row justify-between items-center">
            <h4 className="font-semibold">Redirigidos a la tienda</h4>
            <RedoDot className="w-6 h-6" />
          </CardHeader>
          <CardContent className="font-bold">
            <div className="flex gap-1 py-2">
              <span>10</span> redirecciones
            </div>
          </CardContent>
          <CardFooter className="text-gray-500 text-sm">
            <span>Redirecciones totales hacia la tienda</span>
          </CardFooter>
        </Card>
        <Card className="w-1/4 px-2 hover:border-primary/30 transition-all">
          <CardHeader className="flex flex-row justify-between   items-center">
            <h4 className="font-semibold">Producto más visitado</h4>
            <TrendingUp className="w-6 h-6" />
          </CardHeader>

          <CardContent className="font-bold">
            <Link
              href="/products/1"
              className="hover:bg-primary/10 p-2  flex rounded-lg items-center w-fit gap-2"
            >
              512 GB SSD NVMe{" "}
              <ExternalLink className="w-4 h-4 inline" />
            </Link>
          </CardContent>
          <CardFooter className="text-gray-500 text-sm">
            <span>Producto más visitado en el mes</span>
          </CardFooter>
        </Card>
        <Card className="w-1/4 px-2 hover:border-primary/30 transition-all">
          <CardHeader className="flex flex-row justify-between items-center">
            <h4 className="font-semibold">Producto menos visitado</h4>
            <TrendingDown className="w-6 h-6" />
          </CardHeader>
          <CardContent className="font-bold">
          <Link
              href="/products/1"
              className="hover:bg-primary/10 p-2  flex rounded-lg items-center w-fit gap-2"
            >
              Ismael Benjamin Nico 4080
              <ExternalLink className="w-4 h-4 inline" />
            </Link>
          </CardContent>
          <CardFooter className="text-gray-500 text-sm">
            <span>Producto menos visitado en el mes</span>
          </CardFooter>
        </Card>
      </div>
      <div className="flex space-x-4 mt-4">
        <Card className="w-1/2">
          <ChartBar data={analytics}/>
        </Card>
        <Card className="w-1/2">
          <ChartBar data={analytics}/>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
