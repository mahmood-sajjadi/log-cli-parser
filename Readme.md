# LOG CLI PARSER

This project created from ts-cli-boilerplate boilerplate

## Description

A TypeScript CLI tool to parse log files (currently supports Apache logs) and generate reports (will be more dynamic in future versions).

## Requirements

- Node.js >= 18
- Yarn (or use `npm` if supported)

## Contributing
Contributions are welcome! Please fork the repo, create a branch, and open a pull request.

## commands

### Install dependencies

run `yarn install`

### watch mode

run `yarn watch`
it will generate the `bin` folder and will update its content as soon as code get changed

### build the code

run `yarn build`
similar to watch but it will generate the `bin` folder once and stop

### run test

run `yarn test`
it will execute all the test files.

### run the command line

run `node ./bin/mahmood_log_parser.mjs --file <path to log file>`
it will read the file and log the result in console

## code structure

code root is `main.ts`
test files are `*.test.ts`

### folder structure

#### handler
this folder holds any logic to handle inputs
for now we only support files
but as we support streams, it is relatively easy to add support for other inputs

#### logger
any output (aka logger) handler will be maintained here
for now we support console standard output only

#### parser
any log format parser
for now we support Apache log format only
any new parser should support streams to handle big inputs or stream of input
in this version AccessLog is very rigid, we will make it more generic in the future to support other kind of logs as well.

#### report
any report method will be in this folder
any new reporter should match the type definition of ReportFromStream<L, I> (can be found in `type.ts`)
they should progressively extend the report as each new line from the stream is passed to them.

#### reportGenerator.ts
this file is calling reporters and parsers and handlers to generate the final result
there is a todo in this file which will be addressed in the future
the aim is to make it more generic to dynamically generate different reports from some config
and make it more generate and enable it to create report for any log structure

## License
This project is licensed under the MIT License.
