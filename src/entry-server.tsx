import { renderToString } from 'react-dom/server'
import App from './App'
export { CONTACT, getWhatsAppUrl } from './config/contact'

export const render = (pathname: string) => renderToString(<App pathname={pathname} />)
