import { writable, derived, Writable } from "svelte/store";

const TIMEOUT = 3000;

interface Notification {
    id: string;
    type: string;
    message: string;
    timeout: number;
}

interface NotificationStore extends Writable<Notification[]> {
    send: (message: string, type?: string, timeout?: number) => void;
    default: (msg: string, timeout?: number) => void;
    danger: (msg: string, timeout?: number) => void;
    warning: (msg: string, timeout?: number) => void;
    info: (msg: string, timeout?: number) => void;
    success: (msg: string, timeout?: number) => void;
}

function createNotificationStore(timeout: number): NotificationStore {
    const _notifications = writable<Notification[]>([]);

    function send(message: string, type = "default", timeout: number = TIMEOUT): void {
        _notifications.update(state => {
            return [...state, { id: id(), type, message, timeout }];
        });
    }

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications);
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift();
                    return state;
                });
            }, $_notifications[0].timeout);
            return (): void => {
                clearTimeout(timer);
            };
        }
    });

    const { subscribe } = notifications;

    return {
        subscribe,
        send,
        default: (msg: string, timeout?: number) => send(msg, "default", timeout),
        danger: (msg: string, timeout?: number) => send(msg, "danger", timeout),
        warning: (msg: string, timeout?: number) => send(msg, "warning", timeout),
        info: (msg: string, timeout?: number) => send(msg, "info", timeout),
        success: (msg: string, timeout?: number) => send(msg, "success", timeout),
    };
}

function id(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const notifications: NotificationStore = createNotificationStore(TIMEOUT);
