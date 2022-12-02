import { Configuration, OpenAIApi } from 'openai';
import { createReadStream, writeFileSync } from 'fs';
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.HIDDEN_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

//todo: create src variable that allows image name as input
const src = './1669873829266.png'
const mask = './mask.png'
const replacePrompt = 'Baby Sun from the Teletubbies show shinning over a dark day'

const result = await openai.createImageEdit(
    createReadStream(`./img/${src}`),
    createReadStream(`./img/${mask}`),
    replacePrompt,
    1,
    "1024x1024"
);

const url = result.data.data[0].url;
console.log(url);

//save image URL to disk
const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from( await blob.arrayBuffer() )
writeFileSync(`./img/${Date.now()}.png`, buffer);