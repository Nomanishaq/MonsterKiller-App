const attackValue = 10;
const strongAttackHandlerValue = 17;
const monsterAttackValue = 14;

let choseMaxLife = 100;
let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;

adjustHealthBars(choseMaxLife)

let attackMonster = mode => {
    let maxDamage;
    if (mode == 'attack') {
        maxDamage = attackValue;
    } else if (mode == 'strongAttack') {
        maxDamage = strongAttackHandlerValue;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -= playerDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('yoyo');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('lost');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('drow');
    }

}

let attackHandler = () => {
    attackMonster('attack')
}

let strongAttackHandler = () => {
    attackMonster('strongAttack')
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);