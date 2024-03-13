import { useState } from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RootState } from "../state/store";

export default function App(props: any) {
  let selectedQuarter = props.selectedQuarter;

  let [chartData] = useState<{ name: string; uv: number }[]>([
    {
      name: "Jan",
      uv: 0,
    },
    {
      name: "Feb",
      uv: 0,
    },
    {
      name: "Mar",
      uv: 0,
    },
    {
      name: "Apr",
      uv: 0,
    },
    {
      name: "May",
      uv: 0,
    },
    {
      name: "Jun",
      uv: 0,
    },
    {
      name: "Jul",
      uv: 0,
    },
    {
      name: "Aug",
      uv: 0,
    },
    {
      name: "Sep",
      uv: 0,
    },
    {
      name: "Oct",
      uv: 0,
    },
    {
      name: "Nov",
      uv: 0,
    },
    {
      name: "Dec",
      uv: 0,
    },
  ]);

  let transaction = useSelector((state: RootState) => state.transaction);
  const filterDate = () => {
    for (let i = 0; i < 12; i++) {
      let totalOfMonth = 0;
      transaction.forEach((t) => {
        if (t.date.getMonth() === i) {
          totalOfMonth = totalOfMonth + t.cost;
        }
      });
      chartData[i].uv = totalOfMonth;
    }
  };
  const QuarterFilterStart = () => {
    if (selectedQuarter === 12) {
      return 0;
    }
    if (selectedQuarter === 6 && new Date().getMonth() <= 6) {
      return 0;
    } else if (selectedQuarter === 6 && new Date().getMonth() >= 6) {
      return 6;
    }
    if (selectedQuarter === 3 && new Date().getMonth() <= 3) {
      return 0;
    }
    if (
      selectedQuarter === 3 &&
      new Date().getMonth() <= 6 &&
      new Date().getMonth() > 3
    ) {
      return 3;
    }
    if (
      selectedQuarter === 3 &&
      new Date().getMonth() <= 9 &&
      new Date().getMonth() > 6
    ) {
      return 6;
    }
    if (
      selectedQuarter === 3 &&
      new Date().getMonth() <= 12 &&
      new Date().getMonth() > 9
    ) {
      return 9;
    }
  };

  const QuarterFilterEnding = () => {
    if (selectedQuarter === 12) {
      return selectedQuarter;
    }
    if (selectedQuarter === 6 && new Date().getMonth() <= 6) {
      return 6;
    } else if (selectedQuarter === 6 && new Date().getMonth() >= 6) {
      return 12;
    }
    if (selectedQuarter === 3 && new Date().getMonth() <= 3) {
      return 3;
    }
    if (
      selectedQuarter === 3 &&
      new Date().getMonth() <= 6 &&
      new Date().getMonth() > 3
    ) {
      return 6;
    }
    if (
      selectedQuarter === 3 &&
      new Date().getMonth() <= 9 &&
      new Date().getMonth() > 6
    ) {
      return 9;
    }
    if (
      selectedQuarter === 3 &&
      new Date().getMonth() <= 12 &&
      new Date().getMonth() > 9
    ) {
      return 12;
    }
  };

  filterDate();
  return (
    <div className="h-[55vh]">
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={chartData.slice(QuarterFilterStart(), QuarterFilterEnding())}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
