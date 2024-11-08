import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carousel } from './entities/carousel.entity';
import { CarouselDto } from './dto/carousel.dto';

@Injectable()
export class CarouselService {
  constructor(
    @InjectRepository(Carousel)
    private carouselRepository: Repository<Carousel>,
  ) {}

  // Method to create a new carousel ad
  async createCarouselAd(carouselDto: CarouselDto): Promise<Carousel> {
    const { imageUrl, redirectUrl } = carouselDto;
    const carouselAd = new Carousel();
    carouselAd.imageUrl = imageUrl;
    carouselAd.redirectUrl = redirectUrl;
    return this.carouselRepository.save(carouselAd);
  }

  // Method to fetch all active carousel ads
  async getActiveCarouselAds(): Promise<Carousel[]> {
    return this.carouselRepository.find({ where: { isActive: true } });
  }
}
