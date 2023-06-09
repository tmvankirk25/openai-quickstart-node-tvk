const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  if (typeof req.body.prompt === "string") {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role:"user", content: generatePrompt(req.body.prompt)}],
      temperature: 0.6,
    });

    res.status(200).json({ text: completion.data.choices[0].message.content })
  } else {
    res.status(200).json({ text: "Invalid prompt provided." })
  }
}

function generatePrompt(subject) {
  const capitalizedSubject =
    subject[0].toUpperCase() + subject.slice(1).toLowerCase();
  return `Write a haiku about this word consting of three lines with 17 syllables total. The first lines is 5 syllables, the second line is 7 syllables, and the third line is 5 syllables. Separate each line with a period.


word: ${capitalizedSubject}
haiku:`;
}