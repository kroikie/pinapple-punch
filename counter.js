import {fetchAndActivate, getValue, getRemoteConfig} from 'firebase/remote-config';
import { initializeApp } from 'firebase/app'

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
export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

export function setupFetcher(buttonElement, textElement) {

  const fetchWelcome = async () => {
    await fetchAndActivate(remoteConfig);
    const remoteConfigValue = getValue(remoteConfig, 'welcome_message');
    textElement.innerHTML = remoteConfigValue.asString();
  }

  buttonElement.addEventListener('click', async () => await fetchWelcome())
}
