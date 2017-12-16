# Changelog

## [Unreleased][]

## [1.3.0][] - 2017-12-16
* Transpile down to pre-async node 6.11.5 on commit
* Use transpiled version on npm

## [1.2.2][] - 2017-12-13
* patches env conditional error

## [1.2.1][] - 2017-12-13
* allowed for .env-less execution with env vars

## [1.2.0][] - 2017-10-15
### Added
* rough feature to create the config information
* argumentless `im-doin` launches your website

### Changed
* moved dotenv loading/checking to where it was necessary

## [1.1.2][] - 2017-10-01
### Hotpatch
* fixes a broken date update path

## [1.1.1][] - 2017-10-01
### Changed
Denormalized data further to allow more interesting queries for months/days/weeks

## [1.1.0][] - 2017-09-24
### Added
* Atomic db interactions with setting events
* Year/month/day denormalized data for future better history use
* An example of a small migration

## [1.0.1][] - 2017-07-22

### Added
* Project setup linting/prettier/changelog
* **BASIC** firebase package-based static DB interaction
* **BASIC** commander commmand line argument parsing


[Unreleased]: https://github.com/one19/im-doin/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/one19/im-doin/compare/v1.2.2...v1.3.0
[1.2.2]: https://github.com/one19/im-doin/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/one19/im-doin/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/one19/im-doin/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/one19/im-doin/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/one19/im-doin/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/one19/im-doin/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/one19/im-doin/tree/v1.0.1