import { SmartProjectName } from '@/store/smartProjects'

export interface VisibleOption {
  label: '显示'
  value: SmartProjectOptionValue
}

interface HiddenOption {
  label: '隐藏'
  value: SmartProjectOptionValue
}

type Options = Array<VisibleOption | HiddenOption>

export enum SmartProjectOptionValue {
  Visible = 'visible',
  Hidden = 'hidden',
}

interface SettingsSmartProject {
  title: SmartProjectName
  options: Options
  option: SmartProjectOptionValue
  icon: string
}

function createOptions() {
  const visibleOption: VisibleOption = {
    label: '显示',
    value: SmartProjectOptionValue.Visible,
  }

  const hiddenOption: HiddenOption = {
    label: '隐藏',
    value: SmartProjectOptionValue.Hidden,
  }
  return [visibleOption, hiddenOption]
}

const completedSmartProject: SettingsSmartProject = {
  title: SmartProjectName.Complete,
  options: createOptions(),
  option: SmartProjectOptionValue.Visible,
  icon: 'material-symbols:check-box',
}

const trashSmartProject: SettingsSmartProject = {
  title: SmartProjectName.Trash,
  options: createOptions(),
  option: SmartProjectOptionValue.Visible,
  icon: 'mdi:close-box',
}

export function setHideSmartProject(project: SettingsSmartProject) {
  project.option = SmartProjectOptionValue.Hidden
}

export const smartProjects = [completedSmartProject, trashSmartProject]
