//////////////////////////////////////////linked list example
//function LinkedList() {
//   let length = 0;
//   let head = null;

//   let Node = function(element) {
//     this.element = element;
//     this.next = null;
//   };

//   this.size = function() {
//     return length;
//   };

//   this.head = function() {
//     return head;
//   };

//   this.add = function(element) {
//     let node = new Node(element);
//     if (head === null) {
//       head = node;
//     } else {
//       let currentNode = head;
//       while (currentNode.next) {
//         currentNode = currentNode.next;
//       }

//       currentNode.next = node;
//     }
//     length++;
//   };

//   this.remove = function(element) {
//     let currentNode = head;
//     let previousNode;
//     if ((currentNode.element = element)) {
//       head = currentNode.next;
//     } else {
//       while (currentNode != element) {
//         previousNode = currentNode;
//         currentNode = currentNode.next;
//       }
//       previousNode.next = currentNode.next;
//     }
//     length--;
//   };

//   this.isEmpty = function() {
//     return length === 0;
//   };

//   this.indexOf = function(element) {
//     let currentNode = head;
//     let index = -1;

//     while (currentNode) {
//       index++;
//       if (currentNode.element === element) {
//         return index;
//       }
//       currentNode = currentNode.next;
//     }
//     return -1;
//   };

//   this.elementAt = function(index) {
//     let currentNode = head;
//     let count = 0;
//     while (count < index) {
//       count++;
//       currentNode = currentNode.next;
//     }
//     return currentNode.element;
//   };

//   this.addAt = function(index, element) {
//     let node = new Node(element);

//     let currentNode = head;
//     let previousNode;
//     let currentIndex = 0;

//     if (index > length) {
//       return false;
//     } else {
//       while (currentIndex < index) {
//         currentIndex++;
//         previousNode = currentIndex;
//         currentNode = currentNode.next;
//       }
//       node.next = currentNode;
//       previousNode.next = node;
//     }
//     length++;
//   };
//   this.removeAt = function(index, element) {
//     let currentNode = head;
//     let previousNode;
//     let currentIndex = 0;

//     if (index > length) {
//       return false;
//     } else {
//       while (currentIndex < index) {
//         currentIndex++;
//         previousNode = currentNode;
//         currentNode = currentNode.next;
//       }
//       previousNode.next = currentNode.next;
//     }
//     length--;
//     return currentNode.element;
//   };
// }

// let conga = new LinkedList();
// conga.add("kitten");
// conga.add("puppy");
// conga.add("dog");
// conga.add("cat");
// conga.add("fish");
// console.log(conga.size());
// console.log(conga.removeAt(3));
// console.log(conga.elementAt(3));
// console.log(conga.indexOf("puppy"));
// console.log(conga.size());

////////////////////////////////////////////////////////////////////////// leetcode 3

// var lengthOfLongestSubstring = function(s) {
//   let max = 0;
//   const newSet = new Set();
//   let start = 0;
//   // let charArr = s.split('')

//   for (let i = 0; i < s.length; i++) {
//     if (newSet.has(s[i])) {
//       while (s[start] !== s[i]) {
//         newSet.delete(s[start++]);
//       }
//     }
//     newSet.add(s[i]);
//     max = Math.max(max, newSet.size);
//   }
//   console.log(max);
//   return max;
// };

// lengthOfLongestSubstring("abacabcbb");

//////////////////////////////////////////////////////////////////////////////// leetcode 4

// let longestPanindrome = function(string) {
//   let length = string.length;
//   let result = "";

//   let centeredPalindrome = function(left, right) {
//     console.log(left);
//     console.log(right);
//     console.log(string[left]);
//     console.log(string[right]);
//     while (left >= 0 && right < length && string[left] === string[right]) {
//       left--;
//       right++;
//     }
//     // console.log(string.slice(left + 1, right));
//     return string.slice(left + 1, right);
//   };

//   for (let i = 0; i < length - 1; i++) {
//     let oddPal = centeredPalindrome(i, i + 1); //(0,1) returns 0,1
//     let evenPal = centeredPalindrome(i, i); //(0, 0) returns

//     console.log(oddPal);
//     console.log(evenPal);

//     if (oddPal.length > 1) {
//       console.log(oddPal);
//     }
//     if (evenPal.length > 1) {
//       console.log(evenPal);
//     }

//     if (oddPal.length > result.length) {
//       result = oddPal;
//     }
//     if (evenPal.length > result.length) {
//       result = evenPal;
//     }
//   }
//   return result;
// };

// console.log(longestPanindrome("dood dad nnaann"));

//////////////////////////////////////////////////////////////////////// leetcode 5

// var convert = function(s, numRows) {
//   let x = -1;
//   let y = 0;
//   let resultArr = [];
//   let finalArr = [];
//   let isZigging = true;
//   let dumbVar = true;

//   for (let i = 0; i < s.length; i++) {
//     console.log(x);
//     dumbVar = true;
//     if (isZigging === true) {
//       if (x < numRows - 1) {
//         x++;
//         console.log([x, y, s[i]]);
//         resultArr.push([x, y, s[i]]);
//         console.log("zigging");
//       } else {
//         x--;
//         y++;
//         resultArr.push([x, y, s[i]]);
//         console.log([x, y, s[i]]);
//         isZigging = false;
//         console.log("begin zagging");
//         dumbVar = false;
//       }
//     }
//     if (isZigging === false && dumbVar === true) {
//       if (x > -1) {
//         x--;
//         y++;
//         resultArr.push([x, y, s[i]]);
//         console.log([x, y, s[i]]);
//         console.log("zagging");
//       }
//       if (x === -1) {
//         resultArr.push([x, y, s[i]]);
//         isZigging = true;
//         console.log("zagging and hit first row");
//       }
//     }

