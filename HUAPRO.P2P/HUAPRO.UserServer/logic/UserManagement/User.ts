class User {
    private id: Number;
    private username: string;
    private eMail: string;      
    private password: string; //later... has to be hashed

    constructor(Username: string, EMail: string, Password: string) {
        this.eMail = EMail;
        this.username = Username;
        this.password = Password;
    }
}