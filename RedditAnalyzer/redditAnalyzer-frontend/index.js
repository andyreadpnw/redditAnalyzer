

let sample_account_name = "spez"
const sample_account_URL = `https://www.reddit.com/user/${sample_account_name}/comments/.json`

const postsPerRequest = 100;
const maxPostsToFetch = 500;
const maxRequests = maxPostsToFetch / postsPerRequest

let reRankArr = [];

let responses = [];

document.addEventListener('DOMContentLoaded', () => {
  let hiddenApp = document.getElementById("3a")
  hiddenApp.style.display = "none";

    console.log('DOM fully loaded and parsed');
    login();
    signUp();


  function login(){
        const loginContainer = document.getElementById("2a") 
        let taco = document.getElementById("1a")
        taco.addEventListener('click', event => {
            event.preventDefault();
            const userNameInput = document.getElementById('usrLogin').value;
            fetchUserPost(userNameInput, loginContainer);
            loginContainer.style.display = "none";
            let hiddenApp = document.getElementById("3a")
            hiddenApp.style.display = "block";
        })
    }


    const handleSubmit = e => {
      responses = [];

        event.preventDefault();
        const userInput = document.getElementById('user').value;
        fetchPosts(userInput);
      };
      
      const fetchPosts = async (userInput, afterParam) => {
        const response = await fetch(
          `https://www.reddit.com/user/${userInput}/comments/.json?limit=${postsPerRequest}${
            afterParam ? '&after=' + afterParam : ''
          }`
        )
        //console.log(response)
        const responseJSON = await response.json();
        responses.push(responseJSON);
      
        if (responseJSON.data.after && responses.length < maxRequests) {
          fetchPosts(userInput, responseJSON.data.after);
          return;
        }
        parseResults(responses);
      };
      
      const parseResults = responses => {
        let allPosts = [];

        responses.forEach(response => {
          allPosts.push(...response.data.children);
        });
        
        ////////////////send the posts to analyzePosts function
        analyzePosts(allPosts)
        
        ///////////////////////////////////////////////

        statsByUser = {};
      
        allPosts.forEach(({ data: { author, score } }) => {
          statsByUser[author] = !statsByUser[author]
            ? { postCount: 1, score }
            : {
                postCount: statsByUser[author].postCount + 1,
                score: statsByUser[author].score + score
              };
        });
      
        const userList = Object.keys(statsByUser).map(username => ({
          username,
          score: statsByUser[username].score,
          postCount: statsByUser[username].postCount
        }));
      
        const sortedList = userList.sort((userA, userB) => userB.score - userA.score);

      
        displayRankings(sortedList);
        allPosts = [];

      };
      
      const displayRankings = sortedList => {
        const container = document.getElementById('results-container');
        sortedList.forEach(({ username, score, postCount }, i) => {
          rank = i + 1;
          const userCard = document.createElement('a');
          userCard.href = `https://www.reddit.com/user/${username}`;
          userCard.hidden = true;
          userCard.classList.add('user-card');
          userCard.innerText = `${rank}. ${username} = ${postCount} post(s) - ${score} points`;
      
          container.appendChild(userCard);
        });
        sortedList = [];

        //clear reRank array to preprare for a new re-rank
        reRankArr = [];
        reRank();
  
      };
      ///////////////////////////////////////////////////////////////////
      const userSelectForm = document.getElementById('user-select-form');
      userSelectForm.addEventListener('submit', handleSubmit);
      //////////////////////////////////////////////////////////////////

      const reRank = () => {
    
        let userCardRerank = document.getElementsByClassName('user-card')
       
        
        for(let i = 0; userCardRerank.length > i; i++){
            
          let lopOff = userCardRerank[i].innerText;

          const scoreGetter = /(\d+)(?!.*\d)/g;
          const scoreString = lopOff.match(scoreGetter)
          let scoreInt = parseInt(scoreString)

          const commentsGetter = /\s+0*(\d+)/
          const commentsString = lopOff.match(commentsGetter)
          let commentsInt = parseInt(commentsString)


          const userGetter = /(?<=^\S*\s+)\S+/
          const userString = lopOff.match(userGetter)


          let instanceArr = [userString[0], commentsInt, scoreInt]

          reRankArr.push(instanceArr) 
          }


          setTimeout(function(){       
            let elements = document.getElementsByClassName('user-card');
            while(elements.length > 0){
              elements[0].parentNode.removeChild(elements[0]);
          }}, 1000);

          let sortedArray = reRankArr.sort(function(a, b) {
            return b[2] - a[2];
          });

        setTimeout(function(){ 
        for(let j = 0; sortedArray.length > j; j++){

          ranker = j + 1;
          const redditCard = document.createElement('a');
          const redditCardBreak = document.createElement('br');
          redditCard.href = `https://www.reddit.com/user/${sortedArray[j][0]}`;
          redditCard.classList.add('user-card');
          redditCard.innerText = `${ranker}. ${sortedArray[j][0]} = ${sortedArray[j][1]} post(s) - ${sortedArray[j][2]} points`;

          const container = document.getElementById('results-container');
          container.append(redditCard, redditCardBreak)
        }}, 3000)
      }

      const analyzePosts = (allPosts) => {
       
        let postInstanceArr = [];
        let postInstanceArr2 = [];
        let postInstanceArr3 = [];

        for(let d = 0; allPosts.length > d; d++){
          let body = allPosts[d].data.body
          let score = allPosts[d].data.score
          let num_comments = allPosts[d].data.num_comments
          let link_permalink = allPosts[d].data.link_permalink
          let downs = allPosts[d].data.downs
          let ups = allPosts[d].data.ups
          let link_url = allPosts[d].data.link_url
          let gilded = allPosts[d].data.gilded
          let subreddit = allPosts[d].data.subreddit

          let thisPost = [score, body, num_comments, link_permalink, downs, ups, link_url, gilded, subreddit]
          postInstanceArr.push(thisPost)
          postInstanceArr2.push(thisPost)
          postInstanceArr3.push(thisPost)

        }

        const list = postInstanceArr.map(child => child[8]);

        console.log(top5Subreddit(list));

        piechart(top5Subreddit(list));

        gildedSort(postInstanceArr)

        numCommentsSort(postInstanceArr2)

        upsSort(postInstanceArr3);
      }

      const upsSort = (postInstanceArr3) => {
        let upsSort = [];
        upsSort = postInstanceArr3.sort(function(a, b) {
          return b[5] - a[5];
        });

        let upsDisplay = document.getElementById("results-highscore-container")
        upsDisplay.innerHTML = ""

        let upsNumber = document.createElement('a')
        upsNumber.textContent = upsSort[0][5] + " " + "Karma" + " "
        let upsBody = document.createElement('a')
        let upsH5 = document.createElement('h5')
        upsH5.innerText = "Highest Scored Comment"
        upsBody.textContent = upsSort[0][1]
        upsBody.href = `${upsSort[0][6]}`

        upsDisplay.append(upsH5, upsNumber, upsBody)

      }

      const numCommentsSort = (postInstanceArr2) => {
        let numCommentsSort = [];
        numCommentsSort = postInstanceArr2.sort(function(a, b) {
          return b[2] - a[2];
        });

        let numCommentsDisplay = document.getElementById("results-highcomments-container")
        numCommentsDisplay.innerHTML = ""

        let numCommentsNumber = document.createElement('a')
        numCommentsNumber.textContent = numCommentsSort[0][2] + " " + "Comment Children(s)" + " "
        let numCommentsBody = document.createElement('a')
        let numCommentsH5 = document.createElement('h5')
        numCommentsH5.innerText = "Highest Number of Comment Children"
        numCommentsBody.textContent = numCommentsSort[0][1]
        numCommentsBody.href = `${numCommentsSort[0][6]}`

        numCommentsDisplay.append(numCommentsH5, numCommentsNumber, numCommentsBody)
       
      }

      const gildedSort = (postInstanceArr) => {
        let gildedSort = [];
        gildedSort = postInstanceArr.sort(function(a, b) {
          return b[7] - a[7];
        });

        let gildedDisplay = document.getElementById("results-highgilded-container")
        gildedDisplay.innerHTML = ""

        let gildedNumber = document.createElement('a')


        gildedNumber.textContent = gildedSort[0][7] + " " + "Gilding(s)" + " "
        let gildedBody = document.createElement('a')
        let gildedH5 = document.createElement('h5')
        gildedH5.innerText = "Most Gildings on Comments"
        gildedBody.textContent = gildedSort[0][1]
        gildedBody.href = `${gildedSort[0][6]}`

        gildedDisplay.append(gildedH5, gildedNumber, gildedBody)
        let autoHeight = document.getElementById("second-results")

        autoHeight.style.height = "auto"

        if(gildedSort[0][7] < 1){
          gildedDisplay.removeChild(gildedBody, gildedH5, gildedNumber)
          let neverGuild = document.createElement('a')
          neverGuild.innerText = "Not Yet Recieved Gold"
          gildedDisplay.append(neverGuild)
        }
      }


      function subredditsCount(listsubreddit){
        const array = listsubreddit.map(e => SubredditNum(listsubreddit, e))
        let unique = array.map(ar=>JSON.stringify(ar))
                .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
                 .map(str=>JSON.parse(str));
        let uniqueSorted = unique.sort(function(a, b){return b[1]-a[1]})
        return uniqueSorted
      }


      function SubredditNum(arr, e){  
        let h = [e]
        arr.reduce(function(memo, num){ 
                     if(num===e)
                        { memo +=1 }
                    return h[1] = memo}, 0) 
        return h  
        }
function piechart(ar){
      let total= ar[0][1]+ar[1][1]+ar[2][1]+ar[3][1]+ar[4][1]
       const reddit1Lables = ar[0][0] + " " + Math.round(100*(ar[0][1])/total)+ "%"
       const reddit2Lables = ar[1][0] + " " + Math.round(100*(ar[1][1])/total)+ "%"
       const reddit3Lables = ar[2][0] + " " + Math.round(100*(ar[2][1])/total)+ "%"
       const reddit4Lables = ar[3][0] + " " + Math.round(100*(ar[3][1])/total)+ "%"
       const reddit5Lables = ar[4][0] + " " + Math.round(100*(ar[4][1])/total)+ "%"

        let labels = [reddit1Lables, reddit2Lables, reddit3Lables, reddit4Lables, reddit5Lables];
        let data = [
            100*(ar[0][1])/total,
            100*(ar[1][1])/total,
            100*(ar[2][1])/total,
            100*(ar[3][1])/total,
            100*(ar[4][1])/total
        ];
        let pie = document.getElementById("myChart").getContext('2d');
        let myChart = new Chart(pie, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        borderColor: ['rgba(160, 42, 192, 1)','rgba(47, 42, 192, 1)','rgba(75, 192, 192, 1)', 'rgba(192, 0, 0, 1)','rgba(192, 75, 192, 0.5)'],
                        backgroundColor: ['rgba(160, 42, 192, 0.2)','rgba(47, 42, 192, 0.2)','rgba(75, 192, 192, 0.2)', 'rgba(192, 0, 0, 0.2)','rgba(192, 75, 192, 0.5)'],
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: "User Top Subreddit"
                }
            }
        });
        
    }

    function fetchUserPost(input, loginContainer){
        fetch(`http://127.0.0.1:3000/users`).then(resp => resp.json()).then(function(userData){
          let found = userData.find(user => user.username === input)
          if(found){loginContainer.style.display = "none";
          console.log("The user found")}
          else{console.log("Please rigester first")}
        });
    }

    function signUp(){
        const signupContainer = document.querySelector("body") 
        const loginContainer = document.getElementById("2a") 
        let taco = document.getElementById("4a")
        taco.addEventListener('click', event => {
            event.preventDefault();
            loginContainer.style.display = "none";
            const signUpDiv = document.createElement('div')
            const signUpH2 = document.createElement('h2')
            const singUpForm = document.createElement('form')
            signUpH2.innerHTML= "SignUp"
            const signUpinputName = document.createElement('input')
            signUpinputName.value ="Name"
            const signUpinputUserName = document.createElement('input')
            const submit= document.createElement('button')
            submit.innerText="Submit"
            signUpinputUserName.value ="User Name"
            signUpDiv.appendChild(signUpH2)
            singUpForm.appendChild(submit)
            singUpForm.appendChild(signUpinputName)
            singUpForm.appendChild(signUpinputUserName)
            signUpDiv.appendChild(singUpForm)
            signupContainer.appendChild(signUpDiv)
            submit.addEventListener('click', function(e){
                e.preventDefault();
                fetchSignup(signUpinputName.value, signUpinputUserName.value)
            })
            // loginContainer(userNameInput, loginContainer);
        })
    }

    function fetchSignup(name, userName){
        fetch(`http://127.0.0.1:3000/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({username: userName})
          }).then(function(resp) {
            if (Math.floor(resp.status/200) === 1) {
              console.log("Great ")
            } else {
              console.log("ERROR", resp)
            }
          });
    }

    })