CREATE DATABASE TechVagas;

USE TechVagas;

CREATE TABLE usuario (      -- Criada
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo enum('Estudante', 'Recrutador', 'Especialista') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status enum("A", "I") DEFAULT "A"
);

CREATE TABLE formacao ( -- Criado
    id_formacao INT AUTO_INCREMENT PRIMARY KEY,
    curso VARCHAR(100),
    instituicao VARCHAR(150),
    semestre INT,
    data_inicio DATE,
    data_termino DATE,
    turno VARCHAR(20),
    fk_id_usuario INT NOT NULL,
    
    CONSTRAINT fk_formacao_usuario FOREIGN KEY (fk_id_usuario) references usuario(id_usuario)
);

CREATE TABLE Endereco ( -- Criado
    id_endereco INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(10),
    logradouro VARCHAR(150),
    complemento VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    fk_id_usuario INT NOT NULL,

    CONSTRAINT fk_endereco_usuario
        FOREIGN KEY (fk_id_usuario)
        REFERENCES usuario(id_usuario)
);

-- Usuario

INSERT INTO usuario (nome, email, senha, tipo, data_cadastro) 
VALUES('Ana Santos', 'ana.santos@email.com', 'senhaAna123', 'Estudante', '2024-01-15'),
('Bruno Oliveira', 'bruno.oliveira@email.com', 'brunoPass12', 'Estudante', '2024-02-10'),
('Carla Mendes', 'carla.mendes@email.com', 'carlaM2024', 'Estudante', '2024-03-05'),
('Diego Ribeiro', 'diego.ribeiro@email.com', 'diegorib2024', 'Estudante', '2024-04-20'),
('Érika Carvalho', 'erika.carvalho@email.com', 'erikaC@2024', 'Estudante', '2024-05-12'),
('Fábio Lima', 'fabio.lima@email.com', 'fabioLima20', 'Estudante', '2024-06-18'),
('Gabriela Ferreira', 'gabriela.ferreira@email.com', 'gabFerreira', 'Estudante', '2024-07-22'),
('Lucas Andrade', 'lucas.andrade@email.com', 'lucasAndr12', 'Estudante', '2024-08-30'),
('Mariana Souza', 'mariana.souza@email.com', 'mariSouza19', 'Estudante', '2024-09-14'),
('Pedro Martins', 'pedro.martins@email.com', 'pedroM2024', 'Estudante', '2024-10-01'),
('Juliana Costa', 'juliana.costa@email.com', 'julianaC123', 'Recrutador', '2024-11-11'),
('Rafael Gomes', 'rafael.gomes@email.com', 'rafaelG@2024', 'Especialista', '2024-12-05'),
('Patrícia Nunes', 'patricia.nunes@email.com', 'patyNunes20', 'Estudante', '2025-01-09'),
('Thiago Barbosa', 'thiago.barbosa@email.com', 'thiagoBpass', 'Recrutador', '2025-02-17'),
('Fernanda Alves', 'fernanda.alves@email.com', 'fernandaA12', 'Especialista', '2025-03-21'),
('Rodrigo Alves', 'rodrigo.alves@email.com', 'rodrigoA2025', 'Recrutador', '2025-04-10'),
('Simone Batista', 'simone.batista@email.com', 'simoneBpass', 'Recrutador', '2025-05-02'),
('André Cunha', 'andre.cunha@email.com', 'andreCunha19', 'Especialista', '2025-05-15'),
('Luciana Prado', 'luciana.prado@email.com', 'lucianaP@2025', 'Especialista', '2025-05-09'),
('Marcelo Tavares', 'marcelo.tavares@email.com', 'marceloT123', 'Recrutador', '2025-05-12'),
('Sofia Martins', 'sofia.martins@email.com', 'sofiaM2025', 'Estudante', '2025-06-15'),
('Henrique Duarte', 'henrique.duarte@email.com', 'henriqueD2025', 'Recrutador', '2025-06-01'),
('Gustavo Almeida', 'gustavo.almeida@email.com', 'gustavoApass', 'Estudante', '2025-06-17'),
('Isabela Rocha', 'isabela.rocha@email.com', 'isabelaRpass', 'Recrutador', '2025-06-03'),
('Beatriz Silva', 'beatriz.silva@email.com', 'biaSilva123', 'Estudante', '2025-06-19'),

