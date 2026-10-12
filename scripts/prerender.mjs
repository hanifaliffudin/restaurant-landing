import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const outputDirectory = resolve('dist')
const serverDirectory = resolve(outputDirectory, '.ssr')
const serverEntry = resolve(serverDirectory, 'entry-server.js')
const htmlPath = resolve(outputDirectory, 'index.html')
const { render } = await import(pathToFileURL(serverEntry).href)
let html = await readFile(htmlPath, 'utf8')
const rootMarker = '<div id="root"></div>'
const stylesheetLink = html.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/)

if (!stylesheetLink) {
  throw new Error('Could not find the stylesheet link in dist/index.html')
}

const stylesheetPath = resolve(outputDirectory, stylesheetLink[1].slice(1))
const stylesheet = await readFile(stylesheetPath, 'utf8')
html = html.replace(stylesheetLink[0], `<style>${stylesheet}</style>`)
await rm(stylesheetPath)

if (!html.includes(rootMarker)) {
  throw new Error('Could not find the React root in dist/index.html')
}

await writeFile(htmlPath, html.replace(rootMarker, `<div id="root">${render()}</div>`))
await rm(serverDirectory, { recursive: true, force: true })
