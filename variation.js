import { Configuration, OpenAIApi } from 'openai';
import { createReadStream, writeFileSync } from 'fs';
import dotenv from "dotenv";

dotenv.config();
const readline = require("readline");

const configuration = new Configuration({
    apiKey: process.env.HIDDEN_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

//todo: create src variable that allows image name as input
const src = './coolCat.png'

const result = await openai.createImageVariation(
    createReadStream(`./img/${src}`),
    1,
    "1024x1024"
);

const url = result.data.data[0].url;
console.log(url);

//save image URL to disk
const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from( await blob.arrayBuffer() )
//TODO
writeFileSync(`./img/${Date.now()}.png`, buffer);