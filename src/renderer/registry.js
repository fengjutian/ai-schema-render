const registry = new Map()

export function register(type, component) {
  registry.set(type, component)
}

export function getComponent(type) {
  return registry.get(type)
}

export function listRegistered() {
  return Array.from(registry.keys())
}
