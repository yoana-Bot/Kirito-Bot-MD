import { readdirSync, existsSync, readFileSync, watch } from 'fs'
import { join, resolve } from 'path'
import { format } from 'util'
import syntaxerror from 'syntax-error'
import importFile from './import.js'
import Helper from './helper.js'

const __dirname = Helper.__dirname(import.meta)
const plugin2Folder = Helper.__dirname(join(__dirname, '../plugins2')) // NUEVA CARPETA
const plugin2Filter = filename => /\.(mc)?js$/.test(filename)

let watcher2, plugins2, plugin2Folders = []
watcher2 = plugins2 = {}

async function filesInit2(pluginFolder = plugin2Folder, pluginFilter = plugin2Filter, conn) {
    const folder = resolve(pluginFolder)
    if (folder in watcher2) return
    plugin2Folders.push(folder)

    await Promise.all(readdirSync(folder).filter(pluginFilter).map(async filename => {
        try {
            let file = global.__filename(join(folder, filename))
            const module = await import(file)
            if (module) plugins2[filename] = 'default' in module ? module.default : module
        } catch (e) {
            conn?.logger.error(e)
            delete plugins2[filename]
        }
    }))

    const watching = watch(folder, reload2.bind(null, conn, folder, pluginFilter))
    watching.on('close', () => deletePluginFolder2(folder, true))
    watcher2[folder] = watching

    return plugins2
}

function deletePluginFolder2(folder, isAlreadyClosed = false) {
    const resolved = resolve(folder)
    if (!(resolved in watcher2)) return
    if (!isAlreadyClosed) watcher2[resolved].close()
    delete watcher2[resolved]
    plugin2Folders.splice(plugin2Folders.indexOf(resolved), 1)
}

async function reload2(conn, pluginFolder = plugin2Folder, pluginFilter = plugin2Filter, _ev, filename) {
    if (pluginFilter(filename)) {
        let dir = global.__filename(join(pluginFolder, filename), true)
        if (filename in plugins2) {
            if (existsSync(dir)) conn.logger.info(` updated plugin2 - '${filename}'`)
            else {
                conn?.logger.warn(`deleted plugin2 - '${filename}'`)
                return delete plugins2[filename]
            }
        } else conn?.logger.info(`new plugin2 - '${filename}'`)
        let err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true
        })
        if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
        else try {
            const module = await importFile(global.__filename(dir)).catch(console.error)
            if (module) plugins2[filename] = module
        } catch (e) {
            conn?.logger.error(`error require plugin2 '${filename}\n${format(e)}'`)
        } finally {
            plugins2 = Object.fromEntries(Object.entries(plugins2).sort(([a], [b]) => a.localeCompare(b)))
        }
    }
}

export {
    plugin2Folder,
    plugin2Filter,
    plugins2,
    watcher2,
    plugin2Folders,
    filesInit2,
    deletePluginFolder2,
    reload2
}