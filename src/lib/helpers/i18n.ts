import Config from '../Config'

export function getI18n () {
  let language = Config.getLanguage()
  let I18N = {
    en: {
      decision: 'Decision',
      modifiedDate: 'Last Modified Date',
      lastStatus: 'Last Status',
      logSavePath: 'Save Path:',
      tocHeader: 'Architecture Decision Records',
      status: {
        proposed: 'Proposed',
        accepted: 'Accepted',
        done: 'Done',
        deprecated: 'Deprecated',
        superseded: 'Superseded'
      }
    },
    'zh-cn': {
      decision: '决策',
      modifiedDate: '上次修改时间',
      lastStatus: '最后状态',
      logSavePath: '保存路径：',
      tocHeader: '架构决策纪录',
      status: {
        proposed: '提议',
        accepted: '通过',
        done: '完成',
        deprecated: '已弃用',
        superseded: '已取代'
      }
    }
  }

  return I18N[language]
}
