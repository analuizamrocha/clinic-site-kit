import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import config from '../site/site.config'
import { renderThemeCss } from '../src/lib/theme'

const target = join(process.cwd(), 'src', 'app', 'theme.css')
writeFileSync(target, renderThemeCss(config.brand.palette))
console.log(`wrote ${target}`)
