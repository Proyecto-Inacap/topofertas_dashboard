import ChartBar from "@/components/charts/ChartBar";
import { Card } from "@/components/ui/card";
import React from "react";
import { getAnalitycs } from "../api/getAnalytics";

const HomeCharts = async () => {
  const analytics = await getAnalitycs();
  return (
    <div className="flex space-x-4 mt-4">
      <Card className="w-1/2">
        <ChartBar data={analytics} />
      </Card>
      <Card className="w-1/2">
        <ChartBar data={analytics} />
      </Card>
    </div>
  );
};

export default HomeCharts;
