export const staticHost = "";
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const domains = {
  dev: `${staticHost}/api/`,
  prod: `${staticHost}/api/`
}
export const host = domains[env]
