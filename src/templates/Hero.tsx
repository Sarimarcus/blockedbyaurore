import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

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
        description="Claim your NFT to commemorate this achievment!"
      />
    </Section>
  </Background>
);

export { Hero };
