export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    USER_PAGE: '/user/',
    LOGIN: '/login',
    RESGISTER: '/register',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    TEACHER: '/teacher',
    ACCOUNT: '/account/profile',
    CHANGE_PASSWORD: '/account/change-password',
    FORGOT_PASSWORD: '/account/forgot-password',
    CONFIRM_PASSWORD: '/reset-password/:token/:id/:newPass',
    CONFIRM_BOOKING: '/verify-booking/:token/:id',
    PAGE_NOT_FOUND: '/*'
};

export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
};

export const USER_ROLE = {
    ADMIN: 'R1',
    TERACHER: 'R2',
    STUDENT: 'R3'
}