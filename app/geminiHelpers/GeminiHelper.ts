import { type ChatModel, MessageType } from './../Models/ChatsModel'
import {
    type GenerativeModel,
    GoogleGenerativeAI,
    type InlineDataPart
} from '@google/generative-ai'

class GeminiHelper {
    private static readonly instance: GeminiHelper
    private static readonly ApiKey = 'AIzaSyAnPQXs9UhnpCvLY64Ijpw-noK9oHupKdQ'
    private readonly genAI = new GoogleGenerativeAI(GeminiHelper.ApiKey)

    private constructor() {}

    public static getInstance(): GeminiHelper {
        let instance = GeminiHelper.instance as GeminiHelper | undefined
        instance = instance ?? new GeminiHelper() // If instance is null or undefined, create a new instance
        return instance
    }

    async getBotText(prompt: string): Promise<ChatModel> {
        const model: GenerativeModel = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
        const result = await model.generateContent(prompt)
        const response = result.response
        const text: string = response.text()
        return {
            isUser: false,
            text,
            image: '',
            type: MessageType.text
        }
    }

    async getBotTextFromImage(
        base64String: string,
        mimeType: string,
        prompt: string
    ): Promise<ChatModel> {
        // For text-and-images inputs (multimodal), use the gemini-pro-vision model
        const model: GenerativeModel = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

        const finalPrompt: string = prompt === '' ? 'What do you see?' : prompt

        const imagePart: InlineDataPart[] = [this.fileToGenerativePart(base64String, mimeType)]

        const result = await model.generateContent([finalPrompt, ...imagePart])
        const response = result.response
        const text: string = response.text()
        return {
            isUser: false,
            text,
            image: '',
            type: MessageType.text
        }
    }

    private fileToGenerativePart(base64String: string, mimeType: string): InlineDataPart {
        return {
            inlineData: {
                data: base64String,
                mimeType
            }
        }
    }
}

export const geminiHelper = GeminiHelper.getInstance()
