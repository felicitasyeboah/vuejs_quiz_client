<template>
  <div class="w-full body-bg2 min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6">
    <div class=" p-5 ">

      <!--        PlayButton-->
      <div v-if="!$store.getters.getIsConnected">
        <h2 class="mb-6 text-white text-center text-7xl font-extrabold pt-10 lg:mb-20 md:text-xl sm:text-xl mb-10 md:mt-0.5"
            id="welcome">Welcome.</h2>

        <div id="wrap" @click="connectToWebsocket">
          <a class="cta" href="#">
            <span>PLAY</span><span>
      <svg width="66px" height="43px" viewBox="0 0 66 43" xmlns="http://www.w3.org/2000/svg">
        <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path class="one"
                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                fill="#FFFFFF"></path>
          <path class="two"
                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                fill="#FFFFFF"></path>
          <path class="three"
                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                fill="#FFFFFF"></path>
        </g></svg></span>
          </a>
        </div>
      </div>

      <!--      Looking for other players-->

      <div v-if="$store.getters.getIsConnected&&!this.readyToPlay" class="container max-w-5xl flex-auto">
        <h2 class="mb-6 text-center text-5xl font-extrabold pt-10 text-white">Ready to look for another player?</h2>
        <div class="between">
          <button
              class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              @click="sendToken">Yes, please
          </button>

          <button
              class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              @click="disconnectFromSocket"> No way
          </button>
          <div v-show="loading"
               class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <div v-show="!opponentFound">
              <h2 class="text-center text-white text-3xl font-semibold">Looking for another player..</h2>
              <p class=" text-center text-white">Please wait</p>
              <p class=" text-center text-white font-bold text-xl bg-red-400" @click="disconnectFromSocket">ABORT</p>
              <!--              <button-->
              <!--                  class="opacity-1 bg-red-600 hover:bg-red-800 text-white text-center font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 mx-auto"-->
              <!--                  @click="disconnectFromSocket">Abort-->
              <!--              </button>-->
            </div>
            <div v-show="opponentFound">
              <h2 class="text-center text-white text-3xl font-semibold">Match found! Get ready!</h2>
              <p class=" text-center text-white center text-3xl">{{ this.startTimer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--      Main game-->
    <div v-if="$store.getters.getIsConnected && this.readyToPlay">

      <div class="score text-xl  flex pb-5 justify-end items-end">
        <div class="text-gray-700">Your score: {{
            this.$store.getters.getUserScore
                                   }}
          <img v-bind:src="this.$store.getters.getUserImage" alt="userimage" class="mx-auto w-32 h-32 rounded-full">

        </div>
        <div class="font-sans text-3xl p-3 m-5">vs.</div>
        <div class="text-gray-700"> {{ this.$store.getters.getOpponentName }}:
                                    {{ this.$store.getters.getOpponentScore }}
          <img v-bind:src="imageRoot+this.$store.getters.getOpponentName" alt="opponentimage"
               class=" mx-auto w-32 h-32 rounded-full">
        </div>
      </div>


      <div class="flex items-center justify-center">
        <div class="bg-slate-800 flex flex-col items-center pb-3.5 m-2">
          <!--          The category of the displayed question-->
          <div class="italic font-bold">
            {{ this.category }}
          </div>
        </div>
      </div>

      <!--The active question-->
      <div id="question" class="mb-12 text-left text-5xl pl-1.5">
        {{ this.questionText }}
      </div>
      <div id="questionsandanswers">
        <!--        The main and the between-questions-timer-->
        <div class="time pb-3.5 center border-0" id="clock">{{ timer }}</div>
        <div class="scoretimer mx-auto border-0 text-5xl pb-1 center" v-show="showScoretimer">{{ scoreTimer }}</div>
        <!--The answers-->
        <div id="answer1"
             :class="{ activ : activeElement === 1}, {correct: this.readyToCheck &&  correctAnswer===1}, {wrong: readyToCheck && (activeElement ===1 && correctAnswer!==1)}"
             class="answer mb-6 p-3 mr-3 ml-3 text-center font-thin text-4xl  h-2/3 text-gray-700 hover:bg-gray-300 shadow-xl bg-gray-100 hover:text-gray-500 cursor-pointer"
             @click="activateResponse(1); sendAnswerText(this.answer1)"> A. {{
            this.answer1
                                                                         }}
        </div>
        <div id="answer2"
             :class="{ activ : activeElement === 2}, {correct: readyToCheck &&  correctAnswer===2}, {wrong: readyToCheck && (activeElement ===2 && correctAnswer!==2)}"
             class="answer mb-6 p-3 mr-3 ml-3 text-center font-thin text-4xl  h-2/3 text-gray-700 hover:bg-gray-300 shadow-xl bg-gray-100 hover:text-gray-500 cursor-pointer"
             @click="activateResponse(2); sendAnswerText(this.answer2)"> B. {{
            this.answer2
                                                                         }}
        </div>
        <div id="answer3"
             :class="{ activ : activeElement === 3}, {correct: readyToCheck &&  correctAnswer===3}, {wrong: readyToCheck && (activeElement ===3 && correctAnswer!==3)}"
             class="answer mb-6 p-3 mr-3 ml-3 text-center font-thin text-4xl  h-2/3 text-gray-700 hover:bg-gray-300 shadow-xl bg-gray-100 hover:text-gray-500 cursor-pointer"
             @click="activateResponse(3); sendAnswerText(this.answer3)"> C. {{
            this.answer3
                                                                         }}
        </div>
        <div id="answer4"
             :class="{ activ : this.activeElement === 4}, {correct: this.readyToCheck &&  this.correctAnswer===4}, {wrong: readyToCheck && (activeElement ===4 && correctAnswer!==4)}"
             class="answer mb-6 p-3 mr-3 ml-3 text-center font-thin text-4xl  h-2/3 text-gray-700 hover:bg-gray-300 shadow-xl bg-gray-100 hover:text-gray-500 cursor-pointer"
             @click="activateResponse(4); sendAnswerText(this.answer4)"> D. {{
            this.answer4
                                                                         }}
        </div>
        <div class="center">
          <!--Button to leave the game-->
          <button
              class="text-right bg-red-600 hover:bg-red-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              @click="leave"> Leave game
          </button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import Stomp from "stompjs";
import SockJS from 'sockjs-client';


import {
  DISCONNECT_MESSAGE,
  GAME_MESSAGE,
  IMAGE_ROOT,
  INVALID_TOKEN_MESSAGE,
  MESSAGE,
  QUESTION_TIMER_MESSAGE,
  RESULT_MESSAGE,
  SCORE_MESSAGE,
  SCORE_TIMER_MESSAGE,
  SESSION_EXPIRED_MESSAGE,
  START_TIMER_MESSAGE,
  STOMP_ENDPOINT,
  WEBSOCKET_IP,
  WS_URL
} from "@/assets/constants";

export default {
  name: "WebSocketwithSock",
  data() {
    return {
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      correctAnswer: 0,
      questionText: null,
      category: null,

      step: 0,
      readyToPlay: false,
      loading: false,


      setConnected: false,
      ws_url: WEBSOCKET_IP,
      ws_ip: WS_URL + STOMP_ENDPOINT,

      stompClient: null,

      opponentFound: false,
      connected: this.$store.state.isConnected,
      timer: 0,
      scoreTimer: 0,
      givenAnswer: "",
      currentUser: this.$store.state.user,
      resultMsg: null,
      startTimer: 3,
      readyToCheck: false,
      activeElement: 0,
      showScoretimer: false,

      errorText: "",
      showError: false,
      opponentImage: "default3.png",

      imageRoot: IMAGE_ROOT,
    }
  },

  methods: {

    //Sends the JWT - before searching for opponents but after connecting
    sendToken() {
      const body = {
        'token': sessionStorage.getItem('token')
      };
      this.stompClient.send("/app/game", {}, JSON.stringify(body));
      this.loading = true;
    },

    //Websocket-Stuff
    //Disconnects from the Websocket
    disconnectFromSocket() {
      this.stompClient.disconnect();
      this.updateSocketStatus(false)
    },

    //Updates the SocketStatus
    updateSocketStatus: function (value) {
      this.$store.commit('setSocketIsConnected', value);
      this.connected = this.$store.getters.getIsConnected
    },

    //Main Websocket-Method
    //Connects to the websocket and subscribes to get messages
    connectToWebsocket() {
      this.socket = new SockJS("http://localhost:8080/websocket");
      this.stompClient = Stomp.over(this.socket);

      this.stompClient.connect(
          {},
          frame => {
            this.$store.commit('setSocketIsConnected', true);
            this.addStep()
            this.updateSocketStatus(true)
            this.stompClient.subscribe('/user/topic/game', this.msgHandler);
          },
          error => {
            console.log(error);
            this.showError = true,
                this.errorText = error
            this.connected = false;
          }
      );
    },

    // Handles the incoming websocket-messages
    msgHandler(message) {
      const messageCommand = message.command;
      const messageType = message.headers.type;
      if (messageCommand === MESSAGE) {
        const msg = JSON.parse(message.body);
        switch (messageType) {

            //Different timers
          case START_TIMER_MESSAGE:
            //Timer before the games starts
            this.opponentFound = true;
            this.startTimer = msg.timeLeft;
            break;

          case QUESTION_TIMER_MESSAGE:
            //Main Timer for the questions
            this.scoreTimer = 0;
            this.showScoretimer = false;
            this.readyToCheck = false;
            this.readyToPlay = true
            this.timer = msg.timeLeft
            break

          case SCORE_TIMER_MESSAGE:
            //Timer for between the questions
            this.showScoretimer = true;
            this.scoreTimer = msg.timeLeft;
            this.timer = "wait"
            break

            //Different errors
          case DISCONNECT_MESSAGE:
            //Second player leaves game - must close the tab
            alert("Error - There was a technical issue");
            this.goToDisconnectPage()
            break
          case INVALID_TOKEN_MESSAGE:
            //JWT is expired before the game starts
            alert("Token expired");
            this.goToErrorPage()
            this.$store.dispatch('logout')
            break
          case SESSION_EXPIRED_MESSAGE:
            //Both players have the same username
            alert("There was a problem - you cannot play against yourself");
            this.goToErrorPage()
            this.$store.dispatch('logout')
            break

            //Game messages
          case GAME_MESSAGE:
            //Message with the main information
            this.gamestart = true;
            this.loading = false;
            this.resetSelectedAnswer();
            this.$store.commit('setUserName', msg.user.userName);
            this.$store.commit('setOpponentName', msg.opponent.userName);
            this.$store.commit('setOpponentScore', msg.opponentScore);
            this.$store.commit('setUserScore', msg.userScore);
            this.questionText = msg.question;
            this.category = msg.category;
            this.answer1 = msg.answer1;
            this.answer2 = msg.answer2;
            this.answer3 = msg.answer3;
            this.answer4 = msg.answer4;
            this.correctAnswer = msg.correctAnswer;
            break

            //Results
          case SCORE_MESSAGE:
            //The current scores after each question
            this.readyToCheck = true;
            break

          case RESULT_MESSAGE:
            // The final result after 3 questions
            try {
              this.winner = msg.winner.userName;
            } catch (JSONException) {
              // if there is no winner, set the value to none
              this.winner = "none";
            }
            this.$store.commit('setOpponentScore', msg.opponentScore);
            this.$store.commit('setUserScore', msg.userScore);
            this.$store.commit('setNewHighscore', msg.isHighScore);
            this.checkWinner();
            break
        }
      }
    },

    //Game elements
    //Makes the selected answer visible
    activateResponse: function (el) {
      if (this.activeElement === 0) {
        this.activeElement = el;
      }
      console.log("bereits gesetzt")
    },

    //Helper Methods to display elements on the right time
    checkAnswer() {
      this.readyToCheck = true;
    },
    addStep() {
      this.step = this.step + 1;
    },

    //Allows player to leave the game and start a new one
    leave() {
      this.disconnectFromSocket();
      this.$router.push('Game')
    },

    //Deselects the last answer
    resetSelectedAnswer() {
      this.readyToCheck = false;
      this.activeElement = 0;
    },

    //Sends the selected answer and the needed time to the server
    sendAnswerText(value) {
      this.givenAnswer = value;
      const body = {
        'answer': this.givenAnswer,
        "time needed": this.timer
      };
      this.stompClient.send("/app/game", {}, JSON.stringify(body));
    },

    //Checks for the winner and sets the result as .. result
    checkWinner() {
      if (this.winner === this.$store.getters.getOpponentName) {
        this.resultMsg = "You lost";
        this.$store.commit('setResult', 2);
        this.goToResult();
      } else if (this.winner === this.currentUser) {
        this.resultMsg = "You have won";
        this.$store.commit('setResult', 1);
        this.goToResult();
      } else {
        this.resultMsg = "Draw";
        this.$store.commit('setResult', 3);
        this.goToResult();
      }
    },

    //Result and errors
    //Takes the user to the result page
    goToResult() {
      this.disconnectFromSocket();
      this.$router.push('/result');
    },

    //Takes the user to a generic error page
    goToErrorPage() {
      this.disconnectFromSocket();
      this.$router.push('/error');
    },

    //Takes the user to a specific error page if the other player has disconnected
    goToDisconnectPage() {
      this.disconnectFromSocket();
      this.$router.push('/disconnect');
    },
  }
}
</script>

<style scoped>
/*Some specific CSS stuff for the big start-game-button*/
span {
  transform : skewX(15deg)
  }

span:nth-child(2) {
  width       : 20px;
  margin-left : 30px;
  position    : relative;
  top         : 12%;
  }

.cta:focus {
  outline : none;
  }

.cta:hover {
  transition : 0.5s;
  box-shadow : 10px 10px 0 #FBC638;
  }

.cta span:nth-child(2) {
  transition : 0.5s;
  }

.cta:hover span:nth-child(2) {
  transition   : 0.5s;
  margin-right : 45px;
  }

</style>

