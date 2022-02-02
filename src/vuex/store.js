import Vuex from 'vuex'
import {IMAGE_ROOT} from "@/assets/constants";
import jwt_decode from "jwt-decode";

// Create a new store instance. Gets token from localstorage, gets current username from localstorage.
export const store = new Vuex.Store({
        state: {
            token: localStorage.getItem('token'),
            user: localStorage.getItem('userName'),
            currentUsername: localStorage.getItem('userName'),
            tokenExpirationDate: localStorage.getItem('expirationDate'),
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

            date: Date.now(),
            decoded: null,
            expirationDate: null,
            tokenValid: true,
            registrationError: false,
            navBarErrorText: '',
            errorText: '',
            importantError: false,
            existingRecords: true,
            existingHighscore: true,
        },
        mutations: {
            initializeStore(state) {
                if (localStorage.getItem('token')) {
                    state.token = localStorage.getItem('token')
                    state.userName = localStorage.getItem('userName')
                } else {
                    state.userName = null
                    state.token = null
                    state.tokenValid = false
                    state.isAuthenticated = false
                }
            },

            setToken(state, token) {
                state.token = token
                state.isAuthenticated = true
            },

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
            setError: (state, value) => {
                state.errorText = value;
            },
            setRecords: (state) => {
                state.existingRecords = false;
            },
            setRecordsTrue: (state) => {
                state.existingRecords = true;
            },
            setImportantErrorTrue: (state) => {
                state.importantError = true;
            },
            setImportantErrorFalse: (state) => {
                state.importantError = false;
            },

            checkHighscoreRecords: (state) => {
                state.existingHighscore = !state.existingHighscore;
            },

            decodeJWT() {
                //Decode the JWT-Token to get the expiration date
                this.decoded = jwt_decode(localStorage.getItem('token'));
                // Multiply to get value in milliseconds (and to match date.now) plus add a security-margin of 3 minutes (180000 milliseconds) and save
                // the value to localstorage
                this.expirationDate = ((this.decoded.exp * 1000) + 180000)
                console.log(this.date)
                console.log("berechn datum:" + this.expirationDate)
                localStorage.setItem('expirationDate', this.expirationDate)
                console.log("exp date from ls:" + localStorage.getItem('expirationDate'))
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
                localStorage.removeItem('expirationDate')
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                this.isLoggedIn = false;
                this.state.isAuthenticated = false;
                console.log("ausgeloggt")
            },

            checkTokenDate() {
                if (localStorage.getItem('expirationDate') < Date.now()) {
                    //
                    this.state.tokenValid = false;
                    this.state.errorText = "TOKEN EXPIRED";
                    alert("Token expired")
                    localStorage.removeItem('expirationDate')
                    this.state.isAuthenticated = false;
                } else {
                    console.log("token still valid")
                    this.state.tokenValid = true;
                }
            },
        },

//     printToken() {
//     console.log(localStorage.getItem('token'))
// },
        getters: {
            getStatus: state => {
                return Boolean(state.isAuthenticated);
            },
            getName: state => {
                return String(state.currentUsername);
            },
            getUserImage: state => {
                return IMAGE_ROOT + state.currentUsername;
            },
            getIsConnected: state => {
                return Boolean(state.isConnected);
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
