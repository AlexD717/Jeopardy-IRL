import { PageCommunicator } from "./PageCommunicator"

export class ButtonPress {
  private static instance: ButtonPress | null = null
  public firstButtonPressed: string | null = null
  private eventTarget: EventTarget

  private constructor() {
    this.eventTarget = new EventTarget()
  }

  public static getInstance(): ButtonPress {
    if (!ButtonPress.instance) {
      ButtonPress.instance = new ButtonPress()
    }
    return ButtonPress.instance
  }

  public buttonPressed(buttonId: string): void {
    if (this.firstButtonPressed) {
      console.log("Button already pressed:", this.firstButtonPressed)
      return
    }

    this.firstButtonPressed = buttonId
    console.log("First button pressed:", buttonId)

    this.eventTarget.dispatchEvent(new Event("buttonPressedUpdated"))
    PageCommunicator.gamePage?.postMessage({ type: "buttonPressed", data: buttonId }, window.location.origin)
  }

  public reset(): void {
    this.firstButtonPressed = null
    console.log("Button press reset")
    this.eventTarget.dispatchEvent(new Event("buttonPressedUpdated"))
    PageCommunicator.gamePage?.postMessage({ type: "resetButtonPress", data: null }, window.location.origin)
  }

  public onButtonPressed(callback: () => void): void {
    this.eventTarget.addEventListener("buttonPressedUpdated", callback)
  }

  public offButtonPressed(callback: () => void): void {
    this.eventTarget.removeEventListener("buttonPressedUpdated", callback)
  }
}
