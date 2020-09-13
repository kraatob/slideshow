const importAll = (r) => r.keys().forEach(r)

import './bootstrap.sass'
import './base.sass'

importAll(require.context('./blocks', true, /\.sass$/))
