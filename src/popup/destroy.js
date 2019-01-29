import { DESTROY, UNDESTROY } from '../constants'

const listenForClicks = () => {
  document.addEventListener("click", (e) => {

    const destroy = tabs => {
      browser.tabs.insertCSS({
        file: '/css/styles.css',
        cssOrigin: 'user',
      }).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: DESTROY,
        })
      })
    }

    const reset = tabs => {
      browser.tabs.removeCSS({
        file: '/css/styles.css',
        cssOrigin: 'user',
      }).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: UNDESTROY,
        })
      })
    }

    const reportError = error => {
      console.error(`Could not destroy: ${error}`)
    }

    if (e.target.id === DESTROY) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(destroy)
        .catch(reportError)
    }
    else if (e.target.classList.contains(UNDESTROY)) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError)
    }
  })
}

const reportExecuteScriptError = error => {
  document.querySelector("#popup-content").classList.add("hidden")
  document.querySelector("#error-content").classList.remove("hidden")
  console.error(`Failed to execute content script: ${error.message}`)
}

browser.tabs.executeScript({file: "/content_scripts/destroy.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError)
