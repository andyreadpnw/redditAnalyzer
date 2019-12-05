

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


  function login(){
        const loginContainer = document.getElementById("2a") 
        let taco = document.getElementById("1a")
        taco.addEventListener('click', event => {
            event.preventDefault();
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

    })