export default interface TodoInterface {
    _id: number;
    userId: number;
    title: string;
    completed: boolean;
    rate?:number|null
}