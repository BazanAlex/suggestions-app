const apiUrl = 'http://localhost:8585/api';

export class Api {
    static getArticle(articleUrl) {
        return fetch(`${apiUrl}/article?articleUrl=${articleUrl}`, {
            method: 'GET'
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }

            throw new Error(res.statusText);
        })
        .catch((err) => console.error(err));
    }
}