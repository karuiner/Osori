interface dataForm {
  userName: string;
  age: string;
  email: string;
  address: string;
  answer: string;
  gender: string;
}

function answerF() {
  let data = ['네', '아니요', '글세요'];
  let k = Math.random();
  let q = 0.1 * Math.random() - 0.05;
  if (k <= 0.33 + q) {
    k = 0;
  } else if (k <= 0.66 + q) {
    k = 1;
  } else {
    k = 2;
  }

  return data[k];
}

function addressF() {
  let ans = '';
  let a = [
      '서울특별시',
      '부산광역시',
      '대구광역시',
      '인천광역시',
      '광주광역시',
      '대전광역시',
      '울산광역시',
      '세종특별자치시',
      '경기도',
      '강원도',
      '충청북도',
      '충청남도',
      '전라북도',
      '전라남도',
      '경상북도',
      '경상남도',
      '제주특별자치도',
    ],
    b = [
      '종로구',
      '중구',
      '용산구',
      '성동구',
      '광진구',
      '동대문구',
      '중랑구',
      '성북구',
      '강북구',
      '도봉구',
      '노원구',
      '은평구',
      '서대문구',
      '마포구',
      '양천구',
      '강서구',
      '구로구',
      '금천구',
      '영등포구',
      '동작구',
      '관악구',
      '서초구',
      '강남구',
      '송파구',
      '강동구',
    ];

  let ac = Math.random();

  let k = [
    0.184, 0.249, 0.295, 0.352, 0.38, 0.408, 0.43, 0.437, 0.7, 0.73, 0.761,
    0.802, 0.837, 0.872, 0.923, 0.987, 1,
  ];
  let k2 = [
    0.015, 0.028, 0.051, 0.081, 0.117, 0.153, 0.194, 0.239, 0.27, 0.304, 0.357,
    0.407, 0.439, 0.478, 0.525, 0.585, 0.627, 0.651, 0.691, 0.731, 0.783, 0.826,
    0.882, 0.951, 1,
  ];
  for (let i = 0; i < 17; i++) {
    if (ac <= k[i]) {
      ans += a[i];
      break;
    }
  }
  if (ac <= k[0]) {
    let bc = Math.random();
    for (let i = 0; i < 25; i++) {
      if (bc <= k2[i]) {
        ans += ' ' + b[i];
        break;
      }
    }
  }
  return ans;
}

function genderF() {
  let k = Math.random();
  return k > 0.5 + (Math.random() * 0.2 - 0.1) ? '남' : '여';
}
function ageF() {
  let k = 50 * (Math.random() * Math.random() + 0.3 * Math.random()) + 10;
  return `${Math.floor(k / 10) * 10}대`;
}

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
interface data {
  [key: string]: subData;
}

interface MapData {
  name: string;
  count: number;
  data: data;
}

interface Sdata {
  [key: string]: MapData;
}

export default function randomPick(n: number) {
  let data: dataForm[] = [],
    l = `${n}`.length;

  for (let i = 0; i < n; i++) {
    let p = String(i).padStart(l + 1, '0');
    data[i] = {
      userName: 'name' + p,
      gender: genderF(),
      age: ageF(),
      email: 'email' + p + '@gmail.com',
      address: addressF(),
      answer: answerF(),
    };
  }
  return data;
}
