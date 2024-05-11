"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar } from "recharts";
interface Props {
  open: number;
  closed: number;
  inProgress: number;
}
const IssueChart = ({ closed, inProgress, open }: Props) => {
  const data = [
    { label: "Open", value: open, fill: "red" },
    { label: "In Progress", value: inProgress, fill: "violet" },
    { label: "Closed", value: closed, fill: "green" },
  ];
  return (
    <Card>
      <ResponsiveContainer height={300} width="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
