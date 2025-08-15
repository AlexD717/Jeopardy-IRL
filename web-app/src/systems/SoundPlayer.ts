import correct from "../../assets/sounds/correct.mp3"
import incorrect from "../../assets/sounds/incorrect.mp3"

export class SoundPlayer {
  constructor() {}

  public static async play(filePath: string): Promise<void> {
    const audio = new Audio(filePath)

    return audio.play().catch((error) => {
      console.error("Error playing the audio file:", error)
    })
  }

  public static async playCorrectSound(): Promise<void> {
    await this.play(correct)
  }

  public static async playIncorrectSound(): Promise<void> {
    await this.play(incorrect)
  }
}
