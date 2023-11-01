"use client";
import { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    sale: 12500,
    profit: 8400,
  },
  {
    name: "Feb",
    sale: 8000,
    profit: 4400,
  },
  {
    name: "March",
    sale: 10000,
    profit: 7600,
  },
  {
    name: "April",
    sale: 15000,
    profit: 5600,
  },
  {
    name: "May",
    sale: 3600,
    profit: 2400,
  },
  {
    name: "June",
    sale: 11080,
    profit: 8497,
  },
  {
    name: "July",
    sale: 7654,
    profit: 4543,
  },
  {
    name: "Aug",
    sale: 17663,
    profit: 11534,
  },
  {
    name: "Oct",
    sale: 13065,
    profit: 10863,
  },
  {
    name: "Nov",
    sale: 14058,
    profit: 12900,
  },
  {
    name: "Dec",
    sale: 15158,
    profit: 11000,
  },
];

const GraphSection = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AreaChart width={800} height={270} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#696cff" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#696cff" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#03c3ec" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#03c3ec" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Tooltip />
      <Area
        type="monotone"
        dataKey="sale"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <Area
        type="monotone"
        dataKey="profit"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  );
};

export default GraphSection;
