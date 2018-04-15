import { User } from "./User";

export class UserManager{
    //later... extend with mongoDB
    private allUser: Array<User>;

    public Create(User) {
        return new User(User);
    }
    public Delete() {
        throw new Error("Method not implemented.");
    }
    public Update() {
        throw new Error("Method not implemented.");
    }
    public Get() {
        throw new Error("Method not implemented.");
    }
}
