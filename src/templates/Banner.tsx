import { Button } from '../button/Button'
import { CTABanner } from '../cta/CTABanner'
import { Section } from '../layout/Section'

const Banner = () => (
  <Section>
    <CTABanner
      title="Tell your frens that this badge is available."
      subtitle="Share it on Twitter."
      button={
        <a
          target="_blank"
          href="https://twitter.com/intent/tweet?text=Claim%20your%20NFT%20to%20commemorate%20this%20achievment%20and%20join%20the%20exclusive%20club%20of%20people%20blocked%20by%20Aurore%20Lalucq%20on%20Twitter%20%3A%20&url=https://blockedbyaurore.xyz"
        >
          <Button>Tweet</Button>
        </a>
      }
    />
  </Section>
)

export { Banner }
