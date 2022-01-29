import Vuex from 'vuex'


// Create a new store instance. Gets token from localstorage, gets current username from localstorage.
export default new Vuex.Store({
        state: {
            token: localStorage.getItem('token'),
            user: localStorage.getItem('userName'),
            JWTExpirationDate: localStorage.getItem('expirationDate'),
            currentTime: Date.now(),
            currentUsername: localStorage.getItem('userName'),
            isConnected: false,
            isAuthenticated: false,
            currentUserImage: '',
            currentUser: '',
            userScore: 0,
            opponentName: "Player2",
            opponentScore: 0,
            opponentImage: '',
            newHighscore: false,
            result: 0,
            tokenExpired: false,
        },
        mutations: {
            setSocketIsConnected: (state, value) => {
                state.isConnected = value;
            },
            setUserImage: (state, value) => {
                state.currentUserImage = value;
            },
            setUserScore: (state, value) => {
                state.userScore = value;
            },
            setOpponentScore: (state, value) => {
                state.opponentScore = value;
            },
            setOpponentName: (state, value) => {
                state.opponentName = value;
            },
            setOpponentImage: (state, value) => {
                state.opponentImage = value;
            },

            setHighscore: (state, bool) => {
                state.newHighscore = bool;
            },
            setUserName: (state, value) => {
                state.currentUser = value;
            },
            setResult: (state, value) => {
                state.result = value;
            },
            setExpirationDate: (state, value) => {
                state.JWTExpirationDate = value;
            },


        },
        actions: {
            // The current token in localstorage is deleted. Username in localstorage is deleted.
            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('userName')
                localStorage.removeItem('expirationDate')

                this.state.isAuthenticated = false;
                console.log("ausgeloggt")

            },
            tokenAndNameCheck() {
                if (localStorage.getItem('token') !== null && localStorage.getItem('userName') !== null) {
                    this.state.isAuthenticated = true;
                    return true;
                } else {
                    this.state.isAuthenticated = false;
                    console.log("authe" + this.state.isAuthenticated)
                    return false;

                }
            },
            tokenExpirationCheck() {
                if (Date.now() < localStorage.getItem('expirationDate')) {
                    this.state.tokenExpired = false;
                    console.log("richtig")
                } else {
                    this.state.tokenExpired = true;
                    this.state.isAuthenticated = false;
                    console.log("token expired")
                    console.log("authe" + this.state.isAuthenticated)
                    return false;
                }
            }

        },

        getters: {
            getStatus: state => {
                return state.isAuthenticated
            },
            getExpirationDate: state => {
                return state.JWTExpirationDate
            },
            getName: state => {
                return String(state.currentUsername);
            },
            getUserImage: state => {
                return state.currentUserImage;
            },
            getIsConnected: state => {
                return Boolean(state.isConnected);
            },
            getTimer: state => {
                return Number(state.timeLeft);
            },
            getUserScore: state => {
                return Number(state.userScore)
            },
            getOpponentScore: state => {
                return Number(state.opponentScore)
            },
            getOpponentName: state => {
                return String(state.opponentName)
            },
            getCurrentUser: state => {
                return String(state.currentUser)
            },
            getWinner: state => {
                return String(state.winner)
            },
            getResult: state => {
                return Number(state.result)
            },
            getToken: state => {
                return String(state.token)
            },
        }

    }
)
