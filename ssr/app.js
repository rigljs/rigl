const express = require("express")
const hbs = require("hbs")
const { readFile } = require('fs/promises')
const { JSDOM } = require("jsdom")
const port = process.env.PORT || 3000

const app = express()
app.use(express.static(__dirname + "/public"))

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")


// contains the names used in the titles of search engines
const bots = ['YandexBot', 'Googlebot']

// ----------------------------------------------------------------------
const YandexBot = 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)'
const Googlebot = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
// ----------------------------------------------------------------------


app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.use(async (req, res) => {
  // const userAgent = YandexBot
  // const userAgent = Googlebot
  const userAgent = req.get('User-Agent')

  // if the request is from a bot, then the "isBot" constant will contain True
  const isBot = bots.some(bot => userAgent.includes(bot))
  
  // if it's a bot
  if (isBot) {
    // get full request URL
    const fullURL = req.protocol + "://" + req.hostname + `${port ? `:${port}` : ''}` + req.path

    // contains the rendered content of the application
    const body = await readFile(__dirname + '/views/partials/body.hbs').then(async data => {
      // create a virtual JSDOM browser
      const dom = new JSDOM(data.toString(), {
        url: fullURL, // pass request URL to JSDOM virtual browser
        runScripts: "dangerously",
        resources: "usable"
      })
      
      // render the application with "Rigl.render()"
      return await new Promise(done => {
        dom.window.onload = () => {
          // return the textual HTML content to the constant "body"
          dom.window.Rigl.render().then(done)
        }
      })
    })

    // pass the "body" constant to the template engine
    res.render("main.hbs", { body })
  }

  // otherwise, if the request was made by the user
  else {
    // call the template engine with the default "body" view
    res.render("main.hbs")
  }
})

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))