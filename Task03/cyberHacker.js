//declaracao de variaveis globais 
let score = 0; // "let" = o valor pode ser alterado posteriormente
let gameInterval;
const target = document.getElementById('target'); 
const scoreDisplay = document.getElementById('score'); // "document.getElementById" = "ponteiro para endereco de memoria", no conceito puro


function startGame() {
    // Esconder header e mostrar o main
    document.querySelector('header').style.display = 'none'; // "document.querySelector" = seleciona o primeiro elemento que corresponde ao seletor CSS
    document.querySelector('main').style.display = 'block'; // "style.display" = propriedade CSS para controlar a exibição de um elemento

    // Iniciar o jogo
    moveTarget();
    gameInterval = setInterval(moveTarget, 2000); // "setInterval" = executa uma funcao repetidamente, com um intervalo de tempo fixo entre cada execução (em ms)

    // Iniciar o cronometro
    //gameInterval = setTimeout(endGame, 30000); // "setTimeout" = executa uma funcao após um determinado tempo (em ms)
}

function upScore () {
    score++;
    scoreDisplay.textContent = score; // basicamente um "output" que limpa o valor anterior 
    moveTarget();
    displayLogs();
}

function moveTarget(){
    //calculo para evitar o alvo fora da tela
    const maxX = window.innerWidth - target.offsetWidth; // "window.innerWidth" = largura da janela, "target.offsetWidth" = largura do alvo
    const maxY = window.innerHeight - target.offsetHeight; // "window.innerHeight" = altura da janela, "target.offsetHeight" = altura do alvo

    // Gerar cordenados aleatórias
    const randomX = Math.floor(Math.random() * maxX); // "Math.floor" arredonda para um num int mais proximo
    const randomY = Math.floor(Math.random() * maxY); // "Math.random()" gera um num decimal aleatorio >= 0 x < 1

    // Aplica ao CSS do alvo
    target.style.left = `${randomX}px`; // "`&{randomX}px`" = concatenacao de um valor e uma string (px)
    target.style.top = `${randomY}px`;
}

// array com logs de invasao
const logsHacker = [
   "root@h-squaredev:~# nmap -sC -sV -p- 192.168.1.100",
    "[+] Port 80/tcp open (http) - Apache/2.4.41",
    "[+] Port 22/tcp open (ssh) - OpenSSH 8.2p1",
    "root@h-squaredev:~# wifite --kill --dict wordlist.txt",
    "[*] Capturing WPA handshake for BSSID 00:11:22:33:44:55...",
    "[+] Handshake captured! Cracking...",
    "root@h-squaredev:~# msfconsole -q",
    "msf6 > use exploit/multi/handler",
    "[*] Started reverse TCP handler on 10.0.0.5:4444",
    "[*] Sending stage (175174 bytes) to target",
    "[+] Meterpreter session 1 opened",
    "meterpreter > hashdump",
    "Admin:500:aad3b435...:31d6cfe0...:::",
    "root@h-squaredev:~# sqlmap -u 'http://target.com/page.php?id=1' --dbs",
    "[+] Parameter 'id' is vulnerable. Fetching databases...",
    "root@h-squaredev:~# hydra -l admin -P rockyou.txt ftp://192.168.1.50",
    "[+] [FTP] host: 192.168.1.50   login: admin   password: password123",
    "[*] Bypassing IDS/IPS signatures...",
    "[*] Injecting payload into memory...",
    "[+] Privilege escalation successful. Root access granted.",
    "[*] Wireshark packet sniffing initialized on wlan0",
    "root@h-squaredev:~# aircrack-ng capture.cap -w rockyou.txt",
    "[+] KEY FOUND! [ 12345678 ]",
    "[*] Extracting SAM database...",
    "[*] Cleaning tracks... clearing /var/log/auth.log"
];

// Funcao para exibir os logs de invasao
function displayLogs() {
    const logContainer = document.getElementById('log_content');
    const novaLinha = document.createElement('p');

    // Pega uma frase aleatória do array
    const frase = logsHacker[Math.floor(Math.random() * logsHacker.length)];

    novaLinha.textContent = frase;
    logContainer.appendChild(novaLinha); // "appendChild" = como o"push_back()"" de um "std::vector"

    // Faz o auto-scroll para mostrar sempre a última linha
    const terminal = document.getElementById('terminal_log');
    terminal.scrollTop = terminal.scrollHeight;
}