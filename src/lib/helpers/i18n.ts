import Config from '../Config'

export function getI18n () {
  let language = Config.getLanguage()
  let I18N = {
    en: {
      decision: 'Decision',
      Status: 'Status',
      statusStr: 'proposed/accepted/done/deprecated/superseded',
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
    fa: {
      decision: 'تصمیم',
      Status: 'وضعیت',
      statusStr: 'پیشنهاد شده/پذیرفته شده/پیاده شده/منسوخ/جایگزین شده',
      modifiedDate: 'آخرین تاریخ ویرایش',
      lastStatus: 'آخرین وضعیت',
      logSavePath: 'مسیر ذخیره سازی:',
      tocHeader: 'مدارک تصمیمات معماری',
      status: {
        proposed: 'پیشنهاد شده',
        accepted: 'پذیرفته شده',
        done: 'پیاده شده',
        deprecated: 'منسوخ',
        superseded: 'جایگزین شده'
      }
    },
    'zh-cn': {
      decision: '决策',
      Status: '状态',
      statusStr: '提议/通过/完成/已弃用/已取代',
      modifiedDate: '上次修改时间',
      lastStatus: '最后状态',
      logSavePath: '保存路径：',
      tocHeader: '架构决策记录',
      status: {
        proposed: '提议',
        accepted: '通过',
        done: '完成',
        deprecated: '已弃用',
        superseded: '已取代'
      }
    },
    'pt-br': {
      decision: 'Decisão',
      Status: 'Status',
      statusStr: 'proposto/aceito/finalizado/descontinuado/cancelado',
      modifiedDate: 'Data da última modificação',
      lastStatus: 'Último status',
      logSavePath: 'Salvo em:',
      tocHeader: 'Registros de Decisão de Arquitetura',
      status: {
        proposed: 'Proposto',
        accepted: 'Aceito',
        done: 'Finalizado',
        deprecated: 'Descontinuado',
        superseded: 'Cancelado'
      }
    },
    'it-IT': {
      decision: 'Decisione',
      Status: 'Stato',
      statusStr: 'proposta/accettata/implementata/deprecata/sostituita',
      modifiedDate: 'Ultima Modifica',
      lastStatus: 'Stato più recente',
      logSavePath: 'Cartella di salvataggio:',
      tocHeader: 'Registro Decisioni Architetturali',
      status: {
        proposed: 'Proposta',
        accepted: 'Accettata',
        done: 'Implementata',
        deprecated: 'Deprecata',
        superseded: 'Sostituita'
      }
    },
    'fr': {
      decision: 'Décision',
      Status: 'Statut',
      statusStr: 'propose/accepte/termine/deprecie/remplace',
      modifiedDate: 'Date dernière modif.',
      lastStatus: 'Dernier statut',
      logSavePath: 'Chemin de sauvegarde:',
      tocHeader: 'Compte-rendu de Décision d’Architecture',
      status: {
        propose: 'Proposé',
        accepte: 'Accepté',
        termine: 'Terminé',
        deprecie: 'Déprécié',
        remplace: 'Remplacé'
      }
    },
    ru: {
      decision: 'Решение',
      Status: 'Статус',
      statusStr: 'предложено/принято/реализовано/устарело/изменено',
      modifiedDate: 'Дата последнего изменения',
      lastStatus: 'Последний статус',
      logSavePath: 'Путь хранения логов:',
      tocHeader: 'Лог архитектурных решений',
      status: {
        proposed: 'Предложено',
        accepted: 'Принято',
        done: 'Реализовано',
        deprecated: 'Устарело',
        superseded: 'Изменено'
      }
    },
  }

  return I18N[language]
}
