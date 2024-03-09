class ChallengesApiClient {

    static SERVER_URL = 'http://localhost:8080';
    static GET_RANDOM_CHALLENGE = '/challenges/random'
    static POST_ATTEMPT = '/attempts';

    static randomChallenge() {
        return fetch(this.SERVER_URL + this.GET_RANDOM_CHALLENGE);
    }

    static sendAttempt(user: string,
                       a: number,
                       b: number,
                       answer: number) {
        return fetch(this.SERVER_URL + this.POST_ATTEMPT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userAlias: user,
                factorA: a,
                factorB: b,
                resultAttempt: answer,
            })
        });
    }
}

export default ChallengesApiClient;