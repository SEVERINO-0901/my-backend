const express = require('express');
const {Client} = require('pg');
const cors = require('cors');

const app = express();
app.use(
  express.json(),
  cors({
    origin: "*" //Permite todas as origens
})); //Permitir JSON no corpo das requisições 
const port = 3000;

const user = "tyr"; //user: 'postgres'
const host = "pgsql.tyr.digital"; //host: '44.223.149.30'
const database = "tyr"; //database: 'Bluenano'
const password = "iotgel20"; //password: 'Iotgel2020*'
const port1 = 5432;

//Configuração do client de conexão ao PostgreSQL
const client = new Client({
    user: user, 
    host: host, 
    database: database, 
    password: password,
    port: port1
  });

// Testar a conexão ao banco no início
client.connect()
  .then(() => {
    console.log('Conexão ao banco estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  });

  app.post('/VerifyLogin', async(req, res) => { //Verificar LOGIN
    const {username, password} = req.body;
  
    try{
      const result = await client.query('SELECT * FROM usuario WHERE loginusuario = $1 AND senha = $2', [username, password]);
      if(result.rows.length === 0){ //Se não tiver dados
        return res.status(404).json({ message: 'Nenhum dado encontrado para a descrição fornecida.' });
      }
      res.status(200).json(result.rows); // Retornar os dados encontrados
    }
    catch(error){
      res.status(500).send(error.message);
    }
  });

/*Métodos GET*/

app.get('/getData/atuador', async(req, res) => { //buscar dados(ATUADORES)
  try{
    const result = await client.query('SELECT * FROM hardware WHERE tipo = $1 ORDER by descricao', ['A']);
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

app.get('/getData/bases', async(req, res) => { //buscar dados(BASES)
  try{
    const result = await client.query('SELECT * FROM bases ORDER by descricao');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

app.get('/getData/cidade', async(req, res) => { //buscar dados(CIDADES)
  try{
    const result = await client.query('SELECT * FROM cidade ORDER by uf');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

app.get('/getData/cliente', async(req, res) => { //buscar dados(CLIENTES)
  try{
    const result = await client.query('SELECT * FROM cliente ORDER by nomefantasia');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});
app.get('/getData/contatocliente/:code', async(req, res) => { //buscar dados(CONTATOS CLIENTE)
  const { code } = req.params;

  try{
    const result = await client.query('SELECT * FROM contatocliente WHERE codcliente = $1 ORDER BY codigo', [code]);
    if(result.rows.length === 0){ //Se não tiver dados
      return res.status(404).json({ message: 'Nenhum dado encontrado para a descrição fornecida.' });
    }
    res.status(200).json(result.rows); // Retornar os dados encontrados
  }
  catch(error){
    console.error('Erro ao buscar dados do cliente:', error.message);
    res.status(500).send(error.message);
  }
});
app.get('/getData/documentocliente/:code', async(req, res) => { //buscar dados(DOCUMENTOS CLIENTE)
  const { code } = req.params;

  try{
    const result = await client.query('SELECT * FROM documentocliente WHERE codcliente = $1 ORDER BY codigo', [code]);
    if(result.rows.length === 0){ //Se não tiver dados
      return res.status(404).json({ message: 'Nenhum dado encontrado para a descrição fornecida.' });
    }
    res.status(200).json(result.rows); // Retornar os dados encontrados
  }
  catch(error){
    console.error('Erro ao buscar dados do cliente:', error.message);
    res.status(500).send(error.message);
  }
});
app.get('/getData/nomeusuario/:loginusuario', async(req, res) => { //buscar dados(USUÁRIO ESPECÍFICO)
  const { loginusuario } = req.params;


  try{
    const result = await client.query('SELECT * FROM usuario WHERE loginusuario = $1', [loginusuario]);
    if(result.rows.length === 0){ //Se não tiver dados
      return res.status(404).json({ message: 'Nenhum dado encontrado para a descrição fornecida.' });
    }
    res.status(200).json(result.rows[0]); // Retornar os dados encontrados
  }
  catch(error){
    console.error('Erro ao buscar dados do cliente:', error.message);
    res.status(500).send(error.message);
  }
});

app.get('/getData/fornecedor', async(req, res) => { //buscar dados(FORNECEDORES)
  try{
    const result = await client.query('SELECT * FROM fornecedor ORDER by nomefantasia');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});
app.get('/getData/contatofornecedor/:code', async(req, res) => { //buscar dados(CONTATOS FORNECEDOR)
  const { code } = req.params;

  try{
    const result = await client.query('SELECT * FROM contatofornecedor WHERE codfornecedor = $1 ORDER BY codigo', [code]);
    if(result.rows.length === 0){ //Se não tiver dados
      return res.status(404).json({ message: 'Nenhum dado encontrado para a descrição fornecida.' });
    }
    res.status(200).json(result.rows); // Retornar os dados encontrados
  }
  catch(error){
    console.error('Erro ao buscar dados do cliente:', error.message);
    res.status(500).send(error.message);
  }
});
app.get('/getData/documentofornecedor/:code', async(req, res) => { //buscar dados(DOCUMENTOS FORNECEDOR)
  const { code } = req.params;

  try{
    const result = await client.query('SELECT * FROM documentofornecedor WHERE codfornecedor = $1 ORDER BY codigo', [code]);
    if(result.rows.length === 0){ //Se não tiver dados
      return res.status(404).json({ message: 'Nenhum dado encontrado para a descrição fornecida.' });
    }
    res.status(200).json(result.rows); // Retornar os dados encontrados
  }
  catch(error){
    console.error('Erro ao buscar dados do cliente:', error.message);
    res.status(500).send(error.message);
  }
});

app.get('/getData/grupo', async(req, res) => { //buscar dados(GRUPOS)
  try{
    const result = await client.query('SELECT * FROM grupo ORDER by descricao');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});
app.get('/getData/grupomodulo/:descricao', async (req, res) => { //Buscar dados(MODULOS DO GRUPO)
  const { descricao } = req.params;

  try{
    const result = await client.query('SELECT * FROM grupomodulo WHERE descgrupo = $1 ORDER BY descmodulo', [descricao]);
    if(result.rows.length === 0){
      return res.status(404).json({message: "Nenhum dado encontrada"});
    }
    res.status(200).json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});
app.get('/getData/grupo/:descricao', async (req, res) => {  //Buscar dados(GRUPO ESPECÍFICO)
  const { descricao } = req.params;

  try {
    const result = await client.query('SELECT * FROM grupo WHERE descricao = $1', [descricao]);
    if(result.rows.length === 0){
      return res.status(404).json({ message: 'Nenhum dado encontrado para a descrição fornecida.' });
    }
    res.status(200).json(result.rows[0]);
  }
  catch(error) {
    console.error('Erro ao executar a query:', error.message); // Log do erro
    res.status(500).send(error.message);
  }
});
app.get('/getData/grupos/modulos', async(req, res) => { //buscar dados(GRUPOS - MODULOS DO SISTEMA)
  try{
    const result = await client.query('SELECT * FROM modulo WHERE descricao != $1 ORDER BY descricao', ['GRUPO MÓDULO']);
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

app.get('/getData/insumo', async(req, res) => { //buscar dados(INSUMOS)
  try{
    const result = await client.query('SELECT * FROM insumo ORDER by descricao');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

app.get('/getData/modulo', async(req, res) => { //buscar dados(MODULOS DO SISTEMA)
  try{
    const result = await client.query('SELECT * FROM modulo ORDER by descricao');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

app.get('/getData/pais', async(req, res) => { //buscar dados(PAÍSES)
  try{
    const result = await client.query('SELECT * FROM pais ORDER by descricao');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

//PEDIDOS

app.get('/getData/ramo', async(req, res) => { //buscar dados(RAMOS DE ATIVIDADE)
  try{
    const result = await client.query('SELECT * FROM ramo ORDER by descricao');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

//RECEITAS

app.get('/getData/sensor', async(req, res) => { //buscar dados(SENSORES)
  try{
    const result = await client.query('SELECT * FROM hardware WHERE tipo = $1 ORDER by descricao', ['S']);
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

app.get('/getData/tipodocumento', async(req, res) => { //buscar dados(TIPO DE DOCUMENTO)
  try{
    const result = await client.query('SELECT * FROM tipodocumento ORDER by descricao');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

app.get('/getData/usuario', async(req, res) => { //buscar dados(USUÁRIOS)
  try{
    const result = await client.query('SELECT * FROM usuario ORDER by nome');
    res.json(result.rows);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

/*Métodos POST*/
app.post('/setData/atuador', async(req, res) => { //Inserir em HARDWARE(Atuador)
  const {tipo, descricao, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM hardware WHERE descricao = $1 AND tipo = $2)`, [descricao, tipo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO hardware (tipo, descricao, ativo) VALUES ($1, $2, $3) RETURNING *', [tipo, descricao, ativo]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/bases', async(req, res) => { //Inserir em BASES
  const {descricao, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM bases WHERE descricao = $1)`,[descricao]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO bases (descricao, ativo) VALUES ($1, $2) RETURNING *',[descricao, ativo]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/cidade', async(req, res) => { //Inserir em CIDADES
  const {descricao, uf, ddd} = req.body;
  try{
    //Verifica se já existe
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM cidade WHERE descricao = $1 AND uf = $2)`,[descricao, uf]);
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO cidade (descricao, uf, ddd) VALUES ($1, $2, $3) RETURNING *',[descricao, uf, ddd]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/cliente', async(req, res) => { //Inserir em CLIENTES
  const {razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cpf, cnpj, codramo, descramo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 from cliente WHERE (razaosocial = $1 OR nomefantasia = $2 OR (telefonefixo1 = $3 OR telefonefixo2 = $4 OR telefonefixo1 = $4 OR telefonefixo2 = $3) OR (telefonecelular1 = $5 OR telefonecelular2 = $6 OR telefonecelular1 = $6 OR telefonecelular2 = $5) OR (email1 = $7 OR email2 = $8 OR email1 = $8 OR email2 = $7) OR site = $9 OR cpf = $10 or cnpj = $11))`, [razaosocial, nomefantasia, telefonefixo1, telefonefixo2, telefonecelular1, telefonecelular2, email1, email2, site, cpf, cnpj]);
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query('INSERT INTO cliente (razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cpf, cnpj, codramo, descramo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *',[razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cpf, cnpj, codramo, descramo]); 
    res.status(201).json(result.rows[0]);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});
app.post('/setData/contatocliente', async(req, res) => { //Inserir em CONTATOS CLIENTE
  const {codcliente, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM contatocliente WHERE (nomecontato = $1 OR emailcontato = $2 OR celularcontato = $3 OR fixocontato = $4))`, [nomecontato, emailcontato, celularcontato, fixocontato]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query('INSERT INTO contatocliente (codcliente, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',[codcliente, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo]); 
    res.status(201).json(result.rows[0]);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});
app.post('/setData/documentocliente', async(req, res) => { //Inserir em DOCUMENTOS CLIENTE
  const {codcliente, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao} = req.body;
  try{
    const result = await client.query('INSERT INTO documentocliente (codcliente, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',[codcliente, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao]); 
    res.status(201).json(result.rows[0]);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/fornecedor', async(req, res) => { //Inserir em FORNECEDORES
  const {razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cnpj} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 from fornecedor WHERE (razaosocial = $1 OR nomefantasia = $2 OR (telefonefixo1 = $3 OR telefonefixo2 = $4 OR telefonefixo1 = $4 OR telefonefixo2 = $3) OR (telefonecelular1 = $5 OR telefonecelular2 = $6 OR telefonecelular1 = $6 OR telefonecelular2 = $5) OR (email1 = $7 OR email2 = $8 OR email1 = $8 OR email2 = $7) OR site = $9 OR cnpj = $10))`, [razaosocial, nomefantasia, telefonefixo1, telefonefixo2, telefonecelular1, telefonecelular2, email1, email2, site, cnpj]);
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query('INSERT INTO fornecedor (razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cnpj) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',[razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cnpj]); 
    res.status(201).json(result.rows[0]);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});
app.post('/setData/contatofornecedor', async(req, res) => { //Inserir em CONTATOS FORNECEDOR
  const {codfornecedor, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM contatofornecedor WHERE (nomecontato = $1 OR emailcontato = $2 OR celularcontato = $3 OR fixocontato = $4))`, [nomecontato, emailcontato, celularcontato, fixocontato]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query('INSERT INTO contatofornecedor (codfornecedor, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',[codfornecedor, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo]); 
    res.status(201).json(result.rows[0]);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});
app.post('/setData/documentofornecedor', async(req, res) => { //Inserir em DOCUMENTOS FORNECEDOR
  const {codfornecedor, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao} = req.body;
  try{
    const result = await client.query('INSERT INTO documentofornecedor (codfornecedor, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',[codfornecedor, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao]); 
    res.status(201).json(result.rows[0]);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/grupo', async(req, res) => { //Inserir em GRUPOS
  const {descricao} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM grupo WHERE descricao = $1)`,[descricao]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO grupo (descricao) VALUES ($1) RETURNING *',[descricao]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});
app.post('/setData/grupomodulo', async(req, res) => { //Inserir em MODULOS DO GRUPO
  const {codgrupo, descgrupo, codmodulo, descmodulo, podegravar, podeexcluir, podealterar, podeacessar} = req.body;
  try{
    const result = await client.query('INSERT INTO grupomodulo (codgrupo, descgrupo, codmodulo, descmodulo, podegravar, podeexcluir, podealterar, podeacessar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [codgrupo, descgrupo, codmodulo, descmodulo, podegravar, podeexcluir, podealterar, podeacessar]);
    res.status(201).json(result.rows[0]);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/insumo', async(req, res) => { //Inserir em INSUMOS
  const {descricao, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM insumo WHERE descricao = $1)`,[descricao]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO insumo (descricao, ativo) VALUES ($1, $2) RETURNING *',[descricao, ativo]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/modulo', async(req, res) => { //Inserir em MODULOS DO SISTEMA
  const {descricao, menu} = req.body;

  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM modulo WHERE descricao = $1)`,[descricao]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO modulo (descricao, menu) VALUES ($1, $2) RETURNING *',[descricao, menu]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/pais', async(req, res) => { //Inserir em PAÍSES
  const {descricao} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM pais WHERE descricao = $1)`,[descricao]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO pais (descricao) VALUES ($1) RETURNING *',[descricao]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

//PEDIDOS

app.post('/setData/ramo', async(req, res) => { //Inserir em RAMOS
  const {descricao} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM ramo WHERE descricao = $1)`,[descricao]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO ramo (descricao) VALUES ($1) RETURNING *',[descricao]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

//RECEITAS

app.post('/setData/sensor', async(req, res) => { //Inserir em HARDWARE(Sensor)
  const {tipo, descricao, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM hardware WHERE descricao = $1 AND tipo = $2)`, [descricao, tipo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO hardware (tipo, descricao, ativo) VALUES ($1, $2, $3) RETURNING *', [tipo, descricao, ativo]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/tipodocumento', async(req, res) => { //Inserir em TIPO DE DOCUMENTO
  const {descricao} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM tipodocumento WHERE descricao = $1)`,[descricao]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO tipodocumento (descricao) VALUES ($1) RETURNING *',[descricao]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

app.post('/setData/usuario', async(req, res) => { //Inserir em USUÁRIOS
  const {loginusuario, nome, descgrupo, codgrupo, ativo, senha} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM usuario WHERE loginusuario = $1)`,[loginusuario]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    else{ //Senão
      const result = await client.query('INSERT INTO usuario (loginusuario, nome, descgrupo, codgrupo, ativo, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[loginusuario, nome, descgrupo, codgrupo, ativo, senha]); 
      res.status(201).json(result.rows[0]);
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir dados no banco.' });
  }
});

/*Métodos PUT*/
app.put('/updateData/atuador/:codigo', async(req, res) => { //ATUADORES
  const {codigo} = req.params;
  const {tipo, descricao, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM hardware WHERE descricao = $1 AND tipo = $2 AND codigo != $3)`,[descricao, tipo, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE hardware SET descricao = $1, ativo = $2 WHERE codigo = $3 RETURNING *`, [descricao, ativo, codigo]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/bases/:codigo', async(req, res) => { //BASES
  const {codigo} = req.params;
  const {descricao, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM bases WHERE descricao = $1 AND codigo != $2)`,[descricao, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE bases SET descricao = $1, ativo = $2 WHERE codigo = $3 RETURNING *`, [descricao, ativo, codigo]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/cidade/:codigo', async(req, res) => { //CIDADES
  const {codigo} = req.params;
  const {descricao, uf, ddd} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM cidade WHERE descricao = $1 AND uf = $2 AND codigo != $3)`,[descricao, uf, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE cidade SET descricao = $1, uf = $2, ddd = $3 WHERE codigo = $4 RETURNING *`, [descricao, uf, ddd, codigo]);
    await client.query(`UPDATE cliente SET nomecidade = $1 WHERE codcidade = $2 RETURNING *`, [descricao, codigo]); //Atualiza CLIENTES
    await client.query(`UPDATE fornecedor SET nomecidade = $1 WHERE codcidade = $2 RETURNING *`, [descricao, codigo]); //Atualiza FORNECEDORES
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/cliente/:codigo', async(req, res) => { //CLIENTES
  const {codigo} = req.params;
  const {razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cpf, cnpj, codramo, descramo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 from cliente WHERE (razaosocial = $2 OR nomefantasia = $3 OR (telefonefixo1 = $4 OR telefonefixo2 = $5 OR telefonefixo1 = $5 OR telefonefixo2 = $4) OR (telefonecelular1 = $6 OR telefonecelular2 = $7 OR telefonecelular1 = $7 OR telefonecelular2 = $6) OR (email1 = $8 OR email2 = $9 OR email1 = $9 OR email2 = $8) OR site = $10 OR cpf = $11 or cnpj = $12) AND codigo != $1)`,[codigo, razaosocial, nomefantasia, telefonefixo1, telefonefixo2, telefonecelular1, telefonecelular2, email1, email2, site, cpf, cnpj]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    await client.query(`UPDATE contatocliente SET nomefantasia = $2 WHERE codcliente = $1 RETURNING *`, [codigo, nomefantasia]); //Atualiza CONTATOS CLIENTE
    const result = await client.query(`UPDATE cliente SET razaosocial = $2, ativo = $3, nomefantasia = $4, codpais = $5, descpais = $6, codcidade = $7, nomecidade = $8, endereco = $9, cep = $10, telefonefixo1 = $11, telefonecelular1 = $12, telefonefixo2 = $13, telefonecelular2 = $14, email1 = $15, email2 = $16, site = $17, cpf = $18, cnpj = $19, codramo = $20, descramo = $21 WHERE codigo = $1 RETURNING *`, [codigo, razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cpf, cnpj, codramo, descramo]);    res.status(200).json(result.rows[0]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});
app.put('/updateData/contatocliente/:codigo', async(req, res) => { //CONTATOS CLIENTE
  const {codigo} = req.params;
  const {codcliente, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM contatocliente WHERE ((codcliente = $2 OR nomecontato = $3 OR emailcontato = $4 OR celularcontato = $5 OR fixocontato = $6) AND codigo != $1)`, [codigo, codcliente, nomecontato, emailcontato, celularcontato, fixocontato]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE contatocliente SET codcliente = $2, nomefantasia = $3, nomecontato = $4, emailcontato = $5, ramalcontato = $6, celularcontato = $7, fixocontato = $8, cargocontato = $9, ativo = $10 WHERE codigo = $1 RETURNING *`, [codigo, codcliente, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});
app.put('/updateData/documentocliente/:codigo', async(req, res) => { //DOCUMENTOS CLIENTE
  const {codigo} = req.params;
  const {codcliente, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao} = req.body;
  try{
    const result = await client.query(`UPDATE documentocliente SET codcliente = $2, datacriacaodocumento = $3, datacriacaodocumentostr = $4, horacriacaodocumento = $5, codtipodocumento = $6, desctipodocumento = $7, nomeresponsavelcriacao = $8, descricaodocumento = $9, arquivodocumento = $10, validadedocumento = $11, validadedocumentostr = $12, senhadocumento = $13, valordocumento = $14, ativo = $15, loginresponsavelcriacao = $16 WHERE codigo = $1 RETURNING *`, [codigo, codcliente, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/fornecedor/:codigo', async(req, res) => { //FORNECEDORES
  const {codigo} = req.params;
  const {razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cnpj} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 from fornecedor WHERE (razaosocial = $2 OR nomefantasia = $3 OR (telefonefixo1 = $4 OR telefonefixo2 = $5 OR telefonefixo1 = $5 OR telefonefixo2 = $4) OR (telefonecelular1 = $6 OR telefonecelular2 = $7 OR telefonecelular1 = $7 OR telefonecelular2 = $6) OR (email1 = $8 OR email2 = $9 OR email1 = $9 OR email2 = $8) OR site = $10 OR cnpj = $11) AND codigo != $1)`,[codigo, razaosocial, nomefantasia, telefonefixo1, telefonefixo2, telefonecelular1, telefonecelular2, email1, email2, site, cnpj]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    await client.query(`UPDATE contatofornecedor SET nomefantasia = $2 WHERE codfornecedor = $1 RETURNING *`, [codigo, nomefantasia]); //Atualiza CONTATOS FORNECEDOR
    const result = await client.query(`UPDATE fornecedor SET razaosocial = $2, ativo = $3, nomefantasia = $4, codpais = $5, descpais = $6, codcidade = $7, nomecidade = $8, endereco = $9, cep = $10, telefonefixo1 = $11, telefonecelular1 = $12, telefonefixo2 = $13, telefonecelular2 = $14, email1 = $15, email2 = $16, site = $17, cnpj = $18 WHERE codigo = $1 RETURNING *`, [codigo, razaosocial, ativo, nomefantasia, codpais, descpais, codcidade, nomecidade, endereco, cep, telefonefixo1, telefonecelular1, telefonefixo2, telefonecelular2, email1, email2, site, cnpj]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});
app.put('/updateData/contatofornecedor/:codigo', async(req, res) => { //CONTATOS FORNECEDOR
  const {codigo} = req.params;
  const {codfornecedor, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM contatofornecedor WHERE (codfornecedor = $2 OR nomecontato = $3 OR emailcontato = $4 OR celularcontato = $5 OR fixocontato = $6) AND codigo != $1)`, [codigo, codfornecedor, nomecontato, emailcontato, celularcontato, fixocontato, ramalcontato]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE contatofornecedor SET codfornecedor = $2, nomefantasia = $3, nomecontato = $4, emailcontato = $5, ramalcontato = $6, celularcontato = $7, fixocontato = $8, cargocontato = $9, ativo = $10 WHERE codigo = $1 RETURNING *`, [codigo, codfornecedor, nomefantasia, nomecontato, emailcontato, ramalcontato, celularcontato, fixocontato, cargocontato, ativo]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});
app.put('/updateData/documentofornecedor/:codigo', async(req, res) => { //DOCUMENTOS FORNECEDOR
  const {codigo} = req.params;
  const {codfornecedor, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao} = req.body;
  try{
    const result = await client.query(`UPDATE documentofornecedor SET codfornecedor = $2, datacriacaodocumento = $3, datacriacaodocumentostr = $4, horacriacaodocumento = $5, codtipodocumento = $6, desctipodocumento = $7, nomeresponsavelcriacao = $8, descricaodocumento = $9, arquivodocumento = $10, validadedocumento = $11, validadedocumentostr = $12, senhadocumento = $13, valordocumento = $14, ativo = $15, loginresponsavelcriacao = $16 WHERE codigo = $1 RETURNING *`, [codigo, codfornecedor, datacriacaodocumento, datacriacaodocumentostr, horacriacaodocumento, codtipodocumento, desctipodocumento, nomeresponsavelcriacao, descricaodocumento, arquivodocumento, validadedocumento, validadedocumentostr, senhadocumento, valordocumento, ativo, loginresponsavelcriacao]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/grupo/:codigo', async(req, res) => { //GRUPOS
  const {codigo} = req.params;
  const {descricao} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM grupo WHERE descricao = $1 AND codigo != $2)`,[descricao, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE grupo SET descricao = $1 WHERE codigo = $2 RETURNING *`, [descricao, codigo]);
    await client.query(`UPDATE grupomodulo SET descgrupo = $1 WHERE codgrupo = $2 RETURNING *`, [descricao, codigo]); //Atualiza MODULOS DO GRUPO
    await client.query(`UPDATE usuario SET descgrupo = $1 WHERE codgrupo = $2 RETURNING *`, [descricao, codigo]); //Atualiza USUÁRIOS
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/insumo/:codigo', async(req, res) => { //INSUMOS
  const {codigo} = req.params;
  const {descricao, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM insumo WHERE descricao = $1 AND codigo != $2)`,[descricao, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE insumo SET descricao = $1 ativo = $2 WHERE codigo = $3 RETURNING *`, [descricao, ativo, codigo]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/modulo/:codigo', async(req, res) => { //MODULOS DO SISTEMA
  const {codigo} = req.params;
  const {descricao, menu} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM modulo WHERE descricao = $1 AND codigo != $2)`,[descricao, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE modulo SET descricao = $1, menu = $2 WHERE codigo = $3 RETURNING *`, [descricao, menu, codigo]);
    await client.query(`UPDATE grupomodulo SET descmodulo = $1 WHERE codmodulo = $2 RETURNING *`, [descricao, codigo]); //Atualiza modulos do grupo
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});
app.put('/updateData/grupomodulo', async(req, res) => { //MODULOS DO GRUPOS
  const {codgrupo, descgrupo, codmodulo, descmodulo, podegravar, podeexcluir, podealterar, podeacessar} = req.body;
  try{
    const result = await client.query(`UPDATE grupomodulo SET descgrupo = $1, podegravar = $2, podeexcluir = $3, podealterar = $4, podeacessar = $5 WHERE codgrupo = $6 AND codmodulo = $7 RETURNING *`, [descgrupo, podegravar, podeexcluir, podealterar, podeacessar, codgrupo, codmodulo]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/pais/:codigo', async(req, res) => { //PAÍSES
  const {codigo} = req.params;
  const {descricao} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM pais WHERE descricao = $1 AND codigo != $2)`,[descricao, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE pais SET descricao = $1 WHERE codigo = $2 RETURNING *`, [descricao, codigo]);
    await client.query(`UPDATE cliente SET descpais = $1 WHERE codpais = $2 RETURNING *`, [descricao, codigo]); //Atualiza CLIENTES
    await client.query(`UPDATE fornecedor SET descpais = $1 WHERE codpais = $2 RETURNING *`, [descricao, codigo]); //Atualiza FORNECEDORES
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

//PEDIDOS

app.put('/updateData/ramo/:codigo', async(req, res) => { //RAMOS
  const {codigo} = req.params;
  const {descricao} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM ramo WHERE descricao = $1 AND codigo != $2)`,[descricao, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE ramo SET descricao = $1 WHERE codigo = $2 RETURNING *`, [descricao, codigo]);
    await client.query(`UPDATE cliente SET descramo = $1 WHERE codramo = $2 RETURNING *`, [descricao, codigo]); //Atualiza CLIENTES
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

//RECEITAS

app.put('/updateData/sensor/:codigo', async(req, res) => { //SENSORES
  const {codigo} = req.params;
  const {tipo, descricao, ativo} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM hardware WHERE descricao = $1 AND tipo = $2 AND codigo != $3)`,[descricao, tipo, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    const result = await client.query(`UPDATE hardware SET descricao = $1, ativo = $2 WHERE codigo = $3 RETURNING *`, [descricao, ativo, codigo]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/tipodocumento/:codigo', async(req, res) => { //TIPO DE DOCUMENTO
  const {codigo} = req.params;
  const {descricao} = req.body;
  try{
    const checkQuery = await client.query(`SELECT EXISTS (SELECT 1 FROM tipodocumento WHERE descricao = $1 AND codigo != $2)`,[descricao, codigo]); //Verifica se já existe
    if(checkQuery.rows[0].exists){ //Se sim
      return res.status(400).json({ error: 'Dados já cadastrados' });  
    }
    await client.query(`UPDATE documentocliente SET desctipodocumento = $2 WHERE codtipodocumento = $1 RETURNING *`, [codigo, descricao]); //Atualiza DOCUMENTOS CLIENTE
    await client.query(`UPDATE documentofornecedor SET desctipodocumento = $2 WHERE codtipodocumento = $1 RETURNING *`, [codigo, descricao]); //Atualiza DOCUMENTOS FORNECEDOR
    const result = await client.query(`UPDATE tipodocumento SET descricao = $1 WHERE codigo = $2 RETURNING *`, [descricao, codigo]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

app.put('/updateData/usuario/:loginusuario', async(req, res) => { //USUÁRIOS
  const {loginusuario} = req.params;
  const {nome, descgrupo, codgrupo, ativo, senha} = req.body;
  try{
    await client.query(`UPDATE documentocliente SET nomeresponsavelcriacao = $2 WHERE loginresponsavelcriacao = $1 RETURNING *`, [loginusuario, nome]); //Atualiza DOCUMENTOS CLIENTE
    await client.query(`UPDATE documentofornecedor SET nomeresponsavelcriacao = $2 WHERE loginresponsavelcriacao = $1 RETURNING *`, [loginusuario, nome]); //Atualiza DOCUMENTOS FORNECEDOR
    const result = await client.query(`UPDATE usuario SET nome = $2, descgrupo = $3, codgrupo = $4, ativo = $5, senha = $6 WHERE loginusuario = $1 RETURNING *`, [loginusuario, nome, descgrupo, codgrupo, ativo, senha]);
    res.status(200).json(result.rows[0]);
  }
  catch(error){
    console.log(error);
    res.status(500).send("Erro ao atualizar item");
  }
});

/*Métodos DELETE*/
app.delete('/deleteData/atuador/:codigo', async(req, res) => { //ATUADORES
  const {codigo} = req.params;
  try{
    await client.query(`DELETE FROM hardware WHERE codigo = $1`, [codigo]);
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/bases/:codigo', async(req, res) => { //BASES
  const {codigo} = req.params;
  try{
    await client.query(`DELETE FROM bases WHERE codigo = $1`, [codigo]);
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/cidade/:codigo', async(req, res) => { //CIDADES
  const {codigo} = req.params;
  try{
    let dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM cliente WHERE codcidade = $1;`, [codigo]); //Verifica CLIENTES
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se existirem dados relacionados
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM fornecedor WHERE codcidade = $1;`, [codigo]); //Verifica FORNECEDORES
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se existirem dados relacionados
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    await client.query(`DELETE FROM cidade WHERE codigo = $1`, [codigo]);
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/cliente/:codigo', async(req, res) => { //CLIENTES
  const {codigo} = req.params;
  try{
    const result = await client.query(`SELECT COUNT(*) AS total FROM cliente WHERE codigo = $1`, [codigo]);
    if(result.rows[0].total === 0){ //Se Não encontrou dados
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    await client.query(`DELETE FROM contatocliente WHERE codcliente = $1`, [codigo]); //Deleta contatos associados
    await client.query(`DELETE FROM documentocliente WHERE codcliente = $1`, [codigo]); //Deleta documentos associados
    await client.query(`DELETE FROM cliente WHERE codigo = $1`, [codigo]); //Deleta CLIENTE
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
    console.log(error.message);
  }
});
app.delete('/deleteData/contatocliente/:codigo', async(req, res) => { //CONTATOS CLIENTE
  const {codigo} = req.params;
  try{
    result = await client.query(`DELETE FROM contatocliente WHERE codigo = $1`, [codigo]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});
app.delete('/deleteData/documentocliente/:codigo', async(req, res) => { //CONTATOS CLIENTE
  const {codigo} = req.params;
  try{
    result = await client.query(`DELETE FROM documentocliente WHERE codigo = $1`, [codigo]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/fornecedor/:codigo', async(req, res) => { //FORNECEDORES
  const {codigo} = req.params;
  try{
    const result = await client.query(`SELECT COUNT(*) AS total FROM fornecedor WHERE codigo = $1`, [codigo]);
    if(result.rows[0].total === 0){ //Se Não encontrou dados
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    await client.query(`DELETE FROM contatofornecedor WHERE codfornecedor = $1`, [codigo]); //Deleta contatos associados
    await client.query(`DELETE FROM documentofornecedor WHERE codfornecedor = $1`, [codigo]); //Deleta documentos associados
    await client.query(`DELETE FROM fornecedor WHERE codigo = $1`, [codigo]); //Deleta FORNECEDOR
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});
app.delete('/deleteData/contatofornecedor/:codigo', async(req, res) => { //CONTATOS FORNECEDOR
  const {codigo} = req.params;
  try{
    result = await client.query(`DELETE FROM contatofornecedor WHERE codigo = $1`, [codigo]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});
app.delete('/deleteData/documentofornecedor/:codigo', async(req, res) => { //DOCUMENTOS FORNECEDOR
  const {codigo} = req.params;
  try{
    result = await client.query(`DELETE FROM documentofornecedor WHERE codigo = $1`, [codigo]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/grupo/:codigo', async(req, res) => { //GRUPOS
  const {codigo} = req.params;
  try{
    const dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM usuario WHERE codgrupo = $1;`, [codigo]); //Verifica USUÁRIOS
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se existirem dados relacionados
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
      await client.query(`DELETE FROM grupo WHERE codigo = $1`, [codigo]);
      await client.query(`DELETE FROM grupomodulo WHERE codgrupo = $1`, [codigo]); //Deleta os modulos associados ao grupo
      return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/insumo/:codigo', async(req, res) => { //INSUMOS
  const {codigo} = req.params;
  try{
    result = await client.query(`DELETE FROM insumo WHERE codigo = $1`, [codigo]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/modulo/:codigo', async(req, res) => { //MODULOS DO SISTEMA
  const {codigo} = req.params;
  try{
    let dadosRelacionados;
    dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM grupomodulo WHERE codmodulo = $1;`, [codigo]); //Verificar GRUPO MÓDULOS
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se existirem dados relacionado
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    await client.query(`DELETE FROM modulo WHERE codigo = $1`, [codigo]);
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/pais/:codigo', async(req, res) => { //PAÍSES
  const {codigo} = req.params;
  try{
    let dadosRelacionados;
    dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM cliente WHERE codpais = $1;`, [codigo]); //Verificar CLIENTES
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se existirem dados relacionado
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM fornecedor WHERE codpais = $1;`, [codigo]); //Verifica FORNECEDORES
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se existirem dados relacionado
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    await client.query(`DELETE FROM pais WHERE codigo = $1`, [codigo]);
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

//PEDIDOS

app.delete('/deleteData/ramo/:codigo', async(req, res) => { //RAMOS DE ATIVIDADE
  const {codigo} = req.params;
  try{
    const dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM cliente WHERE codramo = $1;`, [codigo]); //Verificar CLIENTES
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se existirem dados relacionado
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    const result = await client.query(`DELETE FROM ramo WHERE codigo = $1`, [codigo]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

//RECEITAS

app.delete('/deleteData/sensor/:codigo', async(req, res) => { //SENSORES
  const {codigo} = req.params;
  try{
    const result = await client.query(`DELETE FROM hardware WHERE codigo = $1`, [codigo]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/tipodocumento/:codigo', async(req, res) => { //TIPO DE DOCUMENTO 
  const {codigo} = req.params;
  try{
    let dadosRelacionados;
    dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM documentocliente WHERE codtipodocumento = $1;`, [codigo]); //Verificar DOCUMENTOS CLIENTE
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se não for possível
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM documentofornecedor WHERE codtipodocumento = $1;`, [codigo]); //Verificar DOCUMENTOS FORNECEDOR
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se não for possível
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    const result = await client.query(`DELETE FROM tipodocumento WHERE codigo = $1`, [codigo]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    console.log(error);
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

app.delete('/deleteData/usuario/:loginusuario', async(req, res) => { //USUÁRIOS
  const {loginusuario} = req.params;
  try{
    let dadosRelacionados;
    dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM documentocliente WHERE loginresponsavelcriacao = $1;`, [loginusuario]); //Verificar DOCUMENTOS CLIENTE
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se não for possível
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    dadosRelacionados = await client.query(`SELECT COUNT(*) AS total FROM documentofornecedor WHERE loginresponsavelcriacao = $1;`, [loginusuario]); //Verificar DOCUMENTOS FORNECEDOR
    if(parseInt(dadosRelacionados.rows[0].total, 10) > 0){ //Se não for possível
      return res.status(400).json({sucess: false, message: `Existem dados relacionados`});
    }
    const result = await client.query(`DELETE FROM usuario WHERE loginusuario = $1`, [loginusuario]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Nehum dado encontrado"});
    }
    return res.status(200).json({message: "Dado deletado com sucesso!"});
  }
  catch(error){
    res.status(500).json({success: false, message: 'Erro ao excluir.', error: error.message});
  }
});

/*Inicia o servidor*/
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});