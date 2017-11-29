import Config from '../Config'

export function getI18n () {
  let language = Config.getLanguage()
  let I18N = {
    en: {
      decision: 'Decision',
      modifiedDate: 'Last Modified Date',
      lastStatus: 'Last Status',
      logSavePath: 'Save Path:'
    },
    'zh-cn': {
      decision: '决策',
      modifiedDate: '上次修改时间',
      lastStatus: '最后状态',
      logSavePath: '保存路径：'
    }
  }

  return I18N[language]
}
