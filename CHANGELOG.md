# Changelog

## [Unreleased][]

## [1.5.0][] - 2018-04-07
* Reverse env priority in auth call.

## [1.4.7][] - 2018-04-07
* Give up on actually fixing psychotic dupicate root pathing issue.

## [1.4.6][] - 2018-04-07
* Patch out terrible Users dist issue.

## [1.4.5][] - 2018-04-05
* switch implicit process exit for callback notation

## [1.4.4][] - 2018-04-04
* the last??? micropatch for a while around env var parsing?

## [1.4.3][] - 2018-04-04
* patch bug around accessing homedir

## [1.4.2][] - 2018-04-04
* actually fix that bug, by storing config in `~/.imdoinrc`

## [1.4.1][] - 2018-04-04
* finally fix the bug where `process.exit()` had to be used to close connection

## [1.4.0][] - 2018-03-11
* npmignore the .env file to persist through updates
* let the user pass through a text string option for 🌈s

## [1.3.3][] - 2017-12-17
* Added option to pass envs in manually in module extension.

## [1.3.2][] - 2017-12-17
* Patch module directory & export
* Added just a little readme

## [1.3.1][] - 2017-12-16
* Default export the updateStatus function.

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


[Unreleased]: https://github.com/one19/im-doin/compare/v1.5.0...HEAD
[1.5.0]: https://github.com/one19/im-doin/compare/v1.4.7...v1.5.0
[1.4.7]: https://github.com/one19/im-doin/compare/v1.4.6...v1.4.7
[1.4.6]: https://github.com/one19/im-doin/compare/v1.4.5...v1.4.6
[1.4.5]: https://github.com/one19/im-doin/compare/v1.4.4...v1.4.5
[1.4.4]: https://github.com/one19/im-doin/compare/v1.4.3...v1.4.4
[1.4.3]: https://github.com/one19/im-doin/compare/v1.4.2...v1.4.3
[1.4.2]: https://github.com/one19/im-doin/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/one19/im-doin/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/one19/im-doin/compare/v1.3.3...v1.4.0
[1.3.3]: https://github.com/one19/im-doin/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/one19/im-doin/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/one19/im-doin/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/one19/im-doin/compare/v1.2.2...v1.3.0
[1.2.2]: https://github.com/one19/im-doin/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/one19/im-doin/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/one19/im-doin/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/one19/im-doin/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/one19/im-doin/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/one19/im-doin/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/one19/im-doin/tree/v1.0.1