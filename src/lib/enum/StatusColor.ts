import { Status } from './Status'

const StatusColor = new Map<Status, string>([
  [Status.proposed, 'white'],
  [Status.accepted, 'cyan'],
  [Status.done, 'green'],
  [Status.deprecated, 'red'],
  [Status.superseded, 'yellow']
])

export default StatusColor
