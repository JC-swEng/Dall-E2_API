import { Configuration, OpenAIApi } from 'openai';
import { createReadStream, writeFileSync } from 'fs';
import dotenv from "dotenv";
import Prompt from "@cloud-technology/cli-prompt";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.HIDDEN_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

const src = await Prompt("Source File Name +.png: ");
console.log("Source file: ", src);
const mask = await Prompt("Mask File Name +.png: ");
console.log("Mask file: ", mask);
const replacePrompt = await Prompt('Enter replacement prompt: ');
//console.log("Replacement prompt: ", replacePrompt);
//const src = './1669873829266.png'
//const mask = './mask.png'
//const replacePrompt = 'giant atomic bomb muschroom cloud in the background'

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
const newFile = await Prompt("Enter New File Name +.png: ");
console.log(newFile);
writeFileSync(`./img/${newFile}`, buffer);