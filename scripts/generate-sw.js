const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function getGitHash() {
  try {
    const out = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
    return out.toString().trim()
  } catch (e) {
    return null
  }
}

function main() {
  const repoHash = getGitHash()
  const timestamp = Date.now().toString(36)
  const version = repoHash ? repoHash : timestamp
  const cacheName = `nitish-portfolio-${version}`

  const templatePath = path.join(__dirname, 'sw.js.template')
  const outPath = path.join(__dirname, '..', 'public', 'sw.js')

  if (!fs.existsSync(templatePath)) {
    console.error('SW template not found at', templatePath)
    process.exit(1)
  }

  const template = fs.readFileSync(templatePath, 'utf8')
  const result = template.replace(/__CACHE_NAME__/g, cacheName)

  fs.writeFileSync(outPath, result, 'utf8')
  console.log(`Generated ${outPath} with CACHE_NAME=${cacheName}`)
}

main()
