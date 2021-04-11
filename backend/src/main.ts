import gateway from './gateway'
import auth from './auth'
;(async () => {
  const apps = process.env.APPS?.split(` `).filter(v => !!v)

  if (apps.includes(`gateway`)) gateway()
  if (apps.includes(`auth`)) auth()
})()
