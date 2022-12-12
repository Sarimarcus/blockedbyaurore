import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import { TruckIcon } from '@heroicons/react/24/outline'
import { Section } from '../layout/Section'

const Description = () => (
  <>
    <Section>
      <div className="mt-20 flex flex-wrap items-center">
        <div className="w-full sm:w-1/2 text-center sm:px-6">
          <h3 className="text-3xl text-gray-900 font-semibold">Rules</h3>
          <div className="mt-6 text-xl leading-9">
            1 Mint per wallet. We don't actually check if you really have been
            blocked by @AuroreLalucq, we were lazy to code this. Be fair FFS !
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-6 flex justify-center">
          <ClipboardDocumentCheckIcon className="h-24 w-24 text-blue-500" />
        </div>
      </div>
    </Section>
    <Section>
      <div className="mt-20 flex flex-wrap items-center">
        <div className="w-full sm:w-1/2 p-6 flex justify-center">
          <CurrencyDollarIcon className="h-24 w-24 text-blue-500" />
        </div>
        <div className="w-full sm:w-1/2 text-center sm:px-6">
          <h3 className="text-3xl text-gray-900 font-semibold">Free to mint</h3>
          <div className="mt-6 text-xl leading-9">
            Obvisouly, we won't charge you anything to mint your badge, thus we
            have enabled 5% royalties on sales. We want to help Amaury recover
            its $8000 lost from FTX collapse.
          </div>
        </div>
      </div>
    </Section>
    <Section>
      <div className="mt-20 flex flex-wrap items-center">
        <div className="w-full sm:w-1/2 text-center sm:px-6">
          <h3 className="text-3xl text-gray-900 font-semibold">Utility</h3>
          <div className="mt-6 text-xl leading-9">
            The only utility is to show the world you have been blocked on
            Twitter by Aurore Laluck on a NFT. That's all. But who knows, we
            could implement something later.
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-6 flex justify-center">
          <CheckBadgeIcon className="h-24 w-24 text-blue-500" />
        </div>
      </div>
    </Section>
    <Section>
      <div className="mt-20 flex flex-wrap items-center">
        <div className="w-full sm:w-1/2 p-6 flex justify-center">
          <TruckIcon className="h-24 w-24 text-blue-500" />
        </div>
        <div className="w-full sm:w-1/2 text-center sm:px-6">
          <h3 className="text-3xl text-gray-900 font-semibold">Roadmap</h3>
          <div className="mt-6 text-xl leading-9">
            No roadmap, we are here for the lulz.
          </div>
        </div>
      </div>
    </Section>
  </>
)

export { Description }
