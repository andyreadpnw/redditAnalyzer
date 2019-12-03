

let account_name = "spez"
const account_URL = `https://www.reddit.com/user/${account_name}/comments/.json`

const postsPerRequest = 100;
const maxPostsToFetch = 500;
const maxRequests = maxPostsToFetch / postsPerRequest

const responses = [];

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    fetchData();
    login();


function fetchData(){
    fetch(account_URL)
      .then(res => res.json())
      .then(json => displayJson(json))
  
  }
  
  function displayJson(json){
      console.log(json)
  }

  function login(){
        const loginContainer = document.getElementById("2") 
        let taco = document.getElementById("1")
        taco.addEventListener('click', event => {
            event.preventDefault();
            console.dir(loginContainer)
            loginContainer.style.display = "none";
            handleSubmit();
        })
    }


    const handleSubmit = e => {
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
        console.log(response)
        const responseJSON = await response.json();
        responses.push(responseJSON);
      
        if (responseJSON.data.after && responses.length < maxRequests) {
          fetchPosts(userInput, responseJSON.data.after);
          return;
        }
        parseResults(responses);
      };
      
      const parseResults = responses => {
        const allPosts = [];
      
        responses.forEach(response => {
          allPosts.push(...response.data.children);
        });
      
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
      };
      
      const displayRankings = sortedList => {
        const container = document.getElementById('results-container');
        sortedList.forEach(({ username, score, postCount }, i) => {
          rank = i + 1;
          const userCard = document.createElement('a');
          userCard.href = `https://www.reddit.com/user/${username}`;
          userCard.classList.add('user-card');
          userCard.innerText = `${rank}. ${username} - ${postCount} post(s) - ${score} point(s)`;
      
          container.appendChild(userCard);
        });
      };
      
      const userSelectForm = document.getElementById('user-select-form');
      userSelectForm.addEventListener('submit', handleSubmit);
    })