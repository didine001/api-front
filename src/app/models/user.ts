export class User
{
  id: number;
  username : string ;
  email: string;
  adress: string;
  name: string;
  roleId?: number;

  constructor(id: number, username : string, email: string, adress: string, name: string, roleId:number)
  {
    this.id = id;
    this.username = username;
    this.email= email;
    this.adress = adress;
    this.name = name;
    this.roleId = roleId;
  }
}

  export class UpdateUserDto{
    roleid : number;
    username : string;
    email : string;

  constructor(id:number,username:string,email:string)
  {
    this.roleid = id;
    this.username = username;
    this.email = email;
  }
}

