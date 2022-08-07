export enum PATH {
    HOME = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PACKS = '/packs',
    CARDS = 'cards',
    LEARN_PACK = 'learn-pack/:id',
    PACKS_LIST = 'packs-list',
    PROFILE = '/profile/:id',
    USERS = '/users',
    SET_PASS = '/set-new-password/:token',
    RECOVERY_PASS = '/recovery-password',
    PAGE_NOT_FOUND = '/*',
}