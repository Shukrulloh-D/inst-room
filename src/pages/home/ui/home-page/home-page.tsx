import { AboutBlock } from '../about-block/about-block'
import { BrandsStrip } from '../brands-strip/brands-strip'
import { CategoryBlocks } from '../category-blocks/category-blocks'
import { HitsTabs } from '../hits-tabs/hits-tabs'
import { Hero } from '../hero/hero'
import { NewsBlock } from '../news-block/news-block'

export function HomePage() {
  return (
    <>
      <Hero />
      <CategoryBlocks />
      <BrandsStrip />
      <AboutBlock />
      <HitsTabs />
      <NewsBlock />
    </>
  )
}
