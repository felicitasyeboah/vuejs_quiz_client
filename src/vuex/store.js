import Vuex from 'vuex'

// Create a new store instance. Gets token from localstorage, gets current username from localstorage.
export default new Vuex.Store({
        state: {
            token: localStorage.getItem('token'),
            user: localStorage.getItem('userName'),
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
        },
        mutations: {
            initializeStore(state) {
                if (localStorage.getItem('token')) {
                    state.token = localStorage.getItem('token')
                    state.isAuthenticated = true
                    state.userName = localStorage.getItem('userName')
                } else {
                    state.userName = ''
                    state.token = ''
                    state.isAuthenticated = false
                }
            },
            changeStatus(state, isLoggedIn) {
                state.isAuthenticated = isLoggedIn
            },
            setToken(state, token) {
                state.token = token
                state.isAuthenticated = true
            },

            setSocketIsConnected: (state, value) => {
                state.isConnected = value;

            },
            setTimer: (state, integer) => {
                state.timeLeft = integer;

            },
            setStartTimer: (state, integer) => {
                state.StartTimeLeft = integer;
            },
            setQuestionText: (state, value) => {
                state.question.text = value;
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
                state.oppImage = value;
            },
            setWinner: (state, value) => {
                state.winner = value;
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


            tokenAndNameCheck() {
                if (localStorage.getItem('token') !== null && localStorage.getItem('userName') !== null) {
                    console.log("richtig eingeloggt")
                    this.state.isAuthenticated = true;
                    return true;
                } else {
                    this.state.isAuthenticated = false;
                    return false;
                }
            }
        },
        actions: {
            // The current token in localstorage is deleted. Username in localstorage is deleted.
            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('userName')
                this.isLoggedIn = false;
                this.state.isAuthenticated = false;
                console.log("ausgeloggt")

            },

        },

//     printToken() {
//     console.log(localStorage.getItem('token'))
// },
        getters: {
            getStatus: state => {
                return state.isAuthenticated
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
