/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 *
 * Contract source: https://git.io/JemcN
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

declare module '@ioc:Adonis/Addons/Redis' {
  interface RedisConnectionsList {
    local: RedisConnectionConfig
  }
}
