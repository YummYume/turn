import { motionSafe } from './helpers.js'
import Controller from './controller.js'

const Turn = {
  start () {
    if (!this.started && motionSafe()) {
      for (const event in eventListeners) {
        window.addEventListener(event, eventListeners[event])
      }
      this.controller = new Controller(Turn.config)
      this.controller.start()
      this.started = true
    }
  },

  stop () {
    if (this.started) {
      for (const event in eventListeners) {
        window.removeEventListener(event, eventListeners[event])
      }
      this.controller.stop()
      this.started = false
    }
  },

  config: {
    experimental: {
      viewTransitions: false
    }
  }
}

const eventListeners = {
  'turbo:visit': function (event) {
    this.controller.visit(event)
  }.bind(Turn),
  'turbo:before-render': async function (event) {
    this.controller.beforeRender(event)
  }.bind(Turn),
  'turbo:render': async function () {
    this.controller.render()
  }.bind(Turn),
  'turbo:load': async function () {
    this.controller.load()
  }.bind(Turn),
  popstate: function () {
    this.controller.popstate()
  }.bind(Turn)
}

export default Turn
