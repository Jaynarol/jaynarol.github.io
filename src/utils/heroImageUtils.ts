import {
  generateGradientDataURL,
  getRandomGradientIndex,
} from './gradientGenerator'

export interface HeroImageConfig {
  heroImage?: string
  fallbackGradient?: string
}

export function getHeroImageSrc(config: HeroImageConfig): string {
  if (config.heroImage) {
    return config.heroImage
  }

  if (config.fallbackGradient) {
    return config.fallbackGradient
  }

  return generateGradientDataURL(getRandomGradientIndex())
}

export function shouldShowOverlay(heroImage?: string): boolean {
  return !!heroImage
}

export function createHeroImageConfig(heroImage?: string): HeroImageConfig {
  return {
    heroImage,
    fallbackGradient: generateGradientDataURL(getRandomGradientIndex()),
  }
}
