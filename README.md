# Cadastro de carros

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.
Deve ser possível listar todos os carros disponíveis pela marca.
Deve ser possível listar todos os carros disponíveis pela categoria.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RNF**

**RN**
Não deve ser possível cadastar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com disponibilidade por padrão.
O usuário responsável pelo cadastro deve ser um administrador.

# Listagem de carros 
**RF**
Deve ser possível listar todos os carros disponíveis.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RNF**
Não deva ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
O usuário responsável pelo cadastro deve ser um administrador.

# Cadastro de imagem do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Ultilizar o Multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um administrador.


# Alugel de carro 
**RF**
Deve ser possível cadastrar cadatrar um alugel

**RN**
O alugel deve ter duração miníma de 24 horas.
Não deve ser possível cadastrar um novo alugel caso já exista um aberto para o mesmo carro
Não deve ser possível cadastrar um novo alugel caso já exista um aberto para um mesmo
usuário.