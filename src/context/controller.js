export function createContextController(initial = {}) {
  const state = {
    data: initial.data || {},
    values: {}
  }

  const getValue = (k) => state.values[k]
  const setValue = (k, v) => { state.values[k] = v }

  const resolve = (expr) => {
    if (!expr) return undefined
    if (typeof expr !== 'string') return expr
    if (expr.startsWith('$data.')) {
      const key = expr.replace('$data.', '')
      return state.data[key]
    }
    if (expr === '$data') return state.data
    return undefined
  }

  const setData = (key, value) => { state.data[key] = value }

  return {
    getValue, setValue, resolve, setData, state
  }
}
