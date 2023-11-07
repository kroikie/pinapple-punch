import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter, setupFetcher } from './counter.js'
import { initializeApp } from 'firebase/app'
import { getRemoteConfig, connectRemoteConfigEmulator, getValue, fetchAndActivate } from 'firebase/remote-config'

const firebaseConfig = {
    apiKey: "AIzaSyDR6mzGXzYnfAegJzSFuIh56ptvMY2Ei-Y",
    authDomain: "rc-emulation.firebaseapp.com",
    projectId: "rc-emulation",
    storageBucket: "rc-emulation.appspot.com",
    messagingSenderId: "944657814603",
    appId: "1:944657814603:web:d335b0f35def52a9e729ce",
    measurementId: "G-PP11VDQ3DK"
}

const firebaseApp = initializeApp(firebaseConfig)

const remoteConfig = getRemoteConfig(firebaseApp)
connectRemoteConfigEmulator(remoteConfig, 'http://127.0.0.1:7399')
remoteConfig.settings.minimumFetchIntervalMillis = 0;
remoteConfig.defaultConfig = {
    "welcome_message": "sup!",
    "discount_percentage": 5,
    "border_color": "black-border",
    "price": 200
};
fetchAndActivate(remoteConfig).then(() => {
    console.log(getValue(remoteConfig, 'welcome_message'))
}).catch(err => {
    console.log(err)
})
const welcomeMessage = getValue(remoteConfig, 'welcome_message')
console.log(welcomeMessage)


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="welcome-element">i am working well</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card">
      <button id="fetcher" type="button">fetch welcome</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
setupFetcher(document.querySelector('#fetcher'), document.querySelector('#welcome-element'))
