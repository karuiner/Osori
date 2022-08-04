import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  VictoryPie,
  VictoryLegend,
  VictoryLabel,
  VictoryTooltip,
  VictoryAnimation,
} from "victory";

const Svg = styled.svg``;

//---- code ----

const MaleResponseData = [
  { x: "46%", y: 46 },
  { x: "22%", y: 22 },
  { x: "32%", y: 32 },
];
const FemaleResponseData = [
  { x: "50%", y: 50 },
  { x: "15%", y: 15 },
  { x: "35%", y: 35 },
];

interface gender {
  count: number;
  yes: number;
  no: number;
  so: number;
  age: age;
}
interface age {
  [key: string]: number;
}
interface regionData {
  name: string;
  count: number;
  male: gender;
  female: gender;
}

interface subdata {
  x: string;
  y: number;
}

interface data {
  male: subdata[];
  female: subdata[];
  total: number;
}
const defaultGraphicData = [
  { x: "", y: 0 },
  { x: "", y: 0 },
  { x: "", y: 100 },
];

function GenderResponseRate({ statData }: { statData: data }) {
  const legend = [
    { name: "네", symbol: { fill: "#9749B6" } },
    { name: "글쎄요", symbol: { fill: "#C1ADD1" } },
    { name: "아니요", symbol: { fill: "#EEA3BF" } },
  ];

  // 그래프 애니메이션
  const [data, setdata] = useState({
    male: defaultGraphicData,
    female: defaultGraphicData,
    total: 0,
  });

  useEffect(() => {
    setdata(statData);
  }, [data]);

  return (
    <>
      <Svg viewBox="0 0 300 300">
        <VictoryLabel
          textAnchor={"middle"}
          style={{ fontSize: 16 }}
          x={150}
          y={165}
          text={`${statData.total} 명`}
        />

        <VictoryPie
          name="여성"
          standalone={false}
          radius={40}
          innerRadius={60}
          origin={{ x: 150, y: 165 }}
          colorScale={["#9749B6", "#C1ADD1", "#EEA3BF"]}
          padAngle={1}
          data={statData.female}
          labelComponent={
            <VictoryTooltip
              center={{ x: 150, y: 165 }}
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
        <VictoryPie
          name="남성"
          standalone={false}
          data={statData.male}
          radius={70}
          innerRadius={90}
          origin={{ x: 150, y: 165 }}
          padAngle={1}
          colorScale={["#9749B6", "#C1ADD1", "#EEA3BF"]}
          startAngle={20}
          endAngle={380}
          labelComponent={
            <VictoryTooltip
              center={{ x: 150, y: 165 }}
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
          title="남녀 전체 응답률"
          centerTitle
          orientation="horizontal"
          gutter={{ left: 5, right: 35 }}
          borderPadding={{ top: 20, bottom: 0 }}
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

export default GenderResponseRate;
