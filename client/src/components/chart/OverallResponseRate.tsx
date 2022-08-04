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
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
const overallResponseData = [
  { x: "46%", y: 46 },
  { x: "22%", y: 22 },
  { x: "32%", y: 32 },
];

function OverallResponseRate({
  statData,
}: {
  statData: { total: number; yes: number; no: number; so: number };
}) {
  const legend = [
    { name: "네", symbol: { fill: "#9749B6" } },
    { name: "글쎄요", symbol: { fill: "#C1ADD1" } },
    { name: "아니오", symbol: { fill: "#EEA3BF" } },
  ];

  // 그래프 애니메이션
  const [overallResponse, setOverallResponse] =
    useState<{ [key: string]: number | string }[]>(defaultGraphicData);
  const [count, countF] = useState(0);
  useEffect(() => {
    let yes = ((100 * statData.yes) / statData.total).toFixed(2) + "%",
      no = ((100 * statData.no) / statData.total).toFixed(2) + "%",
      so = ((100 * statData.so) / statData.total).toFixed(2) + "%";

    setOverallResponse([
      { x: yes, y: statData.yes },
      { x: so, y: statData.so },
      { x: no, y: statData.no },
    ]);
    countF(statData.total);
  }, [overallResponse, count]);

  return (
    <>
      <Svg viewBox="0 0 300 250">
        <VictoryLabel
          textAnchor={"middle"}
          style={{ fontSize: 16 }}
          x={150}
          y={160}
          text={`${count} 명`}
        />
        <VictoryPie
          standalone={false}
          animate={{
            easing: "exp",
            duration: 1000,
            // onLoad: { duration: 1000 },
          }}
          radius={60}
          innerRadius={90}
          origin={{ x: 150, y: 160 }}
          colorScale={["#9749B6", "#C1ADD1", "#EEA3BF"]}
          padAngle={1}
          data={overallResponse}
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
