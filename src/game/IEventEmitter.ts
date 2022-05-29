export type EventMap = Record<string, any>;

export interface IEventEmitter<EventMap> {

    on<K extends keyof EventMap>(event: K, fn: EventMap[K]): void;

    off<K extends keyof EventMap>(event: K, fn: EventMap[K]): void;

}