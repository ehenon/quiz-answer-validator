import answerIsValid from './index';

describe('answerIsValid()', () => {
  test('Correct answers', () => {
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

  test('Wrong answers', () => {
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
});
