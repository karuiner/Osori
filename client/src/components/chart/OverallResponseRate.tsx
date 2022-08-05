import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  VictoryPie,
  VictoryLegend,
  VictoryLabel,
  VictoryTooltip,
} from "victory";

const Svg = styled.svg``;

//---- code ----
const defaultGraphicData = {
  count: 0,
  total: 0,
  data: [
    { x: "", y: 0 },
    { x: "", y: 0 },
    { x: "", y: 100 },
  ],
};
const overallResponseData = [
  { x: "46%", y: 46 },
  { x: "22%", y: 22 },
  { x: "32%", y: 32 },
];

function OverallResponseRate({
  statData,
  count,
}: {
  statData: { total: number; yes: number; no: number; so: number };
  count: number;
}) {
  const legend = [
    { name: "네", symbol: { fill: "#9749B6" } },
    { name: "글쎄요", symbol: { fill: "#C1ADD1" } },
    { name: "아니요", symbol: { fill: "#EEA3BF" } },
  ];

  // 그래프 애니메이션
  const [icount, setcount] = useState(count);
  const [overallResponse, setOverallResponse] = useState<{
    count: number;
    total: number;
    data: { [key: string]: number | string }[];
  }>(defaultGraphicData);

  useEffect(() => {
    console.log("in");

    setOverallResponse({
      count: icount,
      total: statData.total,
      data: [
        {
          x: ((100 * statData.yes) / statData.total).toFixed(2) + "%",
          y: statData.yes,
        },
        {
          x: ((100 * statData.so) / statData.total).toFixed(2) + "%",
          y: statData.so,
        },
        {
          x: ((100 * statData.no) / statData.total).toFixed(2) + "%",
          y: statData.no,
        },
      ],
    });

    return function cleanup() {
      console.log("when use");
      setOverallResponse(defaultGraphicData);
      setcount(0);
    };
  }, [statData]);

  return (
    <>
      <Svg viewBox="0 0 300 250">
        <VictoryLabel
          textAnchor={"middle"}
          style={{ fontSize: 16 }}
          x={150}
          y={160}
          text={`${overallResponse.total} 명`}
        />
        <VictoryPie
          animate={{
            easing: "exp",
            duration: 500,
            onEnter: { duration: 500 },
          }}
          standalone={false}
          radius={60}
          innerRadius={90}
          origin={{ x: 150, y: 160 }}
          colorScale={["#9749B6", "#C1ADD1", "#EEA3BF"]}
          padAngle={1}
          data={overallResponse.data}
          labelComponent={
            <VictoryTooltip
              center={{ x: 150, y: 160 }}
              orientation="top"
              pointerLength={0}
              cornerRadius={40}
              flyoutWidth={80}
              flyoutHeight={80}
              flyoutStyle={{ fill: "white", stroke: "none" }}
              style={{ fontSize: 16 }}
              renderInPortal={false}
            />
          }
        />

        <VictoryLegend
          standalone={false}
          x={45}
          y={0}
          title="전체 응답률"
          centerTitle
          orientation="horizontal"
          gutter={{ left: 5, right: 35 }}
          borderPadding={{ top: 15 }}
          style={{
            border: { stroke: "none" },
            title: { fontSize: 15, fontWeight: 700 },
            labels: { fontSize: 10 },
          }}
          data={legend}
        />
      </Svg>
    </>
  );
}

export default OverallResponseRate;
