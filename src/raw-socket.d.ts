declare module 'raw-socket' {
    export enum Protocol {
        ICMP = 1,
        TCP = 6,
        UDP = 17
    }

    export interface Options {
        addressFamily?: number;
        protocol?: number;
        bufferSize?: number;
    }

    export interface Socket {
        send(buffer: Buffer, offset: number, length: number, address: string, callback: (error: Error | null, bytes: number) => void): void;
        on(event: string, listener: (msg: Buffer, rinfo: { address: string; family: string; port: number }) => void): this;
    }

    export function createSocket(options: Options): Socket;
}
