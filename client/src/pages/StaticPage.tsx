import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MapArea from "../components/MapArea";
import Chart from "../components/Chart";
import Waiting from "./StatisticsWaiting";
import randomPick from "../etc/randomPick";

const InnerFrame = styled.div`
  height: 100%;
  max-width: 1200px;
  width: 100%;
  display: flex;
`;
const Box = styled.div`
  width: 50%;
  height: 100%;
`;

let names: { [key: string]: string[] } = {
  전국: [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
    "세종특별자치시",
  ],
  서울: [
    "종로구",
    "중구",
    "용산구",
    "성동구",
    "광진구",
    "동대문구",
    "중랑구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "마포구",
    "양천구",
    "강서구",
    "구로구",
    "금천구",
    "영등포구",
    "동작구",
    "관악구",
    "서초구",
    "강남구",
    "송파구",
    "강동구",
  ],
};

let colorSet = [
  "#9749B6",
  "#C181DB",
  "#C1ADD1",
  "#EEA3BF",
  "#FEDDD5",
  "#EAEAEA",
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

interface subData {
  name: string;
  count: number;
  male: gender;
  female: gender;
}
interface smData {
  [key: string]: subData;
}

interface regionData {
  name: string;
  count: number;
  rate: number;
  color: string;
}

interface mapData {
  name: string;
  count: number;
  min: number;
  max: number;
  data: { [regionName: string]: regionData };
  odata: smData;
}

interface dbData {
  [key: string]: mapData;
}

let { sdata } = randomPick(10000);
let dbinit: dbData = {
  전국: {
    name: "",
    count: 0,
    data: {},
    min: 100,
    max: 0,
    odata: { ...sdata["전국"].data },
  },
  서울: {
    name: "",
    count: 0,
    data: {},
    min: 100,
    max: 0,
    odata: { ...sdata["서울"].data },
  },
};
for (let name of ["전국", "서울"]) {
  let sub = dbinit[name];

  sub.name = name;
  sub.count = sdata[name].count;
  for (let i of names[name]) {
    let [count, rate] = [
      sdata[name].data[i].count,
      Number(((100 * sdata[name].data[i].count) / sub.count).toFixed(2)),
    ];
    if (rate > sub.max) {
      sub.max = rate;
    }
    if (rate < sub.min) {
      sub.min = rate;
    }

    sub.data[`${i}`] = {
      name: i,
      count: count,
      rate: rate,
      color: "",
    };
  }
  let dx = (Math.log(sub.max) - Math.log(sub.min)) / 5;
  for (let i of names[name]) {
    let rate = sub.data[`${i}`].rate;
    let k = 5 - Math.floor((Math.log(rate) - Math.log(sub.min)) / dx);

    k = k < 0 ? 0 : k;
    sub.data[`${i}`].color = colorSet[k];
  }
}

function StaticPage() {
  let [region, regionSel] = useState("");
  let [map, mapSel] = useState("전국");
  let [isClick, isClickF] = useState(-1);

  return (
    <InnerFrame>
      <Box>
        {region.length === 0 || isClick < 0 ? (
          <Waiting />
        ) : (
          <Chart region={region} />
        )}
      </Box>
      <Box>
        <MapArea
          map={map}
          mapSel={mapSel}
          region={region}
          regionSel={regionSel}
          isClick={isClick}
          isClickF={isClickF}
        ></MapArea>
      </Box>
    </InnerFrame>
  );
}

export default StaticPage;
