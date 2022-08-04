import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import GenderResponseRate from "./chart/GenderResponseRate";
import OverallResponseRate from "./chart/OverallResponseRate";
import StaticsBox from "./chart/StaticsBox";

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 100vh;
  margin: 0;
  padding: 50px 20px 0 0;
  text-align: center;
  justify-content: space-around;
  align-items: center;
`;

const StaticsTitle = styled.h2``;

const StatsArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
`;

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

interface data1 {
  total: number;
  yes: number;
  no: number;
  so: number;
}
interface data2 {
  female: number;
  male: number;
  femaxc: number;
  femaxl: string;
  memaxc: number;
  memaxl: string;
}
interface subdata {
  x: string;
  y: number;
}

interface data3 {
  male: subdata[];
  female: subdata[];
  total: number;
}
interface staticData {
  data1: data1;
  data2: data2;
  data3: data3;
}

function Chart({ region }: { region: string }) {
  const [responseData, setResponseData] = useState<staticData>({
    data1: { total: 0, yes: 0, no: 0, so: 0 },
    data2: { female: 0, male: 0, femaxc: 0, femaxl: "", memaxc: 0, memaxl: "" },
    data3: { male: [], female: [], total: 0 },
  });
  const [isget, isgetset] = useState("");

  if (isget !== region) {
    axios.get("http://localhost:4000/card/regiondata/" + region).then((x) => {
      let data = x.data[0];

      let data1 = {
        total: data.count,
        yes: data.female.yes + data.male.yes,
        no: data.female.no + data.male.no,
        so: data.female.so + data.male.so,
      };
      let fage = data.female.age;
      let femax = 0,
        felabel = "";
      let mage = data.male.age;
      let memax = 0,
        melabel = "";
      for (let i in fage) {
        if (i !== "count") {
          if (fage[i] > femax) {
            femax = fage[i];
            felabel = i;
          }
          if (mage[i] > memax) {
            memax = mage[i];
            melabel = i;
          }
        }
      }

      let data2 = {
        female: data.female.count,
        male: data.male.count,
        femaxc: femax,
        femaxl: felabel,
        memaxc: memax,
        memaxl: melabel,
      };

      let yes = ((100 * data.male.yes) / data.male.count).toFixed(2) + "%",
        no = ((100 * data.male.no) / data.male.count).toFixed(2) + "%",
        so = ((100 * data.male.so) / data.male.count).toFixed(2) + "%";

      yes = ((100 * data.female.yes) / data.female.count).toFixed(2) + "%";
      no = ((100 * data.female.no) / data.female.count).toFixed(2) + "%";
      so = ((100 * data.female.so) / data.female.count).toFixed(2) + "%";

      let data3 = {
        male: [
          { x: yes, y: data.male.yes },
          { x: so, y: data.male.so },
          { x: no, y: data.male.no },
        ],
        female: [
          { x: yes, y: data.female.yes },
          { x: so, y: data.female.so },
          { x: no, y: data.female.no },
        ],
        total: data.count,
      };

      setResponseData({ data1: data1, data2: data2, data3: data3 });
      isgetset(region);
    });
  }

  return (
    <ChartWrapper>
      <StaticsTitle>{`${region} 전체 통계 요약`}</StaticsTitle>
      <StaticsBox newData={responseData.data2} />
      <StatsArea>
        <OverallResponseRate statData={responseData.data1} />
        <GenderResponseRate statData={responseData.data3} />
      </StatsArea>
    </ChartWrapper>
  );
}

export default Chart;