('Maurício Pires', 'mauricio.pires@email.com', 'mauricioP123', 'Estudante', '2026-06-07'),
('Natália Correia', 'natalia.correia@email.com', 'natCorreia20', 'Estudante', '2026-06-07'),
('Felipe Barros', 'felipe.barros@email.com', 'felipeB@2025', 'Recrutador', '2026-06-07'),
('Camila Teixeira', 'camila.teixeira@email.com', 'camilaT2025', 'Recrutador', '2026-06-07'),
('Renato Moreira', 'renato.moreira@email.com', 'renatoMpass', 'Recrutador', '2026-06-07');

INSERT INTO usuario (nome, email, senha, tipo, status) VALUES
('Ana Silva', 'ana.silva@email.com', 'senha123', 'Estudante', 'A'),
('Carlos Souza', 'carlos.souza@email.com', 'senha456', 'Recrutador', 'A'),
('Mariana Costa', 'mariana.costa@email.com', 'senha789', 'Especialista', 'I'),
('João Pereira', 'joao.pereira@email.com', 'senha321', 'Estudante', 'A'),
('Fernanda Lima', 'fernanda.lima@email.com', 'senha654', 'Recrutador', 'A');

-- Observação quando se faz um cadastro pelo frontend a senha já é gerada com hash 

-- Formacao

INSERT INTO formacao (curso, instituicao, semestre, data_inicio, data_termino, turno, fk_id_usuario)
VALUES('Analise e Desenvolvimento de Sistemas', 'TechVagas College', 3, '2024-02-01', '2027-12-31', 'Manha', 1),
('Desenvolvimento de Software Multiplataforma', 'TechVagas College', 2, '2024-02-01', '2027-12-31', 'Noite', 2),
('Gestao da Producao Industrial', 'TechVagas College', 4, '2024-02-01', '2027-12-31', 'Manha', 3),
('Gestao de Recursos Humanos', 'TechVagas College', 5, '2024-02-01', '2027-12-31', 'Noite', 4),
('Gestao Empresarial', 'TechVagas College', 6, '2024-02-01', '2027-12-31', 'Manha', 5),
('Analise e Desenvolvimento de Sistemas', 'TechVagas College', 3, '2024-02-01', '2027-12-31', 'Noite', 6),
('Desenvolvimento de Software Multiplataforma', 'TechVagas College', 2, '2024-02-01', '2027-12-31', 'Noite', 7),
('Gestao da Producao Industrial', 'TechVagas College', 4, '2024-02-01', '2027-12-31', 'Manha', 8),
('Gestao de Recursos Humanos', 'TechVagas College', 5, '2024-02-01', '2027-12-31', 'Noite', 9),
('Gestao Empresarial', 'TechVagas College', 6, '2024-02-01', '2027-12-31', 'Manha', 10),
('Analise e Desenvolvimento de Sistemas', 'TechVagas College', 3, '2024-02-01', '2027-12-31', 'Manha', 11),
('Desenvolvimento de Software Multiplataforma', 'TechVagas College', 2, '2024-02-01', '2027-12-31', 'Noite', 12),
('Gestao da Producao Industrial', 'TechVagas College', 4, '2024-02-01', '2027-12-31', 'Manha', 13),
('Gestao de Recursos Humanos', 'TechVagas College', 5, '2024-02-01', '2027-12-31', 'Noite', 14),
('Gestao Empresarial', 'TechVagas College', 6, '2024-02-01', '2027-12-31', 'Manha', 15),
('Analise e Desenvolvimento de Sistemas', 'TechVagas College', 3, '2024-02-01', '2027-12-31', 'Noite', 16),
('Desenvolvimento de Software Multiplataforma', 'TechVagas College', 2, '2024-02-01', '2027-12-31', 'Noite', 17),
('Gestao da Producao Industrial', 'TechVagas College', 4, '2024-02-01', '2027-12-31', 'Manha', 18),
('Gestao de Recursos Humanos', 'TechVagas College', 5, '2024-02-01', '2027-12-31', 'Noite', 19),
('Gestao Empresarial', 'TechVagas College', 6, '2024-02-01', '2027-12-31', 'Manha', 20),
('Analise e Desenvolvimento de Sistemas', 'TechVagas College', 3, '2024-02-01', '2027-12-31', 'Noite', 21),
('Desenvolvimento de Software Multiplataforma', 'TechVagas College', 2, '2024-02-01', '2027-12-31', 'Noite', 22),
('Gestao da Producao Industrial', 'TechVagas College', 4, '2024-02-01', '2027-12-31', 'Manha', 23),
('Gestao de Recursos Humanos', 'TechVagas College', 5, '2024-02-01', '2027-12-31', 'Noite', 24),
('Gestao Empresarial', 'TechVagas College', 6, '2024-02-01', '2027-12-31', 'Manha', 25),

