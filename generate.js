import { Configuration, OpenAIApi } from 'openai';
import { writeFileSync } from 'fs';
import dotenv from "dotenv";
import Prompt from "@cloud-technology/cli-prompt";

dotenv.config();

//console.log('api key is: ', process.env.HIDDEN_API_TOKEN)
const configuration = new Configuration({
    apiKey: process.env.HIDDEN_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

const prompt = await Prompt('Enter image prompt for Dall-E: ');
//console.log(initialPrompt);
//const prompt = initialPrompt
//'The Giant by Francisco Goya except it is a giant gorilla'
//'a very giant, muscular gorilla sitting with his legs over a cliff edge with his back turned to the viewer, on a foggy, dark day. Francisco Goya'

const result = await openai.createImage({
    prompt,
    n: 1, 
    size: "1024x1024",
    user: 'Juan C'
});

const url = result.data.data[0].url;
console.log(url);

//save image URL to disk
const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from( await blob.arrayBuffer() )
const newFile = await Prompt("Enter New File Name +.png: ");
console.log(newFile);
writeFileSync(`./img/${newFile}`, buffer);

