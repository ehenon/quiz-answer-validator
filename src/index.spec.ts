import answerIsValid from './index';

describe('answerIsValid()', () => {
  test('Correct answers with default typo rate', () => {
    const testData = [
      { inputAnswer: 'The Big Lebowski', acceptableAnswers: ['The Big Lebowski'] },
      { inputAnswer: '1.200.000', acceptableAnswers: ['1.200.000'] },
      { inputAnswer: 'Juliane Moore', acceptableAnswers: ['Julianne Moore', 'Julie Anne Smith', 'Moore'] },
      { inputAnswer: 'Eucalyptuss', acceptableAnswers: ['Eucalyptus'] },
    ];

    testData.forEach((td) => {
      expect(answerIsValid(td.inputAnswer, td.acceptableAnswers)).toBe(true);
    });
  });

  test('Wrong answers with default typo rate', () => {
    const testData = [
      { inputAnswer: 'a', acceptableAnswers: ['b'] },
      { inputAnswer: 'The Godfather', acceptableAnswers: ['The Big Lebowski'] },
      { inputAnswer: '1.200.0000', acceptableAnswers: ['1.200.000'] },
      { inputAnswer: 'Salma Hayek', acceptableAnswers: ['Julianne Moore', 'Julie Anne Smith', 'Moore'] },
      { inputAnswer: 'Pioneer Cabin Tree', acceptableAnswers: ['Eucalyptus'] },
    ];

    testData.forEach((td) => {
      expect(answerIsValid(td.inputAnswer, td.acceptableAnswers)).toBe(false);
    });
  });

  test('Custom typo rates', () => {
    expect(answerIsValid('The Big Lebowski', ['The Big Lebowski'], 0)).toBe(true);
    expect(answerIsValid('The Big Lebowskii', ['The Big Lebowski'], 0)).toBe(false);
    expect(answerIsValid('The Big Lebowsk', ['The Big Lebowski'], 0)).toBe(false);
    expect(answerIsValid('bi lebow', ['The Big Lebowski'], 0.9)).toBe(true);
  });

  test('Cheat with letter added to a number', () => {
    expect(answerIsValid('10.000.000.00a', ['10.000.000.000'])).toBe(false);
  });
});
