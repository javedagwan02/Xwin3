// ===== GLOBAL DAILY WIN LIMIT =====

(function(){

let dailyWin = parseInt(localStorage.getItem("dailyWin") || "0");
let lastReset = localStorage.getItem("lastReset");
let today = new Date().toDateString();

// reset daily
if(lastReset !== today){
  dailyWin = 0;
  localStorage.setItem("dailyWin",0);
  localStorage.setItem("lastReset",today);
}

// override Math.random
const originalRandom = Math.random;

Math.random = function(){

  // agar user 100 jeet chuka hai
  if(dailyWin >= 100){
    return 0.99; // force loss
  }

  return originalRandom();
}

// jab bhi win ho
window.addWinAmount = function(amount){

  if(dailyWin >= 100){
    return 0;
  }

  if(dailyWin + amount > 100){
    amount = 100 - dailyWin;
  }

  dailyWin += amount;
  localStorage.setItem("dailyWin",dailyWin);

  return amount;
}

})();
