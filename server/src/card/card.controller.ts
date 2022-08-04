import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CardService } from './card.service';
import { create_answerdto } from '../dto/card.create.answer.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async aa() {
    return 'test';
  }

  @Get('mapdata/:id')
  async getmapdata(@Param() params) {
    return this.cardService.getmapdata(params.id);
  }

  @Get('regiondata/:id')
  async getregiondata(@Param() params) {
    return this.cardService.getregiondata(params.id);
  }

  @Get('map/:id')
  async getmap(@Param() params) {
    return this.cardService.getmap(params.id);
  }

  @Get('mapcount/:id')
  async getmapcount(@Param() params) {
    return this.cardService.getmapcount(params.id);
  }

  @Get('region/:id')
  async getregion(@Param() params) {
    return this.cardService.getregion(params.id);
  }

  @Get('map_test/:id')
  getmap_test(@Param() params, @Res() response) {
    return this.cardService.getmap_test(params.id, response);
  }

  @Get('counter')
  async getdata() {
    return this.cardService.getdata();
  }

  @Post('create_answer')
  async create_answer(@Body() body: create_answerdto) {
    return this.cardService.create_answer(body);
  }
}
