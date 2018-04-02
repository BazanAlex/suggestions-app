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

    static submitSuggestion({articleUrl,
            originalText,
            usersText}) {

        const body = JSON.stringify({
            articleUrl,
            originalText,
            usersText
        });

        return fetch(`${apiUrl}/suggestion`, {
            method: 'POST',
            body,
            headers: this.defaultHeaders
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(res.statusText);
        }).catch(this.handleError);
    }

    static approveSuggestion(id) {
        const body = { isApproved: true };

        return fetch(`${apiUrl}/suggestion/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: this.defaultHeaders
        }).then(res => {
            if (res.ok) {
                return Promise.resolve();
            }

            throw new Error(res.statusText);
        }).catch(this.handleError);
    }

    static getGroupedSuggestions(showApproved = false) {
        return fetch(`${apiUrl}/paragraph?showApproved=${showApproved}`, {
            method: 'GET'
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(res.statusText);
        }).catch(this.handleError);
    }

    static deleteParagraph(id) {
        return fetch(`${apiUrl}/paragraph/${id}`, {
            method: 'DELETE',
            headers: this.defaultHeaders
        }).then(res => {
            if (res.ok) {
                return Promise.resolve();
            }

            throw new Error(res.statusText);
        }).catch(this.handleError);
    }

    static handleError(err) {
        console.error(err);
    }

    static get defaultHeaders() {
        return {
            'Content-Type': 'application/json'
        };
    }
}