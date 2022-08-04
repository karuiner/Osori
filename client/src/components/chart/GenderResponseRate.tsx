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

interface answer {
  yes: number;
  no: number;
  so: number;
}

interface gender {
  count: number;
  answer: answer;
  age: age;
}
interface age {
  count: number;
  [key: string]: number;
}
interface regionData {
  name: string;
  count: number;
  male: gender;
  female: gender;
}
function GenderResponseRate({ statData }: { statData: regionData }) {
  const legend = [
    { name: "네", symbol: { fill: "#9749B6" } },
    { name: "글쎄요", symbol: { fill: "#C1ADD1" } },
    { name: "아니오", symbol: { fill: "#EEA3BF" } },
  ];

  // 그래프 애니메이션
  const [maleResponseRate, setMaleResponseRate] =
    useState<{ [key: string]: number | string }[]>(defaultGraphicData);
  const [femaleResponseRate, setFemaleResponseRate] =
    useState<{ [key: string]: number | string }[]>(defaultGraphicData);
  const [count, countF] = useState(0);
  useEffect(() => {
    let yes =
        ((100 * statData.male.answer.yes) / statData.male.count).toFixed(2) +
        "%",
      no =
        ((100 * statData.male.answer.no) / statData.male.count).toFixed(2) +
        "%",
      so =
        ((100 * statData.male.answer.so) / statData.male.count).toFixed(2) +
        "%";

    setMaleResponseRate([
      { x: yes, y: statData.male.answer.yes },
      { x: so, y: statData.male.answer.so },
      { x: no, y: statData.male.answer.no },
    ]);

    yes =
      ((100 * statData.female.answer.yes) / statData.female.count).toFixed(2) +
      "%";
    no =
      ((100 * statData.female.answer.no) / statData.female.count).toFixed(2) +
      "%";
    so =
      ((100 * statData.female.answer.so) / statData.female.count).toFixed(2) +
      "%";
    setFemaleResponseRate([
      { x: yes, y: statData.female.answer.yes },
      { x: so, y: statData.female.answer.so },
      { x: no, y: statData.female.answer.no },
    ]);
    countF(statData.count);
  }, [maleResponseRate, femaleResponseRate, count]);

  return (
    <>
      <Svg viewBox="0 0 300 300">
        <VictoryLabel
          textAnchor={"middle"}
          style={{ fontSize: 16 }}
          x={150}
          y={165}
          text={`${count} 명`}
        />
        <VictoryPie
          name="여성"
          standalone={false}
          animate={{ easing: "exp", duration: 2000 }}
          radius={40}
          innerRadius={60}
          origin={{ x: 150, y: 165 }}
          colorScale={["#9749B6", "#C1ADD1", "#EEA3BF"]}
          padAngle={1}
          data={femaleResponseRate}
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
          animate={{ easing: "exp", duration: 500 }}
          data={maleResponseRate}
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
