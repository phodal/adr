import {create} from './lib/create'
import {list} from './lib/list'
import Utils from './lib/utils'
import {update} from './lib/update'
import {generate, GenerateClass} from './lib/generate'
import {init} from './lib/init'
import {logs} from './lib/logs'
import Status from './lib/status'

export default {
  create: create,
  list: list,
  Utils: Utils,
  update: update,
  generate: generate,
  init: init,
  logs: logs,
  GenerateClass: GenerateClass,
  Status: Status
}
