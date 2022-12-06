import { Configuration, OpenAIApi } from 'openai';
import { createReadStream, writeFileSync } from 'fs';
import dotenv from "dotenv";
import Prompt from "@cloud-technology/cli-prompt";


dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.HIDDEN_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

const sourceFile = await Prompt("Source File Name +.png: ");
console.log(sourceFile);
const src = `./img/${sourceFile}`

const result = await openai.createImageVariation(
    createReadStream(src),
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