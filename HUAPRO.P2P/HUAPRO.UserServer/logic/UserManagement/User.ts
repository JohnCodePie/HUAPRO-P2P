export class User {
    private id: Number;
    private username: string;
    private eMail: string;      
    private password: string; //later... has to be hashed

    constructor(obj: User);
    constructor(obj?: any) {
        this.eMail = obj && obj.eMail;
        this.username = obj && obj.username;
        this.password = obj && obj.password;
    }
    
}
