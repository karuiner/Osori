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

function Chart({ region }: { region: string }) {
  const [responseData, setResponseData] = useState<regionData>({
    name: region,
    count: 0,
    male: { count: 0, answer: { yes: 0, no: 0, so: 0 }, age: { count: 0 } },
    female: {
      count: 0,
      answer: { yes: 0, no: 0, so: 0 },
      age: { count: 0 },
    },
  });
  const [isget, isgetset] = useState(false);

  if (!isget) {
    axios.get("http://localhost:4000/card/region/" + region).then((x) => {
      console.log(x.data);
      setResponseData(x.data);
      isgetset(true);
    });
  }

  let data1 = {
    total: responseData.count,
    yes: responseData.female.answer.yes + responseData.male.answer.yes,
    no: responseData.female.answer.no + responseData.male.answer.no,
    so: responseData.female.answer.so + responseData.male.answer.so,
  };
  let fage = responseData.female.age;
  let femax = 0,
    felabel = "";
  for (let i in fage) {
    if (i !== "count") {
      if (fage[i] > femax) {
        femax = fage[i];
        felabel = i;
      }
    }
  }
  let mage = responseData.male.age;
  let memax = 0,
    melabel = "";
  for (let i in mage) {
    if (i !== "count") {
      if (mage[i] > memax) {
        memax = mage[i];
        melabel = i;
      }
    }
  }
  let data2 = {
    female: responseData.female.count,
    male: responseData.male.count,
    femaxc: femax,
    femaxl: felabel,
    memaxc: memax,
    memaxl: melabel,
  };

  return (
    <ChartWrapper>
      {responseData !== null ? (
        <>
          <StaticsTitle>{`${region} 전체 통계 요약`}</StaticsTitle>
          <StaticsBox newData={data2} />
          <StatsArea>
            <OverallResponseRate statData={data1} />
            <GenderResponseRate statData={responseData} />
          </StatsArea>
        </>
      ) : null}
    </ChartWrapper>
  );
}

export default Chart;
