import type { ProjectConfigInterface } from '@etherealengine/projects/ProjectConfigInterface'

const config: ProjectConfigInterface = {
  onEvent: undefined,
  thumbnail: '/static/etherealengine.png',
  routes: {},
  services: undefined,
  databaseSeed: undefined,
  worldInjection: () => import('./src/worldInjection'),
}

export default config
