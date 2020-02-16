const attackValue = 10;
const monsterAttackValue = 14;

let choseMaxLife = 100;
let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;

adjustHealthBars(choseMaxLife)

let attackHandler = () =>{
    const damage = dealMonsterDamage(attackValue);
    currentMonsterHealth -= damage;
    const  playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -= playerDamage;
    

    if (currentMonsterHealth <= 0) {
        alert('yoyo');
    } else if (condition) {
        
    }
}




attackBtn.addEventListener('click',attackHandler);