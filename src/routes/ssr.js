import express from "express";

import App from "../components/app";
// import Routes from '../routes';
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";
import LandingPage from '../../view/components/LandingPage';

const router = express.Router();

router.get("/", async (req, res) => {
    // res.status(201).send("Hello World");
    const theHtml = `<html>
    <head><title>My First SSR</title></head>
    <body>
        <h1>My First Server Side Render</h1>
        <div id="reactele">{{{reactele}}}</div>
        <script src="/app.js" charset="utf-8"></script>
        <script src="/vendor.js" charset="utf-8"></script>
        </body>
    </html>`;
    const hbsTemplate = hbs.compile(theHtml);
    const reactComp = renderToString(<App name={'amit'}/>);
    // var reactHtml = renderToString(<App exists= {false} name={'name'}/>);
    const htmlToSend = hbsTemplate({ reactele: reactComp });

    res.send(htmlToSend);
});

router.get("/LandingPage", async (req, res) => {
    // res.status(201).send("Hello World");
    const name = 'amit';
    const theHtml = `<html>
    <head>
    <title>My First SSR</title>
    <meta name="og:type" content={{type}} />
    </head>

    <body>
        <h1>My First Server Side Render</h1>
        <div id="comp2">{{{comp2}}}</div>
        <script src="/app.js" charset="utf-8"></script>
        <script src="/vendor.js" charset="utf-8"></script>
        </body>
    </html>`;
    const hbsTemplate = hbs.compile(theHtml);
    const reactComp = renderToString(<App data={name}/>);
    const htmlToSend = hbsTemplate({ comp2: reactComp, type: 'video' });

    res.send(htmlToSend);

    // res.render(htmlToSend)
});

export default router;