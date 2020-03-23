// function LinkedList() {
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

//////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////

// let longestPanindrome = function(string) {
//   let length = string.length;
//   let result = "";

//   let centeredPalindrome = function(left, right) {
//     while (left >= 0 && right < length && string[left] === string[right]) {
//       left--;
//       right++;
//     }
//     return string.slice(left + 1, right);
//   };
//   for (let i = 0; i < length - 1; i++) {
//     let oddPal = centeredPalindrome(i, i + 1);
//     let evenPal = centeredPalindrome(i, i);

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

// console.log(longestPanindrome("nan noon is redder"));


////////////////////////////////////////////////////////////////////////