('Analise e Desenvolvimento de Sistemas', 'TechVagas College', 3, '2024-02-01', '2027-12-31', 'Noite', 26),
('ADS', 'Fatec', 3, '2025-02-01', '2028-12-31', 'Noite', 27),
('GRH', 'Fatec', 4, '2024-02-01', '2027-07-31', 'Manha', 28),
('GE', 'Fatec', 2, '2026-08-06', '2028-07-31', 'Noite', 29),
('GE', 'Fatec', 1, '2026-02-06', '2029-12-31', 'Manha', 30);

INSERT INTO formacao (curso, instituicao, semestre, data_inicio, data_termino, turno, fk_id_usuario) VALUES
('Engenharia de Software', 'USP', 6, '2022-02-01', '2026-12-15', 'Noturno', 1),
('Administração', 'FGV', 4, '2023-02-01', '2027-12-15', 'Matutino', 2),
('Psicologia', 'PUC-SP', 8, '2020-02-01', '2025-12-15', 'Integral', 3),
('Ciência da Computação', 'Unicamp', 2, '2025-02-01', '2029-12-15', 'Noturno', 4),
('Marketing', 'Mackenzie', 5, '2021-02-01', '2025-12-15', 'Vespertino', 5);

-- Endereco

INSERT INTO endereco (cep, logradouro, complemento, numero, bairro, cidade, estado, fk_id_usuario)
VALUES('14400-001','Rua das Flores','Apto 101','10','Centro','Franca','SP',1),
('14400-002','Av Brasil','Bloco A','200','Jardim Aeroporto','Franca','SP',2),
('14440-001','Rua A','Casa','15','Centro','Restinga','SP',3),
('14440-002','Rua B','Casa','20','Centro','Restinga','SP',4),
('14410-001','Rua C','Apto 12','30','Centro','Cristais Paulista','SP',5),
('14400-003','Rua D','Casa','40','Estação','Franca','SP',6),
('14400-004','Rua E','Apto 3','50','Santa Cruz','Franca','SP',7),
('14440-003','Rua F','Casa','60','Centro','Restinga','SP',8),
('14440-004','Rua G','Apto 5','70','Bairro Alto','Restinga','SP',9),
('14410-002','Rua H','Casa','80','Centro','Cristais Paulista','SP',10),
('14400-005','Rua I','Apto 7','90','Cidade Nova','Franca','SP',11),
('14400-006','Rua J','Casa','100','Centro','Franca','SP',12),
('14440-005','Rua K','Apto 2','110','Centro','Restinga','SP',13),
('14440-006','Rua L','Casa','120','Jardim Planalto','Restinga','SP',14),
('14410-003','Rua M','Apto 9','130','Centro','Cristais Paulista','SP',15),
('14400-007','Rua N','Casa','140','Jardim Redentor','Franca','SP',16),
('14400-008','Rua O','Apto 11','150','Centro','Franca','SP',17),
('14440-007','Rua P','Casa','160','Centro','Restinga','SP',18),
('14440-008','Rua Q','Apto 13','170','Vila Nova','Restinga','SP',19),
('14410-004','Rua R','Casa','180','Centro','Cristais Paulista','SP',20),
('14400-009','Rua S','Apto 15','190','Centro','Franca','SP',21),
('14400-010','Rua T','Casa','200','Jardim Lima','Franca','SP',22),
('14440-009','Rua U','Apto 16','210','Centro','Restinga','SP',23),
('14440-010','Rua V','Casa','220','Bairro Novo','Restinga','SP',24),
('14410-005','Rua W','Apto 17','230','Centro','Cristais Paulista','SP',25),
('14400-011','Rua X','Casa','240','Centro','Franca','SP',26),
('14400-012','Rua Y','Apto 18','258','Vila Industrial','Franca','SP',27),
('14440-011','Rua Z','Casa','200','Centro','Restinga','SP',28),
('14440-012','Av Brasil','Apto 19','270','Centro','Restinga','SP',29),
('14410-006','Rua Alpha','Casa','280','Centro','Cristais Paulista','SP',30);

