import ChartBar from "@/components/charts/ChartBar";
import { Card } from "@/components/ui/card";
import React from "react";
import { getAnalitycs } from "../api/getAnalytics";

const HomeCharts = async () => {
  const analytics = await getAnalitycs();
  return (
    <div className="grid grid-auto-fit-[30rem] gap-4 mt-4 flex-wrap">
      <Card>
        <ChartBar data={analytics} />
      </Card>
      <Card>
        <ChartBar data={analytics} />
      </Card>
    </div>
  );
};

export default HomeCharts;
