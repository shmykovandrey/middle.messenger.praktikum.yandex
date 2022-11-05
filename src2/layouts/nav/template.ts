const tmp = `
main
    h1 Ссылки на все страницы.
    nav 
    ul 
        li
        a(href='./pages/login/login.html').link Страница Login
        li
        a(href='./pages/registration/registration.html').link Страница Регистрации
        li
        a(href='./pages/main/main.html').link Страница чата.
        li
        a(href='./pages/profile/profile.html').link Страница профиля
        li
        a(href='./pages/page404/page404.html').link Страница ошибки 404
        li
        a(href='./pages/page500/page500.html').link Страница 500`;

export default tmp;
