import type { MenuItemConstructorOptions } from 'electron'

/** Built-in Desktop languages and the native-menu copy. */
const en = { application: 'Application', edit: 'Edit', menuBar: 'Application menu',
  undo: 'Undo', redo: 'Redo', cut: 'Cut', copy: 'Copy', paste: 'Paste', delete: 'Delete', selectAll: 'Select All',
  view: 'View', reload: 'Reload', forceReload: 'Force Reload', toggleDevTools: 'Toggle Developer Tools',
  actualSize: 'Actual Size', zoomIn: 'Zoom In', zoomOut: 'Zoom Out', toggleFullScreen: 'Toggle Full Screen',
  window: 'Window', minimize: 'Minimize', close: 'Close' }
const zh: typeof en = { application: '应用', edit: '编辑', menuBar: '应用菜单',
  undo: '撤销', redo: '重做', cut: '剪切', copy: '复制', paste: '粘贴', delete: '删除', selectAll: '全选',
  view: '查看', reload: '重新加载', forceReload: '强制重新加载', toggleDevTools: '切换开发者工具',
  actualSize: '实际大小', zoomIn: '放大', zoomOut: '缩小', toggleFullScreen: '切换全屏',
  window: '窗口', minimize: '最小化', close: '关闭' }
const uk: typeof en = { application: 'Програма', edit: 'Редагувати', menuBar: 'Меню програми',
  undo: 'Скасувати', redo: 'Повторити', cut: 'Вирізати', copy: 'Копіювати', paste: 'Вставити', delete: 'Видалити', selectAll: 'Виділити все',
  view: 'Вигляд', reload: 'Перезавантажити', forceReload: 'Примусово перезавантажити', toggleDevTools: 'Інструменти розробника',
  actualSize: 'Справжній розмір', zoomIn: 'Збільшити', zoomOut: 'Зменшити', toggleFullScreen: 'Повноекранний режим',
  window: 'Вікно', minimize: 'Згорнути', close: 'Закрити' }
const ru: typeof en = { application: 'Приложение', edit: 'Правка', menuBar: 'Меню приложения',
  undo: 'Отменить', redo: 'Повторить', cut: 'Вырезать', copy: 'Копировать', paste: 'Вставить', delete: 'Удалить', selectAll: 'Выделить все',
  view: 'Вид', reload: 'Перезагрузить', forceReload: 'Принудительно перезагрузить', toggleDevTools: 'Инструменты разработчика',
  actualSize: 'Фактический размер', zoomIn: 'Увеличить', zoomOut: 'Уменьшить', toggleFullScreen: 'Полноэкранный режим',
  window: 'Окно', minimize: 'Свернуть', close: 'Закрыть' }


/** Follow the OS preference order, using the same primary-language match as the official frontend. */
export function preferredDesktopLocale(languages: readonly string[]): 'zh' | 'en' | 'uk' | 'ru' {
  for (const language of languages) {
    const primary = language.toLowerCase().replaceAll('_', '-').split('-')[0]
    if (primary === 'zh' || primary === 'en' || primary === 'uk' || primary === 'ru') return primary
  }
  return 'en'
}

export function resolveDesktopLocale(language: string) {
  const l = language.toLowerCase();
  if (l.startsWith('uk')) return { messages: uk };
  if (l.startsWith('ru')) return { messages: ru };
  if (l.startsWith('zh')) return { messages: zh };
  return { messages: en };
}

/**
 * Application-menu bars that Electron only localizes on macOS. On Linux the bare
 * `role` menus stay English, so expand them with the same bilingual copy Windows
 * already uses; macOS keeps the roles and the system-owned translations.
 */
export function roleApplicationMenuTemplate(appItems: MenuItemConstructorOptions[], language: string): MenuItemConstructorOptions[] {
  const application: MenuItemConstructorOptions = { label: 'DSH NEXT', submenu: appItems }
  if (process.platform !== 'linux') return [application, { role: 'editMenu' }, { role: 'viewMenu' }, { role: 'windowMenu' }]
  const { messages: m } = resolveDesktopLocale(language)
  return [
    application,
    { label: m.edit, submenu: [
      { role: 'undo', label: m.undo }, { role: 'redo', label: m.redo },
      { type: 'separator' },
      { role: 'cut', label: m.cut }, { role: 'copy', label: m.copy }, { role: 'paste', label: m.paste },
      { role: 'delete', label: m.delete },
      { type: 'separator' }, { role: 'selectAll', label: m.selectAll },
    ] },
    { label: m.view, submenu: [
      { role: 'reload', label: m.reload }, { role: 'forceReload', label: m.forceReload },
      { role: 'toggleDevTools', label: m.toggleDevTools },
      { type: 'separator' },
      { role: 'resetZoom', label: m.actualSize }, { role: 'zoomIn', label: m.zoomIn }, { role: 'zoomOut', label: m.zoomOut },
      { type: 'separator' }, { role: 'togglefullscreen', label: m.toggleFullScreen },
    ] },
    { label: m.window, submenu: [
      { role: 'minimize', label: m.minimize }, { role: 'close', label: m.close },
    ] },
  ]
}
