export interface Message {
    type: "ERROR" | "SUCCESS" | "WARNING";
    text: string;
    timestamp: Date;
}