INSERT INTO Endereco (cep, logradouro, complemento, numero, bairro, cidade, estado, fk_id_usuario) VALUES
('14400-000', 'Rua das Flores', 'Apto 12', '123', 'Centro', 'Franca', 'SP', 1),
('01000-000', 'Av. Paulista', 'Sala 45', '2000', 'Bela Vista', 'São Paulo', 'SP', 2),
('22290-000', 'Rua Voluntários da Pátria', 'Casa', '45', 'Botafogo', 'Rio de Janeiro', 'RJ', 3),
('13083-970', 'Av. Albert Einstein', 'Bloco B', '100', 'Cidade Universitária', 'Campinas', 'SP', 4),
('04538-132', 'Rua Joaquim Floriano', 'Cobertura', '789', 'Itaim Bibi', 'São Paulo', 'SP', 5);

-- Vaga

CREATE TABLE vaga (         -- Criada
    id_vaga INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    nome_empresa VARCHAR(150) NOT NULL,     -- Adicionado
    descricao VARCHAR(700) NOT NULL,
    tipo enum('Emprego', 'Estágio') NOT NULL,
    requisitos VARCHAR(300) NOT NULL,
    salario DECIMAL(7,2) NOT NULL,          -- Adicionado
    data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_id_usuario_recrutador INT NOT NULL,
    FOREIGN KEY (fk_id_usuario_recrutador) REFERENCES usuario(id_usuario)
);

-- Candidatura

CREATE TABLE candidatura (
    id_candidatura INT AUTO_INCREMENT PRIMARY KEY,
    data_candidatura DATE DEFAULT CURRENT TIMESTAMP,
    fk_id_usuario_estudante INT NOT NULL,
    fk_id_vaga INT NOT NULL,
    FOREIGN KEY (fk_id_usuario_estudante) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_id_vaga) REFERENCES vaga(id_vaga)
);

-- Depoimento

CREATE TABLE depoimento (
    id_depoimento INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(700) NOT NULL,
    data_depoimento DATE DEFAULT CURRENT TIMESTAMP,
    fk_id_usuario_estudante INT NOT NULL,
    FOREIGN KEY (fk_id_usuario_estudante) REFERENCES usuario(id_usuario)
);

-- Vagas

