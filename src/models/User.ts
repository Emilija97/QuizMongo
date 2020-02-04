export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  score?: number;
}

//   export class User implements IUser {
//     public id: number;
//     public username: string;
//     public password: string;
//     public name: string;
//     public surname: string;
//     public score: number;
//     constructor() {
//       this.id = -1;
//       this.username = "";
//       this.password = "";
//       this.name = "";
//       this.surname = "";
//       this.score = -1;
//     }
//   }
