export default interface TodoInterface {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    rate?:number|null
}