INSERT INTO vaga(titulo, nome_empresa, descricao, tipo, requisitos, salario,data_publicacao, fk_id_usuario_recrutador) 
VALUES('Desenvolvedor Front-end', 'Tech Solutions', 'Responsável por desenvolver interfaces modernas e funcionais, garantindo a melhor experiência para o usuário. Atuará na construção e manutenção de aplicações web utilizando HTML, CSS, JavaScript e React, colaborando com a equipe para entregar soluções ágeis e de alta qualidade', 'Emprego', 'HTML, CSS, JavaScript., React', '5000.00', '2026-01-02', 11),
('Analista de Dados', 'DataCorp', 'Responsável por coletar, organizar e interpretar grandes volumes de informações, transformando dados em insights estratégicos para apoiar a tomada de decisão. Atuará na criação de relatórios e dashboards com Power BI, além de desenvolver análises utilizando SQL e Python para otimizar processos e gerar valor para o negócio.', 'Emprego', 'SQL, Python, Power BI', '6500.00', '2026-01-05', 14),
('Engenheiro de DevOps', 'CloudOps', 'Responsável por implementar e gerenciar pipelines de CI/CD, garantindo a automação e eficiência dos processos de desenvolvimento. Atuará na administração de ambientes em containers com Docker e Kubernetes, promovendo escalabilidade, segurança e alta disponibilidade das aplicações.', 'Emprego', 'CI/CD, Docker, Kubernetes', '10000.00', '2026-01-17', 16),
('Desenvolvedor Back-end (Node.js)', 'Remote Solutions', 'Responsável por projetar e implementar soluções robustas no lado do servidor, garantindo desempenho, segurança e escalabilidade das aplicações. Atuará no desenvolvimento de APIs e serviços utilizando Node.js e Express, além de trabalhar com bancos de dados relacionais (SQL) e não relacionais (NoSQL) para atender às necessidades do negócio.', 'Emprego', 'Node.js, Express, SQL/NoSQL', '7000.00', '2026-02-01', 17),
('Engenheiro de Machine Learning', 'AI Labs', 'Responsável por desenvolver e implementar modelos de aprendizado de máquina, aplicando técnicas avançadas para resolver problemas complexos e gerar valor estratégico. Atuará na criação e otimização de algoritmos utilizando Python e TensorFlow, além de aplicar práticas de MLOps para garantir escalabilidade, automação e confiabilidade em ambientes de produção.', 'Emprego', 'Python, TensorFlow, MLOps', '12000.00', '2026-02-11', 20),
('Especialista em Segurança da Informação', 'SecurityTech', 'Responsável por identificar vulnerabilidades e garantir a proteção dos sistemas e dados da organização. Atuará na realização de testes de intrusão (pentest), monitoramento de eventos de segurança por meio de soluções SIEM e implementação de práticas de segurança em ambientes de nuvem, assegurando conformidade e resiliência contra ameaças.', 'Emprego', 'Pentest, SIEM, Cloud Security', '11000.00', '2026-02-28', 22),
('Engenheiro de Dados', 'Tech Solutions', 'Responsável por projetar, desenvolver e otimizar pipelines de dados, garantindo a integração eficiente entre diferentes fontes e sistemas. Atuará na construção de processos de ETL, utilização de frameworks como Spark para processamento distribuído e orquestração de fluxos com Airflow, assegurando qualidade, escalabilidade e confiabilidade das informações.', 'Emprego', 'Spark, Airflow, ETL', '9000.00', '2026-03-06', 24),
('UX/UI Designer', 'Creative Studio', 'Responsável por criar interfaces intuitivas e atraentes, alinhando estética e funcionalidade para oferecer a melhor experiência ao usuário. Atuará no desenvolvimento de protótipos e fluxos de navegação utilizando Figma, além de conduzir pesquisas com usuários para validar soluções e aprimorar produtos digitais.', 'Emprego', 'Figma, Prototipação, Pesquisa', '6500.00', '2026-03-14', 26),
('Arquiteto de Software', 'Tech Architects', 'Responsável por definir e evoluir a arquitetura de sistemas complexos, garantindo escalabilidade, desempenho e segurança. Atuará na modelagem de soluções baseadas em microservices, utilização de plataformas em nuvem e aplicação de práticas de Domain-Driven Design (DDD) para alinhar tecnologia às necessidades do negócio.', 'Emprego', 'Microservices, Cloud, DDD', '15000.00', '2026-03-25', 27),
('Estágio em Desenvolvimento Web', 'Remote Solutions', 'Oportunidade para estudantes interessados em iniciar carreira na área de desenvolvimento web. Atuará no apoio à criação e manutenção de páginas e aplicações, utilizando noções de HTML, CSS e JavaScript. Terá contato com boas práticas de programação e desenvolvimento, contribuindo para projetos reais e adquirindo experiência prática.', 'Estágio', 'HTML, CSS, JavaScript (noções)', '1200.00', '2026-04-04', 28),
('Estágio em Suporte de TI', 'HelpDesk Co.', 'Oportunidade para estudantes interessados em iniciar carreira na área de tecnologia. Atuará no suporte a usuários, auxiliando na resolução de problemas relacionados a sistemas operacionais Windows, redes básicas e atendimento técnico. Terá contato direto com boas práticas de suporte e infraestrutura, adquirindo experiência prática em ambiente corporativo.', 'Estágio', 'Windows, redes básicas, atendimento ao usuário', '1000.00', '2026-04-15', 29),
('Estágio em QA / Testes', 'Tech Solutions', 'Oportunidade para estudantes interessados em iniciar carreira na área de qualidade de software. Atuará na execução de testes manuais, elaboração de relatórios e identificação de falhas, contribuindo para a melhoria contínua dos sistemas. É essencial ter atenção a detalhes e disposição para aprender boas práticas de QA em ambiente corporativo.', 'Estágio', 'Testes manuais, relatórios, atenção a detalhes', '1300.00', '2026-04-27', 30);

