export class User {
    constructor(
        public username: string,
        public name: string,
        public lastName: string,
        public email: string,
        public roles: string,
        public password?: string,
        public image?: string) { }
}