import { Toast } from "@/components/ui/use-toast";
import { CheckIcon, CircleXIcon, LoaderCircleIcon } from "lucide-react";

const defaultErrorAttributes: Toast = {
  title: "Error",
  description: "Ha ocurrido un error",
  duration: 3000,
  action: <CircleXIcon size={24} className="text-red-500" />,
};

const defaultSuccessAttributes: Toast = {
  title: "Éxito",
  description: "Operación exitosa",
  duration: 3000,
  action: <CheckIcon size={24} className="text-green-500" />,
};

const defaultLoadingAttributes: Toast = {
  title: "Cargando...",
  description: "Cargando acción",
  action: <LoaderCircleIcon size={24} className="animate-spin" />,
};

export {
  defaultErrorAttributes,
  defaultSuccessAttributes,
  defaultLoadingAttributes,
};
