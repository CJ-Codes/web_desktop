// create ident string
export function createID() {
  return (+(Math.random().toString().substring(12)) * Date.now()).toString(36)
}
