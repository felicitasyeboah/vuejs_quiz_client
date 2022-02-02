import Vuex from 'vuex'
import {IMAGE_ROOT} from "@/assets/constants";
import jwt_decode from "jwt-decode";

// Create a new store instance. Gets token from sessionStorage, gets current username from sessionStorage.
export const store = new Vuex.Store({
        state: {
            token: sessionStorage.getItem('token'),
            user: sessionStorage.getItem('userName'),
            currentUsername: sessionStorage.getItem('userName'),
            tokenExpirationDate: sessionStorage.getItem('expirationDate'),
            isConnected: false,
            isAuthenticated: false,
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

        // mutations - to change states the store
        mutations: {

            initializeStore(state) {
                if (sessionStorage.getItem('token')) {
                    state.token = sessionStorage.getItem('token')
                    state.userName = sessionStorage.getItem('userName')
                } else {
                    state.userName = null
                    state.token = null
                    state.tokenValid = false
                    state.isAuthenticated = false
                }
            },

            setSocketIsConnected: (state, value) => {
                state.isConnected = value;
            },

            //mutations to store the values returned by the websocket globally
            setUserName: (state, value) => {
                state.currentUser = value;
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
            setNewHighscore: (state, bool) => {
                state.newHighscore = bool;
            },
            setResult: (state, value) => {
                state.result = value;
            },

            // ErrorHandling
            setError: (state, value) => {
                state.errorText = value;
            },
            setExistingRecords: (state, value) => {
                state.existingRecords = value;
            },
            setImportantError: (state, value) => {
                state.importantError = value;
            },
            setExistingHighscore: (state, value) => {
                state.existingHighscore = value;
            },

            //Decode the JWT-Token to get the expiration date (and maybe check if the token is well-formed - in the future?)
            decodeJWT() {
                this.decoded = jwt_decode(sessionStorage.getItem('token'));
                // Multiply to get value in milliseconds (and to match date.now) plus add a security-margin of 3 minutes (180000 milliseconds) and save
                // the value to sessionStorage
                this.expirationDate = ((this.decoded.exp * 1000) + 180000)
                sessionStorage.setItem('expirationDate', this.expirationDate)
                console.log("exp date from ls:" + sessionStorage.getItem('expirationDate'))
            },

// Checks if there are values saved in the sessionStorage
            tokenAndNameCheck() {
                if (sessionStorage.getItem('token') !== null && sessionStorage.getItem('userName') !== null) {
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
            // The current token in sessionStorage is deleted. Username in sessionStorage is deleted.
            logout() {
                sessionStorage.removeItem('expirationDate')
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userName');
                this.isLoggedIn = false;
                this.state.isAuthenticated = false;
                console.log("ausgeloggt")
            },
            // Checks the token expiration date
            checkTokenDate() {
                if (sessionStorage.getItem('expirationDate') < Date.now()) {
                    //
                    this.state.tokenValid = false;
                    this.state.errorText = "TOKEN EXPIRED";
                    alert("Token expired")
                    sessionStorage.removeItem('expirationDate')
                    this.state.isAuthenticated = false;
                } else {
                    console.log("token still valid")
                    this.state.tokenValid = true;
                }
            },
        },

        getters: {
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
            getWinner: state => {
                return String(state.winner)
            },
        }

    }
)
