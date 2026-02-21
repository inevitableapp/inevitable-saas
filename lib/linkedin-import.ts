import prisma from "@/lib/prisma";

export class LinkedInImportService {
    static async startSession(userId: string) {
        // Implement start session
    }

    static async parseData(sessionId: string, rawData: any) {
        // Implement parsing logic
    }

    static async confirmData(sessionId: string, normalizedData: any) {
        // Implement confirmation and profile update
    }
}
