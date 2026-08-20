function generateMockQuestions(topic = 'General Study', count = 5) {
  const safeTopic = topic.trim() || 'General Study';
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    question: `${safeTopic} Question ${index + 1}: Which option best describes this topic?`,
    options: [
      `${safeTopic} concept A`,
      `${safeTopic} concept B`,
      `${safeTopic} concept C`,
      `${safeTopic} concept D`
    ],
    answer: `${safeTopic} concept ${['A', 'B', 'C', 'D'][index % 4]}`
  }));
}

if (typeof module !== 'undefined') {
  module.exports = { generateMockQuestions };
}
