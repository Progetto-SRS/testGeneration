const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);



const generateContent = async (prompt) => {
  try {
    const gptResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      temperature: 0.8,
    });
    
    const generatedText = gptResponse.data.choices[0].text.trim();
    
    return generatedText;
  } catch (error) {
    //console.error('Si è verificato un errore durante la generazione del contenuto:', error);
    throw error;
  }
};

module.exports = {
  generateContent,
};
