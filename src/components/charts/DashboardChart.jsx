import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#eab308"
];

const DashboardChart = ({
  selected,
  rejected,
  reviewing
}) => {

  const data = [
    {
      name: "Selected",
      value: selected
    },
    {
      name: "Rejected",
      value: rejected
    },
    {
      name: "Reviewing",
      value: reviewing
    },
  ];

  return (

    <div className="bg-white p-5 rounded-2xl shadow mt-5">

      <h2 className="text-2xl font-bold mb-5">
        Candidate Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default DashboardChart;