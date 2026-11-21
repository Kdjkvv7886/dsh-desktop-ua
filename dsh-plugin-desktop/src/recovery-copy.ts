/** Shared recovery copy used by the native page and its main-process actions. */

import type { DesktopLocale } from './runtime.ts'
import type { DesktopStartupRecoveryOperationStage } from './startup-recovery-controller.ts'

export type DesktopRecoveryTab = 'quick' | 'plugins' | 'rollback' | 'profiles' | 'data' | 'diagnostics'

export type DesktopStartupFailureStage =
  | 'electron-ready'
  | 'shell-environment'
  | 'runtime-bootstrap'
  | 'profile-selection'
  | 'profile-composition'
  | 'host-boot'
  | 'renderer-startup'
  | 'health-commit'

/** Failures after a successful start, which Next and Beta report through the same recovery assistant. */
export type DesktopRuntimeFailureStage = 'host-runtime' | 'renderer-runtime' | 'desktop-runtime'

export type DesktopFailureStage = DesktopStartupFailureStage | DesktopRuntimeFailureStage

const RUNTIME_FAILURE_STAGES: ReadonlySet<DesktopFailureStage> = new Set<DesktopRuntimeFailureStage>(['host-runtime', 'renderer-runtime', 'desktop-runtime'])

/**
 * @param stage - Where a failure stopped the Desktop.
 * @returns Whether startup had already finished, so the recovery assistant must not say startup stopped.
 */
export function isRuntimeFailureStage(stage: DesktopFailureStage): stage is DesktopRuntimeFailureStage {
  return RUNTIME_FAILURE_STAGES.has(stage)
}

export interface DesktopRecoveryCopy {
  readonly title: string
  readonly fallbackBody: string
  readonly reason: string
  readonly requestedMode: string
  readonly requestedBody: string
  readonly currentProfile: string
  readonly currentProfileDirectory: string
  readonly failureStage: string
  /** Replaces `failureStage` for a runtime stage, where startup had already finished. */
  readonly runtimeFailureStage: string
  readonly stageLabels: Readonly<Record<DesktopFailureStage, string>>
  readonly tabs: Readonly<Record<DesktopRecoveryTab, string>>
  readonly guideActions: Readonly<Record<Exclude<DesktopRecoveryTab, 'quick'>, string>>
  readonly quickRecovery: string
  readonly quickRecoveryBody: string
  readonly pluginGuideBody: string
  readonly rollbackGuideBody: string
  readonly profileSwitchGuideBody: string
  readonly dataGuideBody: string
  readonly diagnosticsGuideBody: string
  readonly safeMode: string
  readonly safeModeBody: string
  readonly safeModeActiveBody: string
  readonly safeModeUnavailable: string
  readonly enterSafeMode: string
  readonly confirmSafeMode: string
  readonly confirmSafeModeMessage: string
  readonly confirmSafeModeBody: string
  readonly confirmSafeModeAction: string
  readonly safeModeNotificationTitle: string
  readonly safeModeNotificationBody: string
  readonly checkpoints: string
  readonly checkpointsUnavailable: string
  readonly rollbackBody: string
  readonly plugins: string
  readonly pluginsBody: string
  readonly pluginsUnavailable: string
  readonly pluginsEmpty: string
  readonly core: string
  readonly profileDependency: string
  readonly external: string
  readonly disabled: string
  readonly disable: string
  readonly enable: string
  readonly disabledHint: string
  readonly uninstall: string
  readonly diagnostics: string
  readonly savingDiagnostics: string
  readonly diagnosticsSaved: string
  readonly diagnosticsFailed: string
  readonly saveDiagnostics: string
  readonly showDiagnostics: string
  readonly privacy: string
  readonly configurationFiles: string
  readonly configurationFilesBody: string
  readonly openSettingsDocument: string
  readonly openProfilePatch: string
  readonly openProfileManifest: string
  readonly openProfileDirectory: string
  readonly profiles: string
  readonly profilesBody: string
  readonly profilesUnavailable: string
  readonly profilesEmpty: string
  readonly switchProfile: string
  readonly addProfile: string
  readonly resetAndDataManagement: string
  readonly dataManagement: string
  readonly dataManagementBody: string
  readonly currentDataDirectory: string
  readonly changeDataDirectory: string
  readonly restoreDefaultDataDirectory: string
  readonly dataDirectoryUnavailable: string
  readonly dataDirectoryPath: string
  readonly dataDirectoryPlaceholder: string
  readonly selectDataDirectory: string
  readonly browse: string
  readonly applyDataDirectory: string
  readonly cancelDataDirectoryChange: string
  readonly factoryReset: string
  readonly factoryResetBody: string
  readonly factoryResetAction: string
  readonly confirmDataDirectoryChange: string
  readonly confirmDataDirectoryChangeMessage: string
  readonly confirmDataDirectoryChangeBody: string
  readonly continueDataDirectoryChange: string
  readonly confirmRestoreDefaultDirectory: string
  readonly confirmRestoreDefaultDirectoryMessage: string
  readonly confirmRestoreDefaultDirectoryBody: string
  readonly confirmRestoreDefaultDirectoryAction: string
  readonly confirmCreateDefaultDirectory: string
  readonly confirmCreateDefaultDirectoryMessage: string
  readonly confirmCreateDefaultDirectoryBody: string
  readonly confirmCreateDefaultDirectoryAction: string
  readonly confirmFactoryReset: string
  readonly confirmFactoryResetMessage: string
  readonly confirmFactoryResetBody: (currentDirectory: string) => string
  readonly confirmFactoryResetAction: string
  readonly dataOperationFailedTitle: string
  readonly dataOperationFailedMessage: string
  readonly openTerminal: string
  readonly emptySlot: string
  readonly availableSlot: string
  readonly noHealthyStartup: string
  readonly openCheckpoint: string
  readonly rollbackCheckpoint: string
  readonly desktopVersion: string
  readonly pluginCount: string
  readonly configurationFileCount: string
  readonly checkpointSize: string
  readonly unknown: string
  readonly restart: string
  readonly quit: string
  readonly working: string
  readonly back: string
  readonly cancel: string
  readonly confirmUninstall: string
  readonly confirmUninstallBody: string
  readonly confirmDisable: string
  readonly confirmDisableBody: string
  readonly confirmDisableAction: string
  readonly confirmEnable: string
  readonly confirmEnableBody: string
  readonly confirmEnableAction: string
  readonly confirmRollback: string
  readonly confirmRollbackBody: (capturedAt: string) => string
  readonly confirmRollbackAction: string
  readonly uninstalledSuccess: string
  readonly disabledSuccess: string
  readonly enabledSuccess: string
  readonly rollbackSuccess: (slotId: string) => string
  readonly profileSelectedSuccess: string
  readonly actionFailed: string
  readonly rollbackFailedTitle: string
  readonly rollbackFailedMessage: string
  readonly uninstallFailedTitle: string
  readonly uninstallFailedMessage: string
  readonly bundleSelectionFailedTitle: string
  readonly bundleSelectionFailedMessage: string
  readonly operationStage: string
  readonly operationStageLabels: Readonly<Record<DesktopStartupRecoveryOperationStage, string>>
  readonly errorCode: string
  readonly technicalDetails: string
  readonly close: string
}

