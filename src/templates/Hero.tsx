import { Background } from '../background/Background'
import { HeroOneButton } from '../hero/HeroOneButton'
import { Section } from '../layout/Section'

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'You have been blocked on Twitter by \n'}
            <span className="text-primary-500">Aurore Lalucq?</span>
          </>
        }
        description="Claim your NFT to commemorate this achievment and join the exclusive club of people blocked by Aurore Lalucq on Twitter"
      />
    </Section>
  </Background>
)

export { Hero }
