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
        href="https://thirdweb.com/polygon/0x1AaeAC617611Fb4cd37ba918bd84A76A31876D5a?utm_source=contract_badge"
        target="_blank"
        rel="noreferrer"
      >
        <img
          width="200"
          height="45"
          src="https://badges.thirdweb.com/contract?address=0x1AaeAC617611Fb4cd37ba918bd84A76A31876D5a&theme=light&chainId=137"
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
