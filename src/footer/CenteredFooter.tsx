import { ReactNode } from 'react'

import { FooterCopyright } from './FooterCopyright'
import { FooterIconList } from './FooterIconList'

type ICenteredFooterProps = {
  iconList: ReactNode
}

const CenteredFooter = (props: ICenteredFooterProps) => (
  <div className="text-center">
    <div className="mt-8 flex justify-center">
      <a
        href="https://thirdweb.com/mumbai/0xC5B35eCfa2Db1cB2c28507cc0ED94401337F5334?utm_source=contract_badge"
        target="_blank"
      >
        <img
          width="200"
          height="45"
          src="https://badges.thirdweb.com/contract?address=0xC5B35eCfa2Db1cB2c28507cc0ED94401337F5334&theme=light&chainId=80001"
          alt="View contract"
        />
      </a>
    </div>

    <div className="mt-8 flex justify-center">
      <FooterIconList>{props.iconList}</FooterIconList>
    </div>

    <div className="mt-8 text-sm">
      <FooterCopyright />
    </div>

    <style jsx>
      {`
        .navbar :global(li) {
          @apply mx-4;
        }
      `}
    </style>
  </div>
)

export { CenteredFooter }
