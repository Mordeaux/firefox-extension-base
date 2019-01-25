import { DESTROY, UNDESTROY } from '../constants'

const destroy = () => {
  console.log('what!!!')
}

const undestroy = () => {
  console.log('nooooooo!!!')
}


const attachListeners = () => {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return
  }
  window.hasRun = true

  browser.runtime.onMessage.addListener(({ command }) => {
    switch (command) {
      case DESTROY:
        destroy()
        break
      case UNDESTROY:
        undestroy()
        break
  }})
}

attachListeners()
