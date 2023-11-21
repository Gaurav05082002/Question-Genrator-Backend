const fs = require('fs');
const Question = require('../models/question');

class QuestionService {
  constructor() {
    this.questionStore = this.loadQuestionStore();
  }

  loadQuestionStore() {
    try {
      const data = fs.readFileSync('./data/questionStore.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading question store:', error.message);
      return [];
    }
  }

  getAllQuestions() {
    return this.questionStore;
  }

  getQuestionsByDifficulty(difficulty) {
    return this.questionStore.filter((q) => q.difficulty === difficulty);
  }
}

module.exports = QuestionService;
