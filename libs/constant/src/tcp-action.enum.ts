enum USER {
    CREATE = 'user.create',
    LOGIN = 'user.login',
    GET_ALL = 'user.get_all',
    GET_BY_EMAIL = 'user.get_by_email',
}
enum POST {
    CREATE = 'post.create',
    GET_ALL = 'post.get_all',
}
enum MAIL {
    SEND = 'mail.send',
}
export const TCP_REQUEST_MESSAGE = {

    USER,
    POST,
    MAIL,

};