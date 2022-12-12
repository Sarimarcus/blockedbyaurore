import { Meta } from '../layout/Meta'
import { AppConfig } from '../utils/AppConfig'
import { Banner } from './Banner'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Description } from '../mint/Description'
import { Mint } from '../mint/Mint'

const Base = () => (
  <div className="antialiased text-gray-600">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <Mint />
    <Description />
    <Banner />
    <Footer />
  </div>
)

export { Base }
