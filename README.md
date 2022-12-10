# Quiz Answer Validator &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ehenon/quiz-answer-validator/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/quiz-answer-validator.svg?style=flat)](https://www.npmjs.com/package/quiz-answer-validator) [![Quality gate](https://github.com/ehenon/quiz-answer-validator/actions/workflows/quality-gate.yml/badge.svg?branch=main)](https://github.com/ehenon/quiz-answer-validator/actions/workflows/quality-gate.yml) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

This project exposes a Node.js library allowing to check if an answer given by a player to a quiz question is correct or not.

To validate or invalidate the answer, the library relies on a list of valid acceptable answers and on a set of algorithmic rules detailed in a dedicated section below.

## Usage

Installation using npm:

```
$ npm install quiz-answer-validator
```

Import:

```
// using ECMAScript module format
import answerIsValid from 'quiz-answer-validator';

// using CommonJS module format
const answerIsValid = require('quiz-answer-validator').default;
```

Usage:

- 1st param `{string}` - `inputAnswer`: Player's input answer to be checked
- 2nd param `{string[]}` - `acceptableAnswers`: Array of acceptable answers

```
answerIsValid('Herve Matoux', ['Hervé Mathoux', 'Mathoux']);          // true
answerIsValid('mathou', ['Hervé Mathoux', 'Mathoux']);                // true
answerIsValid('Hervais Mattou', ['Hervé Mathoux', 'Mathoux']);        // false

answerIsValid('big lebowski', ['The Big Lebowski']);                  // true
answerIsValid('The Big Lebowski', ['The Big Lebowski']);              // true
answerIsValid('big leboski', ['The Big Lebowski']);                   // false

answerIsValid('10000000', ['10.000.000']);                            // true
answerIsValid('10,000.000', ['10.000.000']);                          // true
answerIsValid('10.000.000', ['10000000']);                            // true
answerIsValid('10.000.0000', ['10.000.000']);                         // false
```

## Algorithmic rules

"Purification" of the input strings:
- replacing capital letters;
- replacing diacritics;
- replacing ligatures;
- finally keeping only alphanumeric characters.

Checking the typo rate:
- using [Sørensen–Dice coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient);
- invalidating the player's answer if the rate is less than 85% of the closest acceptable answer.

Particular case:
- if an expected answer contains only digits, no typos should be allowed, so the typo rate is not calculated.

## Support

Tested with Node.js long-term support versions 14, 16 and 18.

Built for both ECMAScript and CommonJS module formats.

Automated CI test runs available.
