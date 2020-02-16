const attackValue = 10;
const strongAttackHandlerValue = 17;
const monsterAttackValue = 14;
const healValue = 20;


let enterValue =  prompt('Maximum life for you and monster.','100');

let choseMaxLife = parseInt(enterValue);
if (isNaN(choseMaxLife) || choseMaxLife <= 0) {
    choseMaxLife = 100;
}
let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;
let hasBounesLife = true;

adjustHealthBars(choseMaxLife)



let reSet = () =>{
    currentMonsterHealth = currentPlayerHealth;
    currentPlayerHealth = choseMaxLife;
    resetGame(choseMaxLife);
}

let endRound = () =>{
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && hasBounesLife) {
        hasBounesLife = false;
        removeBonusLife();
        currentPlayerHealth  = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but bonus life saved you');
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You win the game');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('you lost the game');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('drow');
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reSet();
    }
}

let attackMonster = mode => {
    let maxDamage;
    if (mode == 'attack') {
        maxDamage = attackValue;
    } else if (mode == 'strongAttack') {
        maxDamage = strongAttackHandlerValue;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

let attackHandler = () => {
    attackMonster('attack')
}

let strongAttackHandler = () => {
    attackMonster('strongAttack')
}
let healPlayerHandler = () =>{
    let Heal_Value;
    if (currentPlayerHealth >= choseMaxLife - healValue) {
        alert("you can't heal to more than your max initial health.");
        Heal_Value = choseMaxLife - currentPlayerHealth;
    } else {
        Heal_Value = healValue;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += Heal_Value;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);