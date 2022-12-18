Para rodar esse projeto é necessário NodeJs instalado, preferivelmente com a maior versão LTS.

- Configurando o backend
Entre na pasta backend
Crie um arquivo .env e insira "PORT=8000" dentro dele.
Rode npm install
Rode npm run build
Rode npm run dev
Após isso o projeto deveria estar rodando no endereço http://localhost:8000

- Configurando o frontend
Entre na pasta client
Rode npm install
Rode npm run build
Rode npm run dev
Após isso o projeto deveria estar rodando no endereço http://localhost:3000

- Observações
É importante que o projeto backend esteja configurado e rodando antes dos passos da configuração do frontend serem executados, afinal o client depende do backend para gerar o build.
É muito importante que ambos os projetos estejam rodando nos endereços aqui mencionados, pois CORS está definido para o endereço específico, assim como todas as chamadas de API.
