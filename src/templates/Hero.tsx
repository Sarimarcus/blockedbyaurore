import Link from 'next/link'

import { Background } from '../background/Background'
import { Button } from '../button/Button'
import { HeroOneButton } from '../hero/HeroOneButton'
import { Section } from '../layout/Section'

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'You have been blocked on Twitter by \n'}
            <span className="text-primary-500 font-playfair italic">
              Aurore Lalucq
            </span>
          </>
        }
        description="Claim your NFT to commemorate this achievement and join the exclusive club of people blocked by Aurore Lalucq on Twitter"
        button={
          <Link href="https://opensea.io/collection/blocked-by-aurore">
            <a>
              <Button xl>See the collection on OpenSea</Button>
            </a>
          </Link>
        }
      />
    </Section>
  </Background>
)

export { Hero }
