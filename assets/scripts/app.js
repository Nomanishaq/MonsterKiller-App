const attackValue = 10;
const strongAttackHandlerValue = 17;
const monsterAttackValue = 14;
const healValue = 20;
const modeAttack = 'attack';
const modeStrongAttack = 'strongAttack';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRING_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let enterValue =  prompt('Maximum life for you and monster.','100');
 
let choseMaxLife = parseInt(enterValue);
let betterLog = [];
if (isNaN(choseMaxLife) || choseMaxLife <= 0) {
    choseMaxLife = 100;
}
let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;
let hasBounesLife = true;

adjustHealthBars(choseMaxLife)

let writeToLog = (ev,val,currentMonsterHealth,playerHealth) =>{
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: playerHealth
    }
if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = 'MONSTER';
}else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: playerHealth
    }
}else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: playerHealth
    }
}
else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: playerHealth
    }
}else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: playerHealth
    }
}
betterLog.push(logEntry);
}

let reSet = () =>{
    currentMonsterHealth = currentPlayerHealth;
    currentPlayerHealth = choseMaxLife;
    resetGame(choseMaxLife);
}

let endRound = () =>{
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -= playerDamage;

    writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBounesLife) {
        hasBounesLife = false;
        removeBonusLife();
        currentPlayerHealth  = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but bonus life saved you');
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won');
        writeToLog(LOG_EVENT_GAME_OVER,'PLAYER WON',currentMonsterHealth,currentPlayerHealth);

    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('you lost the game');
        writeToLog(LOG_EVENT_GAME_OVER,'MONSTER WON',currentMonsterHealth,currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('drow');
        writeToLog(LOG_EVENT_GAME_OVER,'DRAW',currentMonsterHealth,currentPlayerHealth);
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reSet();
    }
}

let attackMonster = mode => {
    let maxDamage;
    let logEvent;
    if (mode == modeAttack) {
        maxDamage = attackValue;
        logEvent = LOG_EVENT_PLAYER_ATTACK
    } else if (mode == modeStrongAttack) {
        maxDamage = strongAttackHandlerValue;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent,damage,currentMonsterHealth,currentPlayerHealth);

    endRound();
}

let attackHandler = () => {
    attackMonster(modeAttack)
}

let strongAttackHandler = () => {
    attackMonster(modeStrongAttack)
}
let healPlayerHandler = () =>{
    let Heal_Value;
    if (currentPlayerHealth >= choseMaxLife - healValue) {
        alert("you can't heal to more than your max initial health.");
        Heal_Value = choseMaxLife - currentPlayerHealth;
    } else {
        Heal_Value = healValue;
    }
    writeToLog(LOG_EVENT_PLAYER_HEAL,healValue)
    increasePlayerHealth(healValue);
    currentPlayerHealth += Heal_Value;
    endRound();
}
let printLogHandler = () =>{
console.log(betterLog);

}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);