-- Candidatura
INSERT INTO candidatura(data_candidatura, fk_id_usuario_estudante, fk_id_vaga) 
VALUES('2026-01-28', 10, 1),
('2026-01-15', 13, 2),
('2026-02-03', 21, 3),
('2026-02-20', 23, 4),
('2026-03-01', 25, 5);

-- Depoimento
INSERT INTO depoimento(texto, data_depoimento, fk_id_usuario_estudante)
VALUES('Encontrei meu primeiro estágio em Front-end usando as vagas do site. Foi uma experiência transformadora — aprendi muito e fui efetivada depois de 6 meses.', '2024-08-12', 1),
('Com a orientação das vagas direcionadas, consegui uma posição júnior em backend. O processo seletivo foi ágil e transparente.', '2025-01-22', 2),
('Fiz contato com empresas na área de dados e, em menos de um mês, fui chamado para entrevista. Hoje trabalho como Analista de Dados.', '2024-11-05', 3),
('Plataforma com ótimas vagas e filtros inteligentes — encontrei um emprego remoto em engenharia de software que mudou minha rotina.', '2024-10-30', 4),
('O suporte e as dicas de currículo foram essenciais. Consegui um estágio em UX/UI e já estou trabalhando em projetos reais.', '2025-03-14', 5),
('A curadoria de vagas para iniciantes fez toda a diferença. Passei de freelancer para CLT em uma empresa que admiro.', '2025-01-18', 6),
('Usei as dicas de currículo e a plataforma para encontrar vagas alinhadas ao meu perfil. Em duas semanas, fui chamado para entrevista e hoje sou Dev Junior.', '2025-07-02', 7),
('As vagas remotas facilitavam conciliar meus estudos. Consegui um estágio em Data Science e aprendi a trabalhar com projetos reais.', '2024-12-10', 8),
('A plataforma tinha várias oportunidades para quem busca transição de carreira. Passei de suporte técnico para Analista de QA.', '2025-02-11', 9);
