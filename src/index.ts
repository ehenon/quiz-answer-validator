/**
 * Check if a string passed as parameter contains only digits.
 * @param {string} input - String to be checked.
 * @returns {boolean} True if the input string contains only digits, false otherwise.
 */
function containsOnlyDigits(input: string): boolean {
  return /^\d+$/.test(input);
}

/**
 * Get a "purified" string from an input by replacing capital letters,
 * diacritics, ligatures and finally keeping only alphanumeric characters.
 * @param {string} input - String to be "purified".
 * @returns {string} "Purified" string.
 */
function getPurifiedStringFrom(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace('æ', 'ae')
    .replace('œ', 'oe')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Get Sørensen–Dice similarity coefficient between two input strings.
 * @param {string} first - First input string.
 * @param {string} second - Second input string.
 * @returns {number} Sørensen–Dice similarity coefficient.
 */
function getSørensenDiceCoefficientBetween(first: string, second: string): number {
  if (first === second) return 1; // 100% identical
  if (first.length < 2 || second.length < 2) return 0; // 0% identical

  const bigrams = new Map();
  for (let i = 0; i < first.length - 1; i += 1) {
    const bigram = first.substring(i, i + 2);
    const count = bigrams.has(bigram) ? bigrams.get(bigram) + 1 : 1;
    bigrams.set(bigram, count);
  }

  let nbOfCommonBigrams = 0;
  for (let i = 0; i < second.length - 1; i += 1) {
    const bigram = second.substring(i, i + 2);
    const count = bigrams.has(bigram) ? bigrams.get(bigram) : 0;
    if (count > 0) {
      bigrams.set(bigram, count - 1);
      nbOfCommonBigrams += 1;
    }
  }

  return (2.0 * nbOfCommonBigrams) / (first.length + second.length - 2);
}

/**
 * Check whether an incoming answer is valid or not, based on an array of acceptable answers.
 * @param {string} inputAnswer - Input answer to be checked.
 * @param {string[]} acceptableAnswers - Array of acceptable answers.
 * @param {number} [maxTypoRate=0.15] - Maximum tolerated typo rate between 0 and 1 (default 0.15).
 * @returns {boolean} True if the input answer is valid, false otherwise.
 */
export default function answerIsValid(
  inputAnswer: string,
  acceptableAnswers: string[],
  maxTypoRate = 0.15,
): boolean {
  const purifiedInputAnswer: string = getPurifiedStringFrom(inputAnswer);
  const purifiedValidAnswers: string[] = acceptableAnswers.map(
    (answer) => getPurifiedStringFrom(answer),
  );

  if (containsOnlyDigits(purifiedInputAnswer)) {
    /* If the purified input answer contains only digits, it is considered
    valid only if an exact match exists in the purified valid answers */
    return purifiedValidAnswers.includes(purifiedInputAnswer);
  }

  const similarityCoefficients: number[] = purifiedValidAnswers
    .filter((answer) => !containsOnlyDigits(answer))
    .map((answer) => getSørensenDiceCoefficientBetween(answer, purifiedInputAnswer));
  const maxSimilarity = Math.max(...similarityCoefficients);

  if (maxSimilarity < 1 - maxTypoRate) {
    return false;
  }

  return true;
}
