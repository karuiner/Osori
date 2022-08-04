import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, answer_Schema } from 'src/schema/answer.schema';
import { Issue, issue_Schema } from 'src/schema/issue.schema';
import { Static, static_Schema } from 'src/schema/static.schema';
import { User, user_Schema } from 'src/schema/user.schema';
import { users, userSchema } from '../users/users.schema';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { cardanswer, card_answer_Schema } from './card_answer.schema';
import { counter, counterSchema } from './counter.schema';

@Module({
  // imports: [
  //   MongooseModule.forFeature([
  //     {
  //       name: cardanswer.name,
  //       schema: card_answer_Schema,
  //     },
  //     {
  //       name: users.name,
  //       schema: userSchema,
  //     },
  //     {
  //       name: counter.name,
  //       schema: counterSchema,
  //     },
  //   ]),
  // ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Answer.name,
        schema: answer_Schema,
      },
      {
        name: User.name,
        schema: user_Schema,
      },
      {
        name: Issue.name,
        schema: issue_Schema,
      },
      {
        name: Static.name,
        schema: static_Schema,
      },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
