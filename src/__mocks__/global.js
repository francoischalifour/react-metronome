global.URL = {
  createObjectURL: () => {},
}

global.Worker = class Worker {
  constructor(url) {
    this.url = url
    this.onmessage = () => {}
  }

  postMessage(msg) {
    this.onmessage(msg)
  }
}

global.AudioContext = class AudioContext {
  constructor() {
    this.currentTime = null
    this.destination = null
    this.createOscillator = () => {}
    this.createGain = () => {}
  }
}

module.exports = global
