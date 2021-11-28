export interface Login {
    id:any,
    email:any,
    last_login:any,
    name:any,
    password:any,
    phone:any;
    role:Role,
    user_type:any;
    role_id:any;
    user_bus_operator:user_bus_operator;
}
export interface Role{
    id:any,
    name:any
}
export interface user_bus_operator{
    bus_operator:bus_operator;
}
export interface bus_operator
{
    id:any;
}
