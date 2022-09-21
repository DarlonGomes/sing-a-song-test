export {};

declare global{
    namespace NodeJS {
        interface ProcessEnv{
            PORT: number;
            DATABASE_URL: string;
            SHADOW_DATABASE_URL: string;
        }
    }
}