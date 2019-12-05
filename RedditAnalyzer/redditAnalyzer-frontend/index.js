let sample_account_name = "spez"
const sample_account_URL = `https://www.reddit.com/user/${sample_account_name}/comments/.json`

const postsPerRequest = 100;
const maxPostsToFetch = 500;
const maxRequests = maxPostsToFetch / postsPerRequest

let reRankArr = [];

let responses = [];

document.addEventListener('DOMContentLoaded', () => {
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
            // loginContainer.style.display = "none";
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
        
        const responseJSON = await response.json();
        responses.push(responseJSON);
        // console.dir(responseJSON.data.children)
   
        // console.dir(list)
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

 
 
    //    const list= allPosts.map(child => child.data.subreddit)
    //    subredditsCount(list)
    //    console.log(subredditsCount(list))
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
          let subreddit = allPosts[d].data.subreddit
          let thisPost = [score, body, totalAwards, num_comments, link_permalink, downs, ups, link_url, subreddit]
          postInstanceArr.push(thisPost)

        }

        

        numCommentsSort(postInstanceArr);

        const list= postInstanceArr.map(child => child[8]);

        console.log(top5Subreddit(list));

        piechart(top5Subreddit(list));

        downsSort(postInstanceArr);

        upsSort(postInstanceArr);
      }

      const numCommentsSort = (postInstanceArr) => {
        let numCommentsSort = [];
        numCommentsSort = postInstanceArr.sort(function(a, b) {
          return b[3] - a[3];
        });
        // console.log(numCommentsSort)
      }

      const downsSort = (postInstanceArr) => {
        let downsSort = [];
        downsSort = postInstanceArr.sort(function(a, b) {
          return b[6] - a[6];
        });
        // console.log(downsSort)
      }

      const upsSort = (postInstanceArr) => {
        let upsSort = [];
        upsSort = postInstanceArr.sort(function(a, b) {
          return b[7] - a[7];
        });
        // console.log(upsSort)
      }

      function top5Subreddit(listsubreddit){
        return subredditsCount(listsubreddit).slice(0, 5)
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
          else{console.log("Please register first")}
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

