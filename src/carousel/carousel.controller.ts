/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body } from '@nestjs/common';
import { CarouselService } from './carousel.service';
import { CarouselDto } from './dto/carousel.dto';

@Controller('carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  // Endpoint to create a new carousel ad
  @Post()
  async createCarouselAd(@Body() carouselDto: CarouselDto) {
    return this.carouselService.createCarouselAd(carouselDto);
  }

  // Endpoint to fetch all active carousel ads
  @Get()
  async getActiveCarouselAds() {
    return this.carouselService.getActiveCarouselAds();
  }
}
