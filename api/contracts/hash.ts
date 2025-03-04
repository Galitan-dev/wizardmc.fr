/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 *
 * Contract source: https://git.io/Jfefs
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

declare module '@ioc:Adonis/Core/Hash' {
  import { HashDrivers } from '@ioc:Adonis/Core/Hash'

  interface HashersList {
    bcrypt: {
      config: BcryptConfig
      implementation: BcryptContract
    }
    argon: {
      config: ArgonConfig
      implementation: ArgonContract
    }
  }
}
