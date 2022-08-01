import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  VictoryPie,
  VictoryLegend,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip,
} from "victory";

//---- css ----
const ChartWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;

const Box = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 auto;
  border: solid 1px grey;
`;

const Svg = styled.svg``;

const StaticsTitle = styled.h2`
  margin-top: 65px;
`;

const DetailedStaticsTitle = styled.h3`
  margin-top: 40px;
`;

//---- code ----
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
const wantedGraphicData = [
  { x: "46%", y: 46 },
  { x: "22%", y: 22 },
  { x: "32%", y: 32 },
];

function Chart() {
  const legend = [
    { name: "네", symbol: { fill: "#9749B6" } },
    { name: "글쎄요", symbol: { fill: "#C1ADD1" } },
    { name: "아니오", symbol: { fill: "#EEA3BF" } },
  ];

  // 그래프 애니메이션
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData);
  }, []);

  return (
    <ChartWrapper>
      <StaticsTitle>서울 전체 통계 요약</StaticsTitle>
      <Box></Box>
      <DetailedStaticsTitle>전체 응답률</DetailedStaticsTitle>

      <>
        {/* <svg height={300} viewBox=" 0 0 500 300">
          <VictoryLabel
            textAnchor={"middle"}
            x={150}
            y={150}
            text={"123명"}
          ></VictoryLabel>
          <VictoryPie
            radius={100}
            standalone={false}
            origin={{ x: 150, y: 150 }}
            innerRadius={50}
            labelComponent={
              <VictoryTooltip
                center={{ x: 150, y: 150 }}
                pointerWidth={0}
                cornerRadius={50}
                pointerLength={0}
                flyoutWidth={90}
                flyoutHeight={90}
                flyoutStyle={{ fill: "white", stroke: "none" }}
                style={{ fontSize: 20 }}
              />
            }
          ></VictoryPie>
          <VictoryLegend
            x={300}
            y={80}
            title="Legend"
            gutter={30}
            style={{ border: { stroke: "black" } }}
            centerTitle
            standalone={false}
          ></VictoryLegend>
        </svg> */}
        <Svg height={"30vh"} viewBox="0 0 450 300">
          <VictoryLabel
            textAnchor={"middle"}
            style={{ fontSize: 25 }}
            x={150}
            y={150}
            text={"496 명"}
          />
          <VictoryPie
            origin={{ x: 150, y: 150 }}
            standalone={false}
            animate={{ easing: "exp", duration: 500 }}
            radius={150}
            innerRadius={65}
            colorScale={["#9749B6", "#C1ADD1", "#EEA3BF"]}
            padAngle={1}
            data={graphicData}
            labelComponent={
              <VictoryTooltip
                center={{ x: 150, y: 150 }}
                pointerWidth={0}
                cornerRadius={50}
                pointerLength={0}
                flyoutWidth={90}
                flyoutHeight={90}
                flyoutStyle={{ fill: "white", stroke: "none" }}
                style={{ fontSize: 30 }}
              />
            }
          />

          <VictoryLegend
            x={330}
            y={80}
            title="범례"
            centerTitle
            orientation="vertical"
            gutter={{ left: 5, right: 50 }}
            borderPadding={{ top: 5, bottom: 5 }}
            style={{
              border: { stroke: "#878787" },
              title: { fontSize: 20 },
              labels: { fontSize: 15 },
            }}
            data={legend}
            standalone={false}
          />
        </Svg>
      </>

      <DetailedStaticsTitle>남녀 전체 응답률</DetailedStaticsTitle>

      <>
        {/* <svg height={300} viewBox=" 0 0 500 300">
          <VictoryLabel
            textAnchor={"middle"}
            x={150}
            y={150}
            text={"123명"}
          ></VictoryLabel>
          <VictoryPie
            radius={100}
            standalone={false}
            origin={{ x: 150, y: 150 }}
            innerRadius={50}
            labelComponent={
              <VictoryTooltip
                center={{ x: 150, y: 150 }}
                pointerWidth={0}
                cornerRadius={50}
                pointerLength={0}
                flyoutWidth={90}
                flyoutHeight={90}
                flyoutStyle={{ fill: "white", stroke: "none" }}
                style={{ fontSize: 20 }}
              />
            }
          ></VictoryPie>
          <VictoryLegend
            x={300}
            y={80}
            title="Legend"
            gutter={30}
            style={{ border: { stroke: "black" } }}
            centerTitle
            standalone={false}
          ></VictoryLegend>
        </svg> */}
        <Svg height={"30vh"} viewBox="0 0 450 300">
          <VictoryLabel
            textAnchor={"middle"}
            style={{ fontSize: 25 }}
            x={150}
            y={150}
            text={"496 명"}
          />
          <VictoryPie
            origin={{ x: 150, y: 150 }}
            standalone={false}
            animate={{ easing: "exp", duration: 500 }}
            radius={100}
            innerRadius={65}
            colorScale={["#9749B6", "#C1ADD1", "#EEA3BF"]}
            padAngle={1}
            data={graphicData}
            labelComponent={
              <VictoryTooltip
                center={{ x: 150, y: 150 }}
                pointerWidth={0}
                cornerRadius={50}
                pointerLength={0}
                flyoutWidth={90}
                flyoutHeight={90}
                flyoutStyle={{ fill: "white", stroke: "none" }}
                style={{ fontSize: 30 }}
              />
            }
          />
          <VictoryPie
            origin={{ x: 150, y: 150 }}
            standalone={false}
            data={graphicData}
            radius={150}
            innerRadius={110}
            padAngle={1}
            colorScale={["tomato", "yellow", "green"]}
            startAngle={20}
            endAngle={380}
            labelComponent={
              <VictoryTooltip
                center={{ x: 150, y: 150 }}
                pointerWidth={0}
                cornerRadius={50}
                pointerLength={0}
                flyoutWidth={90}
                flyoutHeight={90}
                flyoutStyle={{ fill: "white", stroke: "none" }}
                style={{ fontSize: 30 }}
              />
            }
          />

          <VictoryLegend
            x={330}
            y={80}
            title="범례"
            centerTitle
            orientation="vertical"
            gutter={{ left: 5, right: 50 }}
            borderPadding={{ top: 5, bottom: 5 }}
            style={{
              border: { stroke: "#878787" },
              title: { fontSize: 20 },
              labels: { fontSize: 15 },
            }}
            data={legend}
            standalone={false}
          />
        </Svg>
      </>
      {/* <VictoryChart width={400} height={200}>
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" }, // x축
            ticks: { stroke: "transparent" }, // y축
            tickLabels: { fill: "transparent" }, // x축 라벨 안 보이게하기
          }}
        />
        <Svg viewBox="0 0 400 200">
          <VictoryPie
            height={200}
            standalone={false}
            animate={{ easing: "exp", duration: 500 }}
            radius={45}
            innerRadius={70}
            colorScale={["#9749B6", "#C1ADD1", "#EEA3BF"]}
            padAngle={1}
            data={graphicData}
            labelComponent={
              <VictoryTooltip
                x={200}
                y={145}
                orientation="top"
                pointerLength={0}
                cornerRadius={45}
                flyoutWidth={90}
                flyoutHeight={90}
                flyoutStyle={{ fill: "white", stroke: "none" }}
                style={{ fontSize: 20 }}
              />
            }
          />
          <VictoryPie
            height={200}
            standalone={false}
            data={graphicData}
            radius={75}
            innerRadius={100}
            padAngle={1}
            colorScale={["tomato", "yellow", "green"]}
            startAngle={20}
            endAngle={380}
            labelComponent={
              <VictoryTooltip
                x={200}
                y={145}
                orientation="top"
                pointerLength={0}
                cornerRadius={45}
                flyoutWidth={90}
                flyoutHeight={90}
                flyoutStyle={{ fill: "white", stroke: "none" }}
                style={{ fontSize: 20 }}
              />
            }
          />

          <VictoryLabel
            textAnchor={"middle"}
            style={{ fontSize: 20 }}
            x={200}
            y={100}
            text="496 명"
          />
        </Svg>

        <VictoryLegend
          x={316}
          y={60}
          title="범례"
          centerTitle
          orientation="vertical"
          gutter={{ left: 5, right: 50 }}
          borderPadding={{ top: 5, bottom: 5 }}
          style={{
            border: { stroke: "#878787" },
            title: { fontSize: 13 },
            labels: { fontSize: 10 },
          }}
          data={legend}
        />
      </VictoryChart> */}
    </ChartWrapper>
  );
}

export default Chart;
