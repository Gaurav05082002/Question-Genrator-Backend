class PaperGeneratorService {
    constructor(questionService) {
      this.questionService = questionService;
    }
  
    generateQuestionPaper(totalMarks, difficultyDistribution) {
      // console.log("Inside generateQuestionPaper"); 
      const questionPaper = [];
      difficultyDistribution.forEach((dist) => {
        const questions = this.questionService.getQuestionsByDifficulty(dist.difficulty);
        const marksForDifficulty = (dist.percentage / 100) * totalMarks;
         
        let totalMarksAdded = 0;
        while (totalMarksAdded < marksForDifficulty && questions.length > 0) {
          const randomIndex = Math.floor(Math.random() * questions.length);
          const selectedQuestion = questions[randomIndex];
        
          if (!questionPaper.includes(selectedQuestion)) {
            questionPaper.push(selectedQuestion);
            totalMarksAdded += selectedQuestion.marks;
          }
        
          // Remove the selected question from the questions array
          questions.splice(randomIndex, 1);
        }
      });
      // console.log("Generated question paper:", questionPaper); 
      return questionPaper;
    }
  }
  
  module.exports = PaperGeneratorService;
  