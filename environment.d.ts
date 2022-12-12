declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALCHEMY_APY_KEY: string
      NODE_ENV: 'development' | 'production'
      INFURA_APY_KEY?: string
      SMARTCONTRACT_ADDRESS: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