//     // console.log(resultArr)

//     // for (let j = 0; j < s.length; j++) {
//     //   let increment = 0;
//     //   let middleArr = resultArr.filter(result => result[increment] === j);
//     //   finalArr.push(middleArr);
//     //   middleArr = 0;
//     //   increment++;
//     // }
//   }
//   return finalArr;
// };

// console.log(convert("PAYPALISHIRING", 3));

//////////////////////////////////////////////////////////////////////////////// leetcode 6

let intToRoman = function(num) {
    let intNums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    let romans = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
    
    let romanArr = []
    
    for(let i = 0; i < intNums.length; i ++){
        while(num - intNums[i] >= 0){
            romanArr.push(romans[i])
            num = num - intNums[i]
        }
    }
    return romanArr.join('')
};

////////////////////////////////////////////////////////////


// var lengthOfLongestSubstring = function(s) {
//   let max = 0;
//   const newSet = new Set();
//   let start = 0;
//   // let charArr = s.split('')

//   for (let i = 0; i < s.length; i++) {
//     if (newSet.has(s[i])) {
//       while (s[start] !== s[i]) {
//         newSet.delete(s[start++]);
//       }
//     }
//     newSet.add(s[i]);
//     max = Math.max(max, newSet.size);
//   }
//   console.log(max);
//   return max;
// };

// lengthOfLongestSubstring("abacabcbb");

///////////////////////////////////////////

// var multiply = function(num1, num2) {
//     var result = 0;
//     // if any of the nums is 0, automatically it is zero
//     if(num1[0] === '0' || num2[0] === '0') {return'0'};
    
//     var length1 = num1.length - 1;
//     var length2 = num2.length - 1;
//     var counterI = 0;
//     var iBase10 = 1;
//     for(var i = length1; i >= 0; i--){
//       iBase10 = Math.pow(10, counterI)
//       counterI++;
//       var counterJ = 0
//       var jBase10 = 1;
//       for(var j = length2; j >= 0; j--){
//         jBase10 = Math.pow(10, counterJ)
//         counterJ++;
//         result += (num1[i] * iBase10) * (num2[j] * jBase10)
//       }
//     }
//     return result.toString()
//   };

//////////////////////////////////////////////////

// var isValidSudoku = function(board) {
//   let valid = true;
  
//   const validate = digits => {
//       digits = digits.filter(v => v !== '.').map(n => Number(n)).sort((a, b) => a - b);
      
//       for(let k = 0; k < digits.length -1; k++) {
//           if(digits[k] === digits[k+1]) {
//               valid = false;
//           }
//       }
//   }
  
//   // validate rows
//   for(let r = 0; r < board.length; r++) {
//       let digits = board[r]
      
//       validate(digits);
//   }
  
//   // validate cols
//   for(let c = 0; c < board[0].length; c++) {
//       let digits = [];
      
//       for(let k = 0; k < board.length; k++) {
//           digits.push(board[k][c]);
//       }
      
//       validate(digits);
//   }
  
//   // validate 3x3
//   for(let r = 0; r < board.length; r+=3) {
//       for(let c = 0; c < board[0].length; c+=3) {
//           let digits = [];
//           for(let k = 0; k < 3; k++) {
//               for(let n = 0; n < 3; n++) {
//                   digits.push(board[r+k][c+n]);
//               }
//           }
          
//           validate(digits);
//       }
//   }
  
//   return valid;
// };


// /////////////////////////////////////////


// var groupAnagrams = function(strs) {
//   const prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103]; 
//   let res = {};
//   for(let i = 0; i<strs.length;i++){
//     let key = 1;
//     for(let j = 0;j<strs[i].length;j++){
//       key *= prime[strs[i][j].charCodeAt(0)-'a'.charCodeAt(0)];
//     }
//     if(res[key]!==undefined){
//       res[key].push(strs[i]);
//     }else{
//       res[key]=[strs[i]];
//     }	
//   }
//   return Object.values(res);
// };

///////////////////////
var findSubstring = function (s, words) {
	// corner case
	if (s == null || words == null || words.length == 0) {
		return [];
	}

	// normal case
	let res = [];
	let n = words.length;
	let m = words[0].length;
	let map = {};
	for (let str of words) {
		map[str] = (map[str] || 0) + 1;
	}

	for (let i = 0; i <= s.length - n * m; i++) {
		let copy = { ...map };
		let k = n;
		let j = i;
		while (k > 0) {
			let str = s.substring(j, j + m);
			if (!copy[str] || copy[str] < 1) {
				break;
			}
			copy[str]--;
			k--;
			j += m;
		}
		if (k == 0) {
			res.push(i);
		}
	}
	return res;
};


/////////////////////////////////

var isMatch = function(s, p) {
    let regex = new RegExp(p)
	return s.match(regex) ? s === s.match(regex)[0] : false
};