const COPY: Record<DesktopLocale, DesktopRecoveryCopy> = {
  en: {
    title: 'DSH Desktop Recovery Assistant',
    fallbackBody: 'The recovery information could not be read. Quit and start DSH Desktop again.',
    reason: 'Why Recovery Mode opened',
    requestedMode: 'Recovery Mode opened manually',
    requestedBody: 'Normal startup is paused. The current Profile and plugins have not loaded.',
    currentProfile: 'Current Profile',
    currentProfileDirectory: 'Profile folder',
    failureStage: 'Startup stopped at',
    runtimeFailureStage: 'Stopped while running',
    stageLabels: {
      'electron-ready': 'Electron initialization',
      'shell-environment': 'Shell environment preparation',
      'runtime-bootstrap': 'Desktop runtime preparation',
      'profile-selection': 'Profile selection',
      'profile-composition': 'Plugin configuration composition',
      'host-boot': 'Plugin Host startup',
      'renderer-startup': 'Desktop interface startup',
      'health-commit': 'Startup health confirmation',
      'host-runtime': 'Plugin Host',
      'renderer-runtime': 'Desktop interface',
      'desktop-runtime': 'Desktop action',
    },
    tabs: { quick: 'Quick recovery', plugins: 'Plugin management', rollback: 'Rollback', profiles: 'Switch Profile', data: 'Reset & data', diagnostics: 'Diagnostics' },
    guideActions: { plugins: 'Manage plugins', rollback: 'View checkpoints', profiles: 'Switch Profile', data: 'Manage data', diagnostics: 'View diagnostics' },
    quickRecovery: 'Quick recovery',
    quickRecoveryBody: 'Choose a recovery option for the problem. If the cause is unclear, try Safe Mode first. If you already have a clue, go directly to plugins, checkpoints, or Profiles.',
    pluginGuideBody: 'Problems after installing or updating a plugin? Review plugins in the current Profile and uninstall third-party plugins that may be involved.',
    rollbackGuideBody: 'Unable to start after a configuration change? Choose a startup checkpoint from before the failure, then preview and restore its configuration.',
    profileSwitchGuideBody: 'Need to get back to work? Switch to another Profile or create a new configuration environment. The current Profile is kept for later investigation.',
    dataGuideBody: 'View or change the DSH data directory. A factory reset removes data from the current directory, so try other recovery options first.',
    diagnosticsGuideBody: 'View configuration files or export a diagnostic archive to investigate. Review the archive before sharing it.',
    safeMode: 'Safe Mode',
    safeModeBody: 'Start with a temporary environment without loading existing plugins, settings, conversations, or workspace records. Existing data is kept. After leaving Safe Mode, the temporary environment is removed on the next normal startup.',
    safeModeActiveBody: 'You are using a temporary environment. Existing Profiles and data are not loaded. Configuration actions here affect only the temporary environment. Restart to leave Safe Mode.',
    safeModeUnavailable: 'Safe Mode cannot be prepared at this startup stage. Diagnostics remain available.',
    enterSafeMode: 'Enter Safe Mode',
    confirmSafeMode: 'Enter Safe Mode?',
    confirmSafeModeMessage: 'Restart with a temporary environment?',
    confirmSafeModeBody: 'The app will use a separate temporary data directory without reading or changing existing Profiles or data. After leaving Safe Mode, the temporary environment is removed on the next normal startup.',
    confirmSafeModeAction: 'Restart in Safe Mode',
    safeModeNotificationTitle: 'Safe Mode is active',
    safeModeNotificationBody: 'The app is using a temporary environment without loading existing DSH data. The next normal startup restores access to existing data and removes the temporary environment.',
    checkpoints: 'Startup checkpoints',
    checkpointsUnavailable: 'Startup checkpoints cannot be read right now.',
    rollbackBody: 'Checkpoints save configuration from successful startups. Restoring one also restores the current Profile, the shared settings.yaml file, and patches in the DSH data directory.',
    plugins: 'Plugin management',
    pluginsBody: 'View plugins installed directly in the current Profile. Disable a plugin to keep it installed without loading it, or uninstall it completely.',
    pluginsUnavailable: 'Plugin information for the current Profile has not loaded. Open Diagnostics to view configuration files or export a diagnostic archive.',
    pluginsEmpty: 'No plugins were found in the current Profile.',
    core: 'Built in',
    profileDependency: 'Directly installed plugin',
    external: 'Not directly removable',
    disabled: 'Disabled',
    disable: 'Disable',
    enable: 'Enable',
    disabledHint: 'Still installed, not loaded',
    uninstall: 'Uninstall',
    diagnostics: 'Diagnostic archive',
    savingDiagnostics: 'Saving a local diagnostic archive…',
    diagnosticsSaved: 'The diagnostic archive was saved locally and is never uploaded automatically.',
    diagnosticsFailed: 'Could not save the diagnostic archive. Please export it again.',
    saveDiagnostics: 'Export diagnostics',
    showDiagnostics: 'Show in folder',
    privacy: 'The archive may contain local paths, logs, system information, and crash-memory fragments. Review it before sharing.',
    configurationFiles: 'Configuration files',
    configurationFilesBody: 'View or edit the current Profile configuration and shared configuration in the DSH data directory. Restart the app to apply changes.',
    openSettingsDocument: 'Open settings.yaml',
    openProfilePatch: 'Edit Profile patch',
    openProfileManifest: 'Edit plugin manifest',
    openProfileDirectory: 'Open Profile folder',
    profiles: 'Available Profiles',
    profilesBody: 'Switch to another Desktop-compatible Profile or create a new one.',
    profilesUnavailable: 'Available Profiles have not loaded. Switching is unavailable right now.',
    profilesEmpty: 'No other Desktop-compatible Profiles are available.',
    switchProfile: 'Switch',
    addProfile: 'New Profile',
    resetAndDataManagement: 'Reset & data management',
    dataManagement: 'Data management',
    dataManagementBody: 'View or change the DSH data directory, which stores Profiles, plugins, settings, and conversations. Changing the directory does not delete data in the previous location.',
    currentDataDirectory: 'Current data directory',
    changeDataDirectory: 'Change data directory',
    restoreDefaultDataDirectory: 'Restore default',
    dataDirectoryUnavailable: 'The current data directory has not been resolved, or the app is in Safe Mode. The data directory cannot be changed right now.',
    dataDirectoryPath: 'New data directory',
    dataDirectoryPlaceholder: 'Enter the full path',
    selectDataDirectory: 'Select a DSH data directory',
    browse: 'Browse…',
    applyDataDirectory: 'Change directory and restart',
    cancelDataDirectoryChange: 'Cancel change',
    factoryReset: 'Factory reset',
    factoryResetBody: 'Move the current DSH data directory to the Trash or Recycle Bin, then restart and create a new default Profile. Project files outside this directory are kept.',
    factoryResetAction: 'Reset data and restart',
    confirmDataDirectoryChange: 'Change the data directory?',
    confirmDataDirectoryChangeMessage: 'Choose a new DSH data directory?',
    confirmDataDirectoryChangeBody: 'Choose an empty folder or an existing DSH data directory. An empty folder will be used to create a new environment. The previous data directory will be kept.',
    continueDataDirectoryChange: 'Choose directory',
    confirmRestoreDefaultDirectory: 'Restore the default data directory?',
    confirmRestoreDefaultDirectoryMessage: 'Switch to the default data directory and restart?',
    confirmRestoreDefaultDirectoryBody: 'DSH Desktop will use the default data directory for this system after restart. The current data directory will not be deleted.',
    confirmRestoreDefaultDirectoryAction: 'Restore and restart',
    confirmCreateDefaultDirectory: 'Create the default data directory?',
    confirmCreateDefaultDirectoryMessage: 'The default data directory does not exist. Create it?',
    confirmCreateDefaultDirectoryBody: 'DSH Desktop will create a new environment at the default path and use it after restart. The current data directory will not be deleted.',
    confirmCreateDefaultDirectoryAction: 'Create and restart',
    confirmFactoryReset: 'Factory reset DSH Desktop?',
    confirmFactoryResetMessage: 'Remove current DSH data and initialize a new environment?',
    confirmFactoryResetBody: currentDirectory => `The following directory will be moved to the operating-system Trash or Recycle Bin:\n\n${currentDirectory}\n\nProfiles, plugins, settings, credentials, sessions, attachments, and workspace records stored there will be removed from DSH Desktop. Project files outside this directory are not deleted. DSH Desktop will restart and create a clean default Profile.`,
    confirmFactoryResetAction: 'Reset data and restart',
    dataOperationFailedTitle: 'Data operation failed',
    dataOperationFailedMessage: 'The data directory operation did not complete. Check the error details and the current directory state before retrying.',
    openTerminal: 'Open DSH Terminal',
    emptySlot: 'No checkpoint yet',
    availableSlot: 'Ready to restore',
    noHealthyStartup: 'No configuration from a successful startup has been saved here yet.',
    openCheckpoint: 'Browse files',
    rollbackCheckpoint: 'Restore this checkpoint',
    desktopVersion: 'DSH Desktop version',
    pluginCount: 'Plugins',
    configurationFileCount: 'Configuration files',
    checkpointSize: 'Checkpoint size',
    unknown: 'Unknown',
    restart: 'Restart DSH Desktop',
    quit: 'Quit',
    working: 'Applying the recovery action…',
    back: 'Back',
    cancel: 'Cancel',
    confirmUninstall: 'Uninstall this plugin?',
    confirmUninstallBody: 'Uninstall this plugin from the current Profile and update plugin dependencies.',
    confirmDisable: 'Disable this plugin?',
    confirmDisableBody: 'Nothing is deleted. The plugin, its version declaration and its configuration all stay in the current Profile — DSH Desktop simply will not load it on the next start. You can enable it again here at any time.',
    confirmDisableAction: 'Disable plugin',
    confirmEnable: 'Enable this plugin?',
    confirmEnableBody: 'DSH Desktop will load this plugin again on the next start. If this plugin caused the startup failure, the recovery assistant will open again and you can disable it once more.',
    confirmEnableAction: 'Enable plugin',
    confirmRollback: 'Restore this checkpoint?',
    confirmRollbackBody: capturedAt => `This immediately restores the current Profile plus the checkpointed settings.yaml and Harness-home patch captured at ${capturedAt}, including which plugins are enabled. After restarting, DSH Desktop will use the rolled-back configuration.`,
    confirmRollbackAction: 'Restore configuration',
    uninstalledSuccess: 'The plugin was removed from the current Profile. Restart DSH Desktop to use the updated plugin configuration.',
    disabledSuccess: 'The plugin is disabled and still installed. Restart DSH Desktop to start without it; nothing was removed from the Profile.',
    enabledSuccess: 'The plugin is enabled again. Restart DSH Desktop to load it.',
    rollbackSuccess: slotId => `Rolled back to ${slotId}. Restart DSH Desktop to use this configuration; the first healthy start after rollback will preserve all three existing slots.`,
    profileSelectedSuccess: 'This Profile is now selected. Restart DSH Desktop to use it.',
    actionFailed: 'Could not complete the recovery action. Check the error details, or export diagnostics to investigate further.',
    rollbackFailedTitle: 'Could not restore checkpoint',
    rollbackFailedMessage: 'Configuration restoration did not complete. Check the error details before retrying. The recovery assistant will stay open.',
    uninstallFailedTitle: 'Plugin uninstall failed',
    uninstallFailedMessage: 'Plugin removal did not complete. Check the error details and try again. The recovery assistant will stay open.',
    bundleSelectionFailedTitle: 'Could not change the plugin',
    bundleSelectionFailedMessage: 'The Profile plugin list was not changed. Check the error details and try again. The recovery assistant will stay open.',
    operationStage: 'Operation stage',
    operationStageLabels: {
      'bundle-selection': 'Profile plugin selection',
      'checkpoint-restore': 'Checkpoint file restore',
      'dependency-materialization': 'Profile dependency rebuild',
      'plugin-change': 'DSH plugin uninstall',
    },
    errorCode: 'Error code',
    technicalDetails: 'Technical details',
    close: 'Close',
  },
  zh: {
    title: 'DSH Desktop 恢复助手',
    fallbackBody: '无法读取恢复信息。请退出并重新启动 DSH Desktop。',
    reason: '进入恢复模式的原因',
    requestedMode: '已手动进入恢复模式',
    requestedBody: '已暂停正常启动，尚未加载当前 Profile 和插件。',
    currentProfile: '当前 Profile',
    currentProfileDirectory: 'Profile 目录',
    failureStage: '启动停止位置',
    runtimeFailureStage: '运行中断位置',
    stageLabels: {
      'electron-ready': 'Electron 初始化',
      'shell-environment': 'Shell 环境准备',
      'runtime-bootstrap': '桌面运行时准备',
      'profile-selection': 'Profile 选择',
      'profile-composition': '插件配置组合',
      'host-boot': '启动插件服务',
      'renderer-startup': '桌面界面启动',
      'health-commit': '确认启动结果',
      'host-runtime': '插件服务',
      'renderer-runtime': '桌面界面',
      'desktop-runtime': '桌面操作',
    },
    tabs: { quick: '快速恢复', plugins: '插件管理', rollback: '回滚', profiles: '切换 Profile', data: '重置与数据管理', diagnostics: '诊断' },
    guideActions: { plugins: '管理插件', rollback: '查看检查点', profiles: '切换 Profile', data: '管理数据', diagnostics: '查看诊断' },
    quickRecovery: '快速恢复',
    quickRecoveryBody: '选择适合当前问题的恢复方式。不确定原因时，可先尝试安全模式；如果已有故障线索，也可以直接管理插件、恢复检查点或切换 Profile。',
    pluginGuideBody: '安装或更新插件后出现问题？查看当前 Profile 的插件，卸载可能引发问题的第三方插件。',
    rollbackGuideBody: '更新配置后无法启动？选择故障发生前的启动检查点，预览并恢复当时的配置。',
    profileSwitchGuideBody: '需要先恢复使用？切换到其他 Profile，或创建新的配置环境。当前 Profile 会保留，便于之后排查。',
    dataGuideBody: '查看或更改 DSH 数据目录。恢复出厂设置会移除当前目录中的数据，建议先尝试其他恢复方式。',
    diagnosticsGuideBody: '查看配置文件，或导出诊断包以排查问题。分享诊断包前，请先检查其中的内容。',
    safeMode: '安全模式',
    safeModeBody: '使用临时环境启动，暂不读取原有插件、设置、会话和工作区记录。原有数据会保留；退出安全模式后，下次正常启动时会自动清理临时环境。',
    safeModeActiveBody: '当前处于临时环境，原有 Profile 和数据未加载。这里的配置操作仅针对临时环境；重启后将退出安全模式。',
    safeModeUnavailable: '当前启动阶段无法创建安全模式环境，但仍可查看诊断信息。',
    enterSafeMode: '进入安全模式',
    confirmSafeMode: '进入安全模式？',
    confirmSafeModeMessage: '重启并使用临时环境？',
    confirmSafeModeBody: '应用将使用独立的临时数据目录，不读取或修改原有 Profile 和数据。退出安全模式后，下次正常启动时会自动清理临时环境。',
    confirmSafeModeAction: '重启到安全模式',
    safeModeNotificationTitle: '安全模式已启用',
    safeModeNotificationBody: '当前使用临时环境，未读取原有 DSH 数据。下次正常启动时将恢复使用原有数据，并清理临时环境。',
    checkpoints: '启动检查点',
    checkpointsUnavailable: '当前无法读取启动检查点。',
    rollbackBody: '检查点保存成功启动时的配置。选择一个检查点，将同时恢复当前 Profile、共享设置文件 settings.yaml 和 DSH 数据目录中的补丁。',
    plugins: '插件管理',
    pluginsBody: '查看当前 Profile 中直接安装的插件。可以禁用插件（保留安装，启动时不加载），也可以彻底卸载。',
    pluginsUnavailable: '尚未读取到当前 Profile 的插件信息。可前往“诊断”查看配置或导出诊断包。',
    pluginsEmpty: '当前 Profile 中没有插件。',
    core: '内置组件',
    profileDependency: '直接安装的插件',
    external: '不可直接卸载',
    disabled: '已禁用',
    disable: '禁用',
    enable: '启用',
    disabledHint: '仍已安装，启动时不加载',
    uninstall: '卸载',
    diagnostics: '诊断包',
    savingDiagnostics: '正在保存本地诊断包…',
    diagnosticsSaved: '诊断包已保存在本地，不会自动上传。',
    diagnosticsFailed: '未能保存诊断包。请重新导出。',
    saveDiagnostics: '导出诊断信息',
    showDiagnostics: '在文件夹中显示',
    privacy: '诊断包可能包含本地路径、日志、系统信息和崩溃内存片段，分享前请先检查。',
    configurationFiles: '配置文件',
    configurationFilesBody: '查看或编辑当前 Profile 的配置与 DSH 数据目录中的共享配置。更改后需重启应用才能生效。',
    openSettingsDocument: '打开 settings.yaml',
    openProfilePatch: '编辑 Profile 补丁',
    openProfileManifest: '编辑插件清单',
    openProfileDirectory: '打开 Profile 目录',
    profiles: '可用 Profile',
    profilesBody: '切换到其他支持桌面端的 Profile，或新建一个 Profile。',
    profilesUnavailable: '尚未读取到可用 Profile，暂时无法切换。',
    profilesEmpty: '没有其他支持桌面端的 Profile。',
    switchProfile: '切换',
    addProfile: '新建 Profile',
    resetAndDataManagement: '重置与数据管理',
    dataManagement: '数据管理',
    dataManagementBody: '查看或更改 DSH 数据目录。Profile、插件、设置和会话等数据保存在此目录中；更改目录不会删除原目录中的数据。',
    currentDataDirectory: '当前数据目录',
    changeDataDirectory: '更改数据目录',
    restoreDefaultDataDirectory: '恢复默认',
    dataDirectoryUnavailable: '尚未确定当前数据目录，或应用正处于安全模式，暂时无法更改数据目录。',
    dataDirectoryPath: '新的数据目录',
    dataDirectoryPlaceholder: '输入完整路径',
    selectDataDirectory: '选择 DSH 数据目录',
    browse: '浏览…',
    applyDataDirectory: '更改目录并重启',
    cancelDataDirectoryChange: '取消更改',
    factoryReset: '恢复出厂设置',
    factoryResetBody: '将当前 DSH 数据目录移入废纸篓或回收站，然后重启并创建新的默认 Profile。此目录以外的项目文件会保留。',
    factoryResetAction: '重置数据并重启',
    confirmDataDirectoryChange: '更改数据目录？',
    confirmDataDirectoryChangeMessage: '选择新的 DSH 数据目录？',
    confirmDataDirectoryChangeBody: '请选择空文件夹或已有的 DSH 数据目录。空文件夹将用于创建新环境；原数据目录会保留。',
    continueDataDirectoryChange: '选择目录',
    confirmRestoreDefaultDirectory: '恢复默认数据目录？',
    confirmRestoreDefaultDirectoryMessage: '切换到系统默认数据目录并重启？',
    confirmRestoreDefaultDirectoryBody: 'DSH Desktop 将改为使用当前系统的默认数据目录。当前数据目录不会被删除。',
    confirmRestoreDefaultDirectoryAction: '恢复默认并重启',
    confirmCreateDefaultDirectory: '新建默认数据目录？',
    confirmCreateDefaultDirectoryMessage: '默认数据目录不存在，是否新建？',
    confirmCreateDefaultDirectoryBody: 'DSH Desktop 将在默认路径创建一个全新的环境并重启。当前数据目录不会被删除。',
    confirmCreateDefaultDirectoryAction: '新建并重启',
    confirmFactoryReset: '恢复 DSH Desktop 出厂设置？',
    confirmFactoryResetMessage: '移除当前 DSH 数据并重新初始化？',
    confirmFactoryResetBody: currentDirectory => `以下目录将被移入系统废纸篓或回收站：\n\n${currentDirectory}\n\n其中保存的 Profile、插件、设置、凭据、会话、附件和工作区记录都会从 DSH Desktop 中移除；不会删除此目录以外的项目文件。随后 DSH Desktop 会重启并创建干净的默认 Profile。`,
    confirmFactoryResetAction: '重置数据并重启',
    dataOperationFailedTitle: '数据操作失败',
    dataOperationFailedMessage: '未能完成数据目录操作。请查看错误详情，确认当前目录状态后再重试。',
    openTerminal: '打开 DSH 终端',
    emptySlot: '尚无检查点',
    availableSlot: '可恢复',
    noHealthyStartup: '此位置尚未保存成功启动时的配置。',
    openCheckpoint: '浏览文件',
    rollbackCheckpoint: '恢复此检查点',
    desktopVersion: 'DSH Desktop 版本',
    pluginCount: '插件',
    configurationFileCount: '配置文件',
    checkpointSize: '检查点大小',
    unknown: '未知',
    restart: '重启 DSH Desktop',
    quit: '退出',
    working: '正在执行恢复操作…',
    back: '返回',
    cancel: '取消',
    confirmUninstall: '卸载这个插件？',
    confirmUninstallBody: '将从当前 Profile 中卸载此插件，并更新插件依赖。',
    confirmDisable: '禁用这个插件？',
    confirmDisableBody: '不会删除任何内容。插件本身、版本声明和配置都会完整保留在当前 Profile 中，只是下次启动时不再加载。随时可以在这里重新启用。',
    confirmDisableAction: '禁用插件',
    confirmEnable: '启用这个插件？',
    confirmEnableBody: '下次启动时会重新加载此插件。如果之前的启动失败正是由它引起，恢复助手会再次打开，届时可以再次禁用。',
    confirmEnableAction: '启用插件',
    confirmRollback: '恢复此检查点？',
    confirmRollbackBody: capturedAt => `将立即恢复 ${capturedAt} 创建的检查点中的 Profile、共享设置文件 settings.yaml 与 DSH 数据目录补丁（包括插件的启用状态）；重启后，DSH Desktop 将使用回滚后的配置。`,
    confirmRollbackAction: '恢复配置',
    uninstalledSuccess: '插件已从当前 Profile 中卸载。请重启 DSH Desktop 以使用更新后的插件配置。',
    disabledSuccess: '插件已禁用，安装内容仍然保留。重启 DSH Desktop 后将不再加载；Profile 中没有任何内容被删除。',
    enabledSuccess: '插件已重新启用。重启 DSH Desktop 后将重新加载。',
    rollbackSuccess: slotId => `已恢复检查点 ${slotId}。重启后将使用恢复的配置；首次成功启动时会保留现有检查点。`,
    profileSelectedSuccess: '已设为当前 Profile。请重启 DSH Desktop 以使用该 Profile。',
    actionFailed: '未能完成恢复操作。请查看错误详情；如需进一步排查，可导出诊断信息。',
    rollbackFailedTitle: '未能恢复检查点',
    rollbackFailedMessage: '配置恢复未完成。请查看错误详情，再决定是否重试。恢复助手会保持打开。',
    uninstallFailedTitle: '插件卸载失败',
    uninstallFailedMessage: '未能完成插件卸载。请查看错误详情后重试。恢复助手会保持打开。',
    bundleSelectionFailedTitle: '未能更改插件状态',
    bundleSelectionFailedMessage: 'Profile 的插件列表未被修改。请查看错误详情后重试。恢复助手会保持打开。',
    operationStage: '操作阶段',
    operationStageLabels: {
      'bundle-selection': 'Profile 插件启用状态',
      'checkpoint-restore': '恢复检查点文件',
      'dependency-materialization': 'Profile 依赖重建',
      'plugin-change': 'DSH 插件卸载',
    },
    errorCode: '错误代码',
    technicalDetails: '技术详情',
    close: '关闭',
  },
  uk: {
    title: 'Помічник відновлення DSH Desktop',
    fallbackBody: 'Не вдалося прочитати дані відновлення. Будь ласка, закрийте та перезапустіть DSH Desktop.',
    reason: 'Причина переходу в режим відновлення',
    requestedMode: 'Ручний перехід у режим відновлення',
    requestedBody: 'Звичайний запуск призупинено; поточний профіль і плагіни ще не завантажувалися.',
    currentProfile: 'Поточний профіль',
    currentProfileDirectory: 'Каталог профілю',
    failureStage: 'Етап збою під час запуску',
    runtimeFailureStage: 'Етап збою під час роботи',
    quickRecovery: 'Швидке відновлення',
    quickRecoveryBody: 'Виберіть відповідний спосіб відновлення. Якщо причина невідома, спробуйте безпечний режим. Якщо є припущення щодо причини, можна налаштувати плагіни, відновити стан із контрольної точки або змінити профіль.',
    pluginGuideBody: 'Проблема виникла після встановлення або оновлення плагіна? Перегляньте плагіни поточного профілю та видаліть сторонні плагіни, які можуть спричиняти неполадки.',
    rollbackGuideBody: 'Не вдається запуститися після зміни конфігурації? Виберіть контрольну точку до виникнення збою, щоб переглянути та відновити тодішню конфігурацію.',
    profileSwitchGuideBody: 'Потрібно терміново продовжити роботу? Перемкніться на інший профіль або створіть новий. Поточний профіль буде збережено для подальшого аналізу.',
    dataGuideBody: 'Перегляньте або змініть каталог даних DSH. Скидання до початкового стану видалить дані в поточному каталозі, тому спочатку рекомендується спробувати інші способи відновлення.',
    diagnosticsGuideBody: 'Перегляньте файли конфігурації або експортуйте діагностичний пакет для усунення несправностей. Перед передачею пакета перевірте його вміст.',
    safeMode: 'Безпечний режим',
    safeModeBody: 'Запуск у тимчасовому середовищі без завантаження наявних плагінів, налаштувань, сесій та історії робочих просторів. Початкові дані збережуться; після виходу з безпечного режиму наступний звичайний запуск автоматично очистить тимчасове середовище.',
    safeModeActiveBody: 'Зараз активне тимчасове середовище; початковий профіль і дані не завантажено. Будь-які зміни конфігурації стосуються лише тимчасового середовища; після перезапуску безпечний режим буде вимкнено.',
    safeModeUnavailable: 'На поточному етапі запуску неможливо створити середовище безпечного режиму, але ви можете переглянути діагностичні дані.',
    enterSafeMode: 'Увійти в безпечний режим',
    confirmSafeMode: 'Увійти в безпечний режим?',
    confirmSafeModeMessage: 'Перезапустити у тимчасовому середовищі?',
    confirmSafeModeBody: 'Додаток використовуватиме окремий тимчасовий каталог даних і не читатиме та не змінюватиме ваші початкові профілі й дані. Після виходу з безпечного режиму наступний звичайний запуск автоматично очистить тимчасове середовище.',
    confirmSafeModeAction: 'Перезапустити в безпечному режимі',
    safeModeNotificationTitle: 'Безпечний режим увімкнено',
    safeModeNotificationBody: 'Наразі використовується тимчасове середовище без доступу до вихідних даних DSH. Під час наступного звичайного запуску доступ до ваших даних буде відновлено, а тимчасове середовище очищено.',
    checkpoints: 'Контрольні точки запуску',
    checkpointsUnavailable: 'Наразі не вдалося завантажити контрольні точки запуску.',
    rollbackBody: 'Контрольні точки зберігають конфігурацію успішних запусків. Вибір точки відновить стан поточного профілю, загальний файл settings.yaml і виправлення в каталозі даних DSH.',
    plugins: 'Керування плагінами',
    pluginsBody: 'Перегляд плагінів, установлених безпосередньо в поточному профілі. Можна вимкнути плагін (залишити встановленим без завантаження під час старту) або повністю видалити.',
    pluginsUnavailable: 'Інформацію про плагіни поточного профілю ще не отримано. Перейдіть у розділ «Діагностика», щоб переглянути конфігурацію або експортувати діагностичний пакет.',
    pluginsEmpty: 'У поточному профілі немає плагінів.',
    core: 'Вбудований компонент',
    profileDependency: 'Прямо встановлений плагін',
    external: 'Неможливо видалити напряму',
    disabled: 'Вимкнено',
    disable: 'Вимкнути',
    enable: 'Увімкнути',
    disabledHint: 'Встановлено, але не завантажується під час запуску',
    uninstall: 'Видалити',
    diagnostics: 'Діагностичний пакет',
    savingDiagnostics: 'Збереження локального діагностичного пакета…',
    diagnosticsSaved: 'Діагностичний пакет збережено локально; його не буде надіслано автоматично.',
    diagnosticsFailed: 'Не вдалося зберегти діагностичний пакет. Спробуйте експортувати знову.',
    saveDiagnostics: 'Експортувати діагностичні дані',
    showDiagnostics: 'Показати в папці',
    privacy: 'Діагностичний пакет може містити локальні шляхи, журнали, системну інформацію та фрагменти пам\'яті під час аварійного завершення. Перевірте вміст перед передачею.',
    configurationFiles: 'Файли конфігурації',
    configurationFilesBody: 'Перегляд або редагування конфігурації поточного профілю та спільних параметрів у каталозі даних DSH. Зміни набудуть чинності після перезапуску додатку.',
    openSettingsDocument: 'Відкрити settings.yaml',
    openProfilePatch: 'Редагувати патч профілю',
    openProfileManifest: 'Редагувати маніфест плагінів',
    openProfileDirectory: 'Відкрити каталог профілю',
    profiles: 'Доступні профілі',
    profilesBody: 'Перемкніться на інший профіль із підтримкою десктопу або створіть новий.',
    profilesUnavailable: 'Доступні профілі ще не завантажено; перемикання наразі неможливе.',
    profilesEmpty: 'Немає інших профілів із підтримкою десктопу.',
    switchProfile: 'Перемкнути',
    addProfile: 'Створити профіль',
    resetAndDataManagement: 'Скидання та керування даними',
    dataManagement: 'Керування даними',
    dataManagementBody: 'Перегляд або зміна каталогу даних DSH. Профілі, плагіни, налаштування та сесії зберігаються в цьому каталозі. Зміна каталогу не видаляє дані з попереднього розташування.',
    currentDataDirectory: 'Поточний каталог даних',
    changeDataDirectory: 'Змінити каталог даних',
    restoreDefaultDataDirectory: 'Відновити за замовчуванням',
    dataDirectoryUnavailable: 'Поточний каталог даних не визначено або додаток працює в безпечному режимі; зміна каталогу наразі недоступна.',
    dataDirectoryPath: 'Новий каталог даних',
    dataDirectoryPlaceholder: 'Введіть повний шлях',
    selectDataDirectory: 'Вибір каталогу даних DSH',
    browse: 'Огляд…',
    applyDataDirectory: 'Змінити каталог і перезапустити',
    cancelDataDirectoryChange: 'Скасувати зміни',
    factoryReset: 'Скинути до початкового стану',
    factoryResetBody: 'Переміщує поточний каталог даних DSH до кошика, перезапускає додаток і створює новий профіль за замовчуванням. Файли проєктів поза цим каталогом буде збережено.',
    factoryResetAction: 'Скинути дані та перезапустити',
    confirmDataDirectoryChange: 'Змінити каталог даних?',
    confirmDataDirectoryChangeMessage: 'Вибрати новий каталог даних DSH?',
    confirmDataDirectoryChangeBody: 'Виберіть порожню папку або наявний каталог даних DSH. Порожня папка використовуватиметься для створення нового середовища; початковий каталог даних буде збережено.',
    continueDataDirectoryChange: 'Вибрати каталог',
    confirmRestoreDefaultDirectory: 'Відновити стандартний каталог даних?',
    confirmRestoreDefaultDirectoryMessage: 'Перемкнутися на системний каталог даних за замовчуванням і перезапустити?',
    confirmRestoreDefaultDirectoryBody: 'DSH Desktop перейде на використання стандартного каталогу даних системи. Поточний каталог даних не буде видалено.',
    confirmRestoreDefaultDirectoryAction: 'Відновити за замовчуванням і перезапустити',
    confirmCreateDefaultDirectory: 'Створити стандартний каталог даних?',
    confirmCreateDefaultDirectoryMessage: 'Стандартний каталог даних не існує. Створити його?',
    confirmCreateDefaultDirectoryBody: 'DSH Desktop створить абсолютно нове середовище за стандартним шляхом і перезапуститься. Поточний каталог даних не буде видалено.',
    confirmCreateDefaultDirectoryAction: 'Створити та перезапустити',
    confirmFactoryReset: 'Скинути DSH Desktop до початкового стану?',
    confirmFactoryResetMessage: 'Видалити поточні дані DSH та повторно ініціалізувати додаток?',
    confirmFactoryResetAction: 'Скинути дані та перезапустити',
    dataOperationFailedTitle: 'Помилка операції з даними',
    dataOperationFailedMessage: 'Не вдалося виконати операцію з каталогом даних. Перегляньте деталі помилки, перевірте стан поточного каталогу та повторіть спробу.',
    openTerminal: 'Відкрити термінал DSH',
    emptySlot: 'Немає контрольних точок',
    availableSlot: 'Доступно для відновлення',
    noHealthyStartup: 'Для цього слота немає збереженої конфігурації успішного запуску.',
    openCheckpoint: 'Переглянути файли',
    rollbackCheckpoint: 'Відновити цю контрольну точку',
    desktopVersion: 'Версія DSH Desktop',
    pluginCount: 'Плагіни',
    configurationFileCount: 'Файли конфігурації',
    checkpointSize: 'Розмір контрольної точки',
    unknown: 'Невідомо',
    restart: 'Перезапустити DSH Desktop',
    quit: 'Вийти',
    working: 'Виконується операція відновлення…',
    back: 'Назад',
    cancel: 'Скасувати',
    confirmUninstall: 'Видалити цей плагін?',
    confirmUninstallBody: 'Плагін буде видалено з поточного профілю, а залежності плагінів буде оновлено.',
    confirmDisable: 'Вимкнути цей плагін?',
    confirmDisableBody: 'Нічого не буде видалено. Плагін, версії та конфігурація повністю збережуться в поточному профілі, але не завантажуватимуться під час запуску. Ви зможете увімкнути його знову тут у будь-який момент.',
    confirmDisableAction: 'Вимкнути плагін',
    confirmEnable: 'Увімкнути цей плагін?',
    confirmEnableBody: 'Плагін буде знову завантажено під час наступного запуску. Якщо попередній збій запуску спричинив саме він, помічник відновлення відкриється знову, і ви зможете повторно вимкнути його.',
    confirmEnableAction: 'Увімкнути плагін',
    confirmRollback: 'Відновити цю контрольну точку?',
    confirmRollbackAction: 'Відновити конфігурацію',
    uninstalledSuccess: 'Плагін видалено з поточного профілю. Будь ласка, перезапустіть DSH Desktop, щоб застосувати оновлену конфігурацію плагінів.',
    disabledSuccess: 'Плагін вимкнено, встановлені файли збережено. Після перезапуску DSH Desktop він не завантажуватиметься; з профілю нічого не видалено.',
    enabledSuccess: 'Плагін знову ввімкнено. Він завантажиться після перезапуску DSH Desktop.',
    profileSelectedSuccess: 'Встановлено як поточний профіль. Будь ласка, перезапустіть DSH Desktop для роботи з цим профілем.',
    actionFailed: 'Не вдалося виконати дію з відновлення. Перегляньте деталі помилки; для глибшого аналізу можна експортувати діагностичні дані.',
    rollbackFailedTitle: 'Не вдалося відновити контрольну точку',
    rollbackFailedMessage: 'Відновлення конфігурації не завершено. Перегляньте деталі помилки, перш ніж вирішити, чи повторювати спробу. Помічник відновлення залишатиметься відкритим.',
    uninstallFailedTitle: 'Не вдалося видалити плагін',
    uninstallFailedMessage: 'Не вдалося завершити видалення плагіна. Перегляньте деталі помилки та повторіть спробу. Помічник відновлення залишатиметься відкритим.',
    bundleSelectionFailedTitle: 'Не вдалося змінити стан плагіна',
    bundleSelectionFailedMessage: 'Список плагінів профілю не змінено. Перегляньте деталі помилки та повторіть спробу. Помічник відновлення залишатиметься відкритим.',
    operationStage: 'Етап операції',
    errorCode: 'Код помилки',
    technicalDetails: 'Технічні подробиці',
    close: 'Закрити',
  },
  ru: {
    title: 'Помощник восстановления DSH Desktop',
    fallbackBody: 'Не удалось прочитать данные восстановления. Пожалуйста, закройте и перезапустите DSH Desktop.',
    reason: 'Причина перехода в режим восстановления',
    requestedMode: 'Ручной вход в режим восстановления',
    requestedBody: 'Обычный запуск приостановлен; текущий профиль и плагины еще не загружались.',
    currentProfile: 'Текущий профиль',
    currentProfileDirectory: 'Каталог профиля',
    failureStage: 'Этап сбоя при запуске',
    runtimeFailureStage: 'Этап сбоя во время работы',
    quickRecovery: 'Быстрое восстановление',
    quickRecoveryBody: 'Выберите подходящий способ восстановления. Если причина неизвестна, попробуйте безопасный режим. Если есть предположения о сбое, можно настроить плагины, восстановить состояние из контрольной точки или сменить профиль.',
    pluginGuideBody: 'Проблема возникла после установки или обновления плагина? Проверьте плагины текущего профиля и удалите сторонние плагины, которые могут вызывать сбои.',
    rollbackGuideBody: 'Не удается запуститься после изменения конфигурации? Выберите контрольную точку до возникновения сбоя, чтобы просмотреть и восстановить прежнюю конфигурацию.',
    profileSwitchGuideBody: 'Нужно срочно продолжить работу? Переключитесь на другой профиль или создайте новый. Текущий профиль сохранится для последующего анализа.',
    dataGuideBody: 'Просмотрите или измените каталог данных DSH. Сброс к заводским настройкам удалит данные в текущем каталоге, поэтому сначала рекомендуется попробовать другие способы восстановления.',
    diagnosticsGuideBody: 'Просмотрите файлы конфигурации или экспортируйте диагностический пакет для устранения неполадок. Перед отправкой пакета проверьте его содержимое.',
    safeMode: 'Безопасный режим',
    safeModeBody: 'Запуск во временном окружении без загрузки исходных плагинов, настроек, сессий и истории рабочих областей. Исходные данные сохранятся; после выхода из безопасного режима следующий обычный запуск автоматически очистит временное окружение.',
    safeModeActiveBody: 'Сейчас активно временное окружение; исходный профиль и данные не загружены. Любые изменения конфигурации касаются только временного окружения; после перезапуска безопасный режим будет отключен.',
    safeModeUnavailable: 'На текущем этапе запуска невозможно создать окружение безопасного режима, но вы можете просмотреть диагностические данные.',
    enterSafeMode: 'Войти в безопасный режим',
    confirmSafeMode: 'Войти в безопасный режим?',
    confirmSafeModeMessage: 'Перезапустить во временном окружении?',
    confirmSafeModeBody: 'Приложение будет использовать отдельный временный каталог данных и не станет читать или изменять исходные профили и данные. После выхода из безопасного режима следующий обычный запуск автоматически очистит временное окружение.',
    confirmSafeModeAction: 'Перезапустить в безопасном режиме',
    safeModeNotificationTitle: 'Безопасный режим включен',
    safeModeNotificationBody: 'В настоящее время используется временное окружение без доступа к исходным данным DSH. При следующем обычном запуске доступ к исходным данным будет восстановлен, а временное окружение очищено.',
    checkpoints: 'Контрольные точки запуска',
    checkpointsUnavailable: 'В настоящее время не удалось загрузить контрольные точки запуска.',
    rollbackBody: 'Контрольные точки сохраняют конфигурацию успешных запусков. Выбор точки восстановит состояние текущего профиля, общий файл settings.yaml и патчи в каталоге данных DSH.',
    plugins: 'Управление плагинами',
    pluginsBody: 'Просмотр плагинов, установленных непосредственно в текущем профиле. Можно отключить плагин (оставить установленным без загрузки при запуске) или полностью удалить.',
    pluginsUnavailable: 'Информация о плагинах текущего профиля еще не получена. Перейдите в раздел «Диагностика», чтобы просмотреть конфигурацию или экспортировать диагностический пакет.',
    pluginsEmpty: 'В текущем профиле нет плагинов.',
    core: 'Встроенный компонент',
    profileDependency: 'Прямо установленный плагин',
    external: 'Нельзя удалить напрямую',
    disabled: 'Отключено',
    disable: 'Отключить',
    enable: 'Включить',
    disabledHint: 'Установлен, но не загружается при запуске',
    uninstall: 'Удалить',
    diagnostics: 'Диагностический пакет',
    savingDiagnostics: 'Сохранение локального диагностического пакета…',
    diagnosticsSaved: 'Диагностический пакет сохранен локально; он не будет отправлен автоматически.',
    diagnosticsFailed: 'Не удалось сохранить диагностический пакет. Попробуйте экспортировать снова.',
    saveDiagnostics: 'Экспортировать диагностические данные',
    showDiagnostics: 'Показать в папке',
    privacy: 'Диагностический пакет может содержать локальные пути, логи, системную информацию и фрагменты памяти при сбоях. Проверьте содержимое перед отправкой.',
    configurationFiles: 'Файлы конфигурации',
    configurationFilesBody: 'Просмотр или редактирование конфигурации текущего профиля и общих параметров в каталоге данных DSH. Изменения вступят в силу после перезапуска приложения.',
    openSettingsDocument: 'Открыть settings.yaml',
    openProfilePatch: 'Редактировать патч профиля',
    openProfileManifest: 'Редактировать манифест плагинов',
    openProfileDirectory: 'Открыть каталог профиля',
    profiles: 'Доступные профили',
    profilesBody: 'Переключитесь на другой профиль с поддержкой десктопа или создайте новый.',
    profilesUnavailable: 'Доступные профили еще не загружены; переключение пока невозможно.',
    profilesEmpty: 'Нет других профилей с поддержкой десктопа.',
    switchProfile: 'Переключить',
    addProfile: 'Создать профиль',
    resetAndDataManagement: 'Сброс и управление данными',
    dataManagement: 'Управление данными',
    dataManagementBody: 'Просмотр или изменение каталога данных DSH. Профили, плагины, настройки и сессии сохраняются в этом каталоге. Изменение каталога не удаляет данные из прежнего расположения.',
    currentDataDirectory: 'Текущий каталог данных',
    changeDataDirectory: 'Изменить каталог данных',
    restoreDefaultDataDirectory: 'Восстановить по умолчанию',
    dataDirectoryUnavailable: 'Текущий каталог данных не определен или приложение работает в безопасном режиме; изменение каталога сейчас недоступно.',
    dataDirectoryPath: 'Новый каталог данных',
    dataDirectoryPlaceholder: 'Введите полный путь',
    selectDataDirectory: 'Выбор каталога данных DSH',
    browse: 'Обзор…',
    applyDataDirectory: 'Изменить каталог и перезапустить',
    cancelDataDirectoryChange: 'Отменить изменения',
    factoryReset: 'Сбросить к заводским настройкам',
    factoryResetBody: 'Перемещает текущий каталог данных DSH в корзину, перезапускает приложение и создает новый профиль по умолчанию. Файлы проектов вне этого каталога будут сохранены.',
    factoryResetAction: 'Сбросить данные и перезапустить',
    confirmDataDirectoryChange: 'Изменить каталог данных?',
    confirmDataDirectoryChangeMessage: 'Выбрать новый каталог данных DSH?',
    confirmDataDirectoryChangeBody: 'Выберите пустую папку или существующий каталог данных DSH. Пустая папка будет использована для создания нового окружения; исходный каталог данных будет сохранен.',
    continueDataDirectoryChange: 'Выбрать каталог',
    confirmRestoreDefaultDirectory: 'Восстановить каталог данных по умолчанию?',
    confirmRestoreDefaultDirectoryMessage: 'Переключиться на каталог данных системы по умолчанию и перезапустить?',
    confirmRestoreDefaultDirectoryBody: 'DSH Desktop перейдет на использование системного каталога данных по умолчанию. Текущий каталог данных не будет удален.',
    confirmRestoreDefaultDirectoryAction: 'Восстановить по умолчанию и перезапустить',
    confirmCreateDefaultDirectory: 'Создать каталог данных по умолчанию?',
    confirmCreateDefaultDirectoryMessage: 'Каталог данных по умолчанию не существует. Создать его?',
    confirmCreateDefaultDirectoryBody: 'DSH Desktop создаст совершенно новое окружение по пути по умолчанию и перезапустится. Текущий каталог данных не будет удален.',
    confirmCreateDefaultDirectoryAction: 'Создать и перезапустить',
    confirmFactoryReset: 'Сбросить DSH Desktop к заводским настройкам?',
    confirmFactoryResetMessage: 'Удалить текущие данные DSH и повторно инициализировать приложение?',
    confirmFactoryResetAction: 'Сбросить данные и перезапустить',
    dataOperationFailedTitle: 'Ошибка операции с данными',
    dataOperationFailedMessage: 'Не удалось выполнить операцию с каталогом данных. Просмотрите сведения об ошибке, проверьте состояние текущего каталога и повторите попытку.',
    openTerminal: 'Открыть терминал DSH',
    emptySlot: 'Нет контрольных точек',
    availableSlot: 'Доступно для восстановления',
    noHealthyStartup: 'В этом слоте нет сохраненной конфигурации успешного запуска.',
    openCheckpoint: 'Просмотреть файлы',
    rollbackCheckpoint: 'Восстановить эту контрольную точку',
    desktopVersion: 'Версия DSH Desktop',
    pluginCount: 'Плагины',
    configurationFileCount: 'Файлы конфигурации',
    checkpointSize: 'Размер контрольной точки',
    unknown: 'Неизвестно',
    restart: 'Перезапустить DSH Desktop',
    quit: 'Выйти',
    working: 'Выполняется операция восстановления…',
    back: 'Назад',
    cancel: 'Отмена',
    confirmUninstall: 'Удалить этот плагин?',
    confirmUninstallBody: 'Плагин будет удален из текущего профиля, а зависимости плагинов будут обновлены.',
    confirmDisable: 'Отключить этот плагин?',
    confirmDisableBody: 'Ничего не будет удалено. Сам плагин, версии и конфигурация полностью сохранятся в текущем профиле, но больше не будут загружаться при запуске. Вы сможете включить его снова здесь в любой момент.',
    confirmDisableAction: 'Отключить плагин',
    confirmEnable: 'Включить этот плагин?',
    confirmEnableBody: 'Плагин будет снова загружен при следующем запуске. Если предыдущий сбой запуска был вызван именно им, помощник восстановления откроется снова, и вы сможете повторно отключить его.',
    confirmEnableAction: 'Включить плагин',
    confirmRollback: 'Восстановить эту контрольную точку?',
    confirmRollbackAction: 'Восстановить конфигурацию',
    uninstalledSuccess: 'Плагин удален из текущего профиля. Пожалуйста, перезапустите DSH Desktop, чтобы применить обновленную конфигурацию плагинов.',
    disabledSuccess: 'Плагин отключен, установленные файлы сохранены. После перезапуска DSH Desktop он не будет загружаться; из профиля ничего не удалено.',
    enabledSuccess: 'Плагин снова включен. Он загрузится после перезапуска DSH Desktop.',
    profileSelectedSuccess: 'Установлен как текущий профиль. Пожалуйста, перезапустите DSH Desktop для работы с этим профилем.',
    actionFailed: 'Не удалось выполнить действие по восстановлению. Просмотрите сведения об ошибке; для более глубокого анализа можно экспортировать диагностические данные.',
    rollbackFailedTitle: 'Не удалось восстановить контрольную точку',
    rollbackFailedMessage: 'Восстановление конфигурации не завершено. Просмотрите сведения об ошибке, прежде чем решить, повторять ли попытку. Помощник восстановления останется открытым.',
    uninstallFailedTitle: 'Не удалось удалить плагин',
    uninstallFailedMessage: 'Не удалось завершить удаление плагина. Просмотрите сведения об ошибке и повторите попытку. Помощник восстановления останется открытым.',
    bundleSelectionFailedTitle: 'Не удалось изменить состояние плагина',
    bundleSelectionFailedMessage: 'Список плагинов профиля не был изменен. Просмотрите сведения об ошибке и повторите попытку. Помощник восстановления останется открытым.',
    operationStage: 'Этап операции',
    errorCode: 'Код ошибки',
    technicalDetails: 'Технические подробности',
    close: 'Закрыть',
  },
}

export function desktopRecoveryCopy(locale: DesktopLocale): DesktopRecoveryCopy {
  return COPY[locale]
}
