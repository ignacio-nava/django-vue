// Ref: https://docs.djangoproject.com/en/5.1/howto/csrf/#using-csrf-protection-with-ajax
export const getCookie = (name: string): string | undefined => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            const cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            return cookieValue;
        };
    };
}