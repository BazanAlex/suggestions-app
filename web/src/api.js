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
        }).catch(this.handleError);
    }

    static sugmitSuggestion({articleUrl,
            originalText,
            usersText}) {

        const body = JSON.stringify({
            articleUrl,
            originalText,
            usersText
        });

        return fetch(`${apiUrl}/suggestion`, {
            method: 'POST',
            body
        }).then((res) => {
            if (res.ok) {
                return Promise.resolve();
            }

            throw new Error(res.statusText);
        }).catch(this.handleError);
    }

    static handleError(err) {
        console.error(err);
    }
}