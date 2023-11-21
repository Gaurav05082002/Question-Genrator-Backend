const readline = require('readline');

const QuestionService = require('./services/questionService');
const PaperGeneratorService = require('./services/paperGeneratorService');

// Create instances
const questionService = new QuestionService();
const paperGeneratorService = new PaperGeneratorService(questionService);

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user for input
function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

// Input the percentage of questions for each difficulty level
async function inputPercentages() {
  while (true) {
    const easyPercentage = parseFloat(await askQuestion('Enter the percentage of Easy questions: '));
    const mediumPercentage = parseFloat(await askQuestion('Enter the percentage of Medium questions: '));
    const hardPercentage = parseFloat(await askQuestion('Enter the percentage of Hard questions: '));

    // Input the total marks for the question paper
    const totalMarks = parseInt(await askQuestion('Enter the total marks for the question paper: '));

    // Validate input percentages
    const totalPercentage = easyPercentage + mediumPercentage + hardPercentage;
    if (totalPercentage !== 100) {
      console.log('Error: The sum of percentages must be 100%. Please provide valid percentages.');
      continue;
    }

    // Calculate the percentage of Medium questions if not provided by the user
    const remainingPercentage = 100 - totalPercentage;
    let finalMediumPercentage = mediumPercentage;

    if (mediumPercentage === 0) {
      finalMediumPercentage = remainingPercentage;
    }

    const difficultyDistribution = [
      { difficulty: 'Easy', percentage: easyPercentage },
      { difficulty: 'Medium', percentage: finalMediumPercentage },
      { difficulty: 'Hard', percentage: hardPercentage },
    ];

    // Example: Generate a question paper
    const questionPaper = paperGeneratorService.generateQuestionPaper(totalMarks, difficultyDistribution);
    console.log('Generated Question Paper:', questionPaper);

    // Close the readline interface
    rl.close();
    break;
  }
}

// Start the input process
inputPercentages();
