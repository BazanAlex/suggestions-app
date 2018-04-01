export class ApiStub {
    static getArticle() {
        return {
            title: 'Article title',
            paragraphs: [
                'first paragraph content',
                'second paragraph content',
                'etc paragraph content'
            ]
        };
    }

    static suggestionsGrpByParagraphs() {
        return [{
            articleUrl: 'http://google.com',
            originalText: 'test 1',
            suggestions: [
                {id: 2, usersText: 'test 2', isApproved: false},
                {id: 3, usersText: 'test 2', isApproved: false},
                {id: 4, usersText: 'test 2', isApproved: false}
            ]
        }, {
            articleUrl: 'http://test2.com',
            originalText: 'Today is 1st of April',
            suggestions: [
                {id: 2, usersText: 'Today is 2nd of April', isApproved: false},
                {id: 3, usersText: 'Today is 3rd of April', isApproved: false},
                {id: 4, usersText: 'Today is today', isApproved: false}
            ]
        }];
    }
}