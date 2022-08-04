import * as dotenv from 'dotenv';
dotenv.config();
import randomPick from '../etc/randomPick';
import mongoose, { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface User {
  userName: string;
  //   nickName: string;
  email: string;
  address: string;
  gender: string;
  age: string;
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Answer';
    },
  ];
  issues: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Issue';
    },
  ];
}

interface Issue {
  title: string;
  answerTextO: string;
  answerTextX: string;
  answerTextS: string;
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Answer';
    },
  ];
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
  };
}
interface Answer {
  answer: string;
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
  };
  issue: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Issue';
  };
}

interface Static {
  issueId: mongoose.Schema.Types.ObjectId;
  mapName: string;
  regionName: string;
  count: number;
  male: {
    count: number;
    yes: number;
    no: number;
    so: number;
    age: {
      '10대': number;
      '20대': number;
      '30대': number;
      '40대': number;
      '50대': number;
      '60대이상': number;
    };
  };
  female: {
    count: number;
    yes: number;
    no: number;
    so: number;
    age: {
      '10대': number;
      '20대': number;
      '30대': number;
      '40대': number;
      '50대': number;
      '60대이상': number;
    };
  };
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
  userName: { type: String, required: true },
  //   nickName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    },
  ],
  issues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
    },
  ],
});

const issueSchema = new Schema<Issue>({
  title: { type: String, required: true },
  answerTextO: { type: String, required: true },
  answerTextX: { type: String, required: true },
  answerTextS: { type: String, required: true },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
const answerSchema = new Schema<Answer>({
  answer: { type: String, required: true },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const staticSchema = new Schema<Static>({
  issueId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mapName: { type: String, required: true },
  regionName: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
  male: {
    count: { type: Number, required: true, default: 0 },
    yes: { type: Number, required: true, default: 0 },
    no: { type: Number, required: true, default: 0 },
    so: { type: Number, required: true, default: 0 },
    age: {
      '10대': { type: Number, required: true, default: 0 },
      '20대': { type: Number, required: true, default: 0 },
      '30대': { type: Number, required: true, default: 0 },
      '40대': { type: Number, required: true, default: 0 },
      '50대': { type: Number, required: true, default: 0 },
      '60대이상': { type: Number, required: true, default: 0 },
    },
  },
  female: {
    count: { type: Number, required: true, default: 0 },
    yes: { type: Number, required: true, default: 0 },
    no: { type: Number, required: true, default: 0 },
    so: { type: Number, required: true, default: 0 },
    age: {
      '10대': { type: Number, required: true, default: 0 },
      '20대': { type: Number, required: true, default: 0 },
      '30대': { type: Number, required: true, default: 0 },
      '40대': { type: Number, required: true, default: 0 },
      '50대': { type: Number, required: true, default: 0 },
      '60대이상': { type: Number, required: true, default: 0 },
    },
  },
});

mongoose.connect(process.env.MONGODB_URI, { dbName: 'test3' });
// 3. Create a Model.
const User = model<User>('User', userSchema);
const Issue = model<Issue>('Issue', issueSchema);
const Answer = model<Answer>('Answer', answerSchema);
const Static = model<Static>('Static', staticSchema);

// let test = new Static({
//   regionName: 'test',
//   mapName: 'test',
// });
// test.save();

// async function t1() {
//   let test = new Static({
//     regionName: 'test',
//     mapName: 'test',
//   });
//   let x = await test.save();
//   console.log(x);
//   x.female.count++;
//   x.female.so++;
//   x.female.age['20대']++;
//   x = await x.save();
//   console.log(x);
// }
// t1();

let data = randomPick(10000);

// User.find({}).then((x) => {
//   console.log(x);
//   console.log(x.length);
// });
// a document instance
// let issue1 = new Issue({
//   title: "뭐니뭐니해도 부먹이 최고시다.",
//   answerTextO: "맞아맞아 부먹이 최고지",
//   answerTextX: "아냐 찍먹이 최고야",
//   answerTextS: "부먹이나 찍먹보다는 처먹이 최고 아닐까?",
// });

// save model to database
// issue1.save(function (err, rst) {
//   if (err) return console.error(err);
//   console.log("issue1 saved");
// });

async function test() {
  // let issue1 = new Issue({
  //   title: "뭐니뭐니해도 부먹이 최고시다.",
  //   answerTextO: "맞아맞아 부먹이 최고지",
  //   answerTextX: "아냐 찍먹이 최고야",
  //   answerTextS: "부먹이나 찍먹보다는 처먹이 최고 아닐까?",
  // });
  // await issue1.save();
  await User.collection.drop();
  await Answer.collection.drop();
  await Static.collection.drop();
  let issue = await Issue.findOne();
  if (issue !== null) {
    await Issue.updateOne({ _id: issue._id }, { answers: [] });
  }

  for (let { userName, age, email, address, answer, gender } of data) {
    let issue = await Issue.findOne();

    if (issue !== null) {
      let issue_id = issue._id;
      let user = new User({
        userName: userName,
        age: age,
        email: email,
        address: address,
        answer: answer,
        gender: gender,
        issues: [issue_id],
      });
      await user.save();

      if (user !== null) {
        let user_id = user._id;

        let ans = new Answer({
          answer: answer,
          user: user_id,
          issue: issue_id,
        });
        await ans.save();

        if (ans !== null) {
          let ans_id = ans._id;

          let a = await Issue.updateOne(
            { _id: issue_id },
            { answers: [...issue.answers, ans_id] },
          );
          let b = await User.updateOne(
            { _id: user_id },
            { answers: [ans_id], Issues: [issue_id] },
          );

          let addNames = address.split(' '),
            mapName = '',
            regionName = '';

          if (addNames.length > 1) {
            [mapName, regionName] = addNames;
          } else {
            [mapName, regionName] = ['전국', addNames[0]];
          }
          let region = await Static.findOne({
            issueId: issue_id,
            regionName: regionName,
          });
          if (region === null) {
            region = await new Static({
              issueId: issue_id,
              mapName: mapName,
              regionName: regionName,
            });
            region = await region.save();
          }
          region.count++;
          if (gender === '남') {
            region.male.count++;
            if (answer === '네') {
              region.male.yes++;
            } else if (answer === '아니오') {
              region.male.no++;
            } else {
              region.male.so++;
            }
            if (age === '10대') {
              region.male.age['10대']++;
            } else if (age === '20대') {
              region.male.age['20대']++;
            } else if (age === '30대') {
              region.male.age['30대']++;
            } else if (age === '40대') {
              region.male.age['40대']++;
            } else if (age === '50대') {
              region.male.age['50대']++;
            } else {
              region.male.age['60대이상']++;
            }
          } else {
            region.female.count++;
            if (answer === '네') {
              region.female.yes++;
            } else if (answer === '아니오') {
              region.female.no++;
            } else {
              region.female.so++;
            }
            if (age === '10대') {
              region.female.age['10대']++;
            } else if (age === '20대') {
              region.female.age['20대']++;
            } else if (age === '30대') {
              region.female.age['30대']++;
            } else if (age === '40대') {
              region.female.age['40대']++;
            } else if (age === '50대') {
              region.female.age['50대']++;
            } else {
              region.female.age['60대이상']++;
            }
          }
          region = await region.save();
          let map = await Static.findOne({
            issueId: issue_id,
            regionName: mapName,
          });
          if (map === null) {
            map = await new Static({
              issueId: issue_id,
              mapName: '지구',
              regionName: mapName,
            });
            map = await map.save();
          }
          map.count++;
          if (gender === '남') {
            map.male.count++;
            if (answer === '네') {
              map.male.yes++;
            } else if (answer === '아니오') {
              map.male.no++;
            } else {
              map.male.so++;
            }
            if (age === '10대') {
              map.male.age['10대']++;
            } else if (age === '20대') {
              map.male.age['20대']++;
            } else if (age === '30대') {
              map.male.age['30대']++;
            } else if (age === '40대') {
              map.male.age['40대']++;
            } else if (age === '50대') {
              map.male.age['50대']++;
            } else {
              map.male.age['60대이상']++;
            }
          } else {
            map.female.count++;
            if (answer === '네') {
              map.female.yes++;
            } else if (answer === '아니오') {
              map.female.no++;
            } else {
              map.female.so++;
            }
            if (age === '10대') {
              map.female.age['10대']++;
            } else if (age === '20대') {
              map.female.age['20대']++;
            } else if (age === '30대') {
              map.female.age['30대']++;
            } else if (age === '40대') {
              map.female.age['40대']++;
            } else if (age === '50대') {
              map.female.age['50대']++;
            } else {
              map.female.age['60대이상']++;
            }
          }
          map = await map.save();
        }
      }
    }
  }
  console.log('end');
}

test();

// async function test2() {
//   let data = await User.findOne().populate({
//     path: 'answers',
//     // populate: {
//     //   path: "user",
//     // },
//   });
//   // let issue = data[0];
//   // let answers = issue.answers.slice(0, 10);

//   // console.log(answers);
//   console.log(data);
// }

// test2();

// Issue.find({})
//   .then(async (x) => {
//     // console.log(x[0].answers);
//     let issue_id = x[0]._id;

//     let c = 1;
//     await Issue.updateOne({ issue_id }, { answers: [] });
//     for (let { userName, age, email, address, answer, gender } of data) {
//       let user = await User.findOne({
//         userName: userName,
//         age: age,
//         email: email,
//         address: address,
//         gender: gender,
//       });

//       if (user !== null) {
//         let ans = await Answer.findOne({
//           answer: answer,
//           issue: issue_id,
//           user: user._id,
//         });
//         if (ans !== null) {
//           let user_id = user._id;
//           let ans_id = ans._id;
//           user.answers.push(ans_id);

//           await user.save();

//           await Issue.updateOne(
//             { issue_id },
//             { answers: [...x[0].answers, ans._id] }
//           );
//         }
//       }
//     }
//   })
//   .then((x) => {
//     console.log("end");
//   })
//   .then((x) => {
//     User.findOne()
//       .populate("answers")
//       .then(async (x) => {
//         console.log(x);
//       });
//   });

// User.collection.drop();
