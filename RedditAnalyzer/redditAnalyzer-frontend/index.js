

let sample_account_name = "spez"
const sample_account_URL = `https://www.reddit.com/user/${sample_account_name}/comments/.json`

const postsPerRequest = 5;
const maxPostsToFetch = 10;
const maxRequests = maxPostsToFetch / postsPerRequest

let reRankArr = [];

let responses = [];

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    login();


  function login(){
        const loginContainer = document.getElementById("2a") 
        let taco = document.getElementById("1a")
        taco.addEventListener('click', event => {
            event.preventDefault();
            console.dir(loginContainer)
            loginContainer.style.display = "none";
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
        );
        // console.log(response)
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

        for(let d = 0; allPosts.length > d; d++){
          let body = allPosts[d].data.body
          let score = allPosts[d].data.score
          let totalAwards = allPosts[d].data.total_awards_recieved
          let num_comments = allPosts[d].data.num_comments
          let link_permalink = allPosts[d].data.link_permalink
          let downs = allPosts[d].data.downs
          let ups = allPosts[d].data.ups
          let link_url = allPosts[d].data.link_url

          let thisPost = [score, body, totalAwards, num_comments, link_permalink, downs, ups, link_url]
          postInstanceArr.push(thisPost)

        }

        console.log(postInstanceArr)

        numCommentsSort(postInstanceArr);

        downsSort(postInstanceArr);

        upsSort(postInstanceArr);
      }

      const numCommentsSort = (postInstanceArr) => {
        let numCommentsSort = [];
        numCommentsSort = postInstanceArr.sort(function(a, b) {
          return b[3] - a[3];
        });
        console.log(numCommentsSort)
      }

      const downsSort = (postInstanceArr) => {
        let downsSort = [];
        downsSort = postInstanceArr.sort(function(a, b) {
          return b[6] - a[6];
        });
        console.log(downsSort)
      }

      const upsSort = (postInstanceArr) => {
        let upsSort = [];
        upsSort = postInstanceArr.sort(function(a, b) {
          return b[7] - a[7];
        });
        console.log(upsSort)
      }


    })