const test = require('node:test');
const assert = require('node:assert/strict');
const { generateMockQuestions } = require('../js/ai-utils.js');

test('generateMockQuestions returns quiz cards for a topic', () => {
  const questions = generateMockQuestions('Python', 3);

  assert.ok(Array.isArray(questions));
  assert.equal(questions.length, 3);
  assert.ok(questions[0].question.includes('Python'));
  assert.equal(questions[0].options.length, 4);
  assert.ok(questions[0].answer);
});
