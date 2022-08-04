import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border: solid 2px #c181db;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #d0d0d0;
  flex-wrap: nowrap;
`;

const StaticalNameWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 7px;
`;

const StaticalName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 50px;
  color: #dc735e;
  font-weight: 600;
  border: solid 1px #c181db;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #d0d0d0;
`;

const StaticalFigureWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
  margin: 5px 0;
`;

const StaticalFigure = styled.div``;

interface data {
  female: number;
  male: number;
  femaxc: number;
  femaxl: string;
  memaxc: number;
  memaxl: string;
}

function StaticsBox({
  newData,
}: {
  newData: {
    female: number;
    male: number;
    femaxc: number;
    femaxl: string;
    memaxc: number;
    memaxl: string;
  };
}) {
  // const [maleResponse, setMaleResponse] = useState(0);
  // const [femaleResponse, setFemaleResponse] = useState(0);
  // const [highestMaleResponseAge, setHighestMaleResponseAge] = useState("");
  // const [data, setdata] = useState<data>(newData);
  // useEffect(() => {
  //   setdata(newData);
  // }, [newData]);
  return (
    <BoxWrapper>
      <StaticalNameWrapper>
        <StaticalName>남성 응답</StaticalName>
        <StaticalName>여성 응답</StaticalName>
        <StaticalName>
          남성 최다
          <br />
          응답 연령대
        </StaticalName>
        <StaticalName>
          여성 최다
          <br />
          응답 연령대
        </StaticalName>
      </StaticalNameWrapper>
      <StaticalFigureWrapper>
        <StaticalFigure>{`${newData.male} 명`}</StaticalFigure>
        <StaticalFigure>{`${newData.female} 명`}</StaticalFigure>
        <StaticalFigure>{`${newData.memaxl}`}</StaticalFigure>
        <StaticalFigure>{`${newData.femaxl}`}</StaticalFigure>
      </StaticalFigureWrapper>
    </BoxWrapper>
  );
}

export default StaticsBox;
