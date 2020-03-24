Jogo Criado usando React, Hooks, Styled-Components, Material UI.

Link do demo online https://reactcoderace.herokuapp.com/

Para inicializar o jogo, deve ser instalado os pacotes.

npm install

Para inicializar o front execute

npm run start


--------

Para iniciar o jogo deve ser colocado o nome do jogador e clicar no botão "Iniciar a Corrida".

Mapa de teclas

Para vira a esquerda usar "A" ou a seta direcional esquerda <-
Para vira a direita usar "D" ou a seta direcional direita ->
Para voltar imediatamente para o centro usar a telca "S"
Para pausar o jogo utilize a tecla "ESC"

Na tela do lado esquerdo é exibido um timer de 8 segundos para carregar o turbo, quando completo é exibida a imagem de uma garrafa de NOS. 
Para usar o turbo é utilizada a seta direcional para cima do teclado.

São 3 voltas de 20 segundos cada.


-------

O backend utiliza Nodejs, Graphql, Express, Sqlite, Sequelize para armazenar os dados do Leaderboard

Para executar o mesmo, deve ser instalado os modulos

npm install

Gerado o arquivo de build 

npm run build

Para executar em dev 

npm run dev

será criada uma pasta db com o arquivo do banco de dados