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

-- INSERT INTO usuario (nome, email, senha, tipo, data_cadastro) VALUES
-- ('Ana Santos', 'ana.santos@email.com', 'senhaAna123', 'Estudante', '2024-01-15'),
-- ('Bruno Oliveira', 'bruno.oliveira@email.com', 'brunoPass12', 'Estudante', '2024-02-10'),
-- ('Carla Mendes', 'carla.mendes@email.com', 'carlaM2024', 'Estudante', '2024-03-05'),
-- ('Diego Ribeiro', 'diego.ribeiro@email.com', 'diegorib2024', 'Estudante', '2024-04-20'),
-- ('Érika Carvalho', 'erika.carvalho@email.com', 'erikaC@2024', 'Estudante', '2024-05-12'),
-- ('Fábio Lima', 'fabio.lima@email.com', 'fabioLima20', 'Estudante', '2024-06-18'),
-- ('Gabriela Ferreira', 'gabriela.ferreira@email.com', 'gabFerreira', 'Estudante', '2024-07-22'),
-- ('Lucas Andrade', 'lucas.andrade@email.com', 'lucasAndr12', 'Estudante', '2024-08-30'),
-- ('Mariana Souza', 'mariana.souza@email.com', 'mariSouza19', 'Estudante', '2024-09-14'),
-- ('Pedro Martins', 'pedro.martins@email.com', 'pedroM2024', 'Estudante', '2024-10-01'),
-- ('Juliana Costa', 'juliana.costa@email.com', 'julianaC123', 'Recrutador', '2024-11-11'),
-- ('Rafael Gomes', 'rafael.gomes@email.com', 'rafaelG@2024', 'Especialista', '2024-12-05'),
-- ('Patrícia Nunes', 'patricia.nunes@email.com', 'patyNunes20', 'Estudante', '2025-01-09'),
-- ('Thiago Barbosa', 'thiago.barbosa@email.com', 'thiagoBpass', 'Recrutador', '2025-02-17'),
-- ('Fernanda Alves', 'fernanda.alves@email.com', 'fernandaA12', 'Especialista', '2025-03-21'),
-- ('Rodrigo Alves', 'rodrigo.alves@email.com', 'rodrigoA2025', 'Recrutador', '2025-04-10'),
-- ('Simone Batista', 'simone.batista@email.com', 'simoneBpass', 'Recrutador', '2025-05-02'),
-- ('André Cunha', 'andre.cunha@email.com', 'andreCunha19', 'Especialista', '2025-05-15'),
-- ('Luciana Prado', 'luciana.prado@email.com', 'lucianaP@2025', 'Especialista', '2025-05-09'),
-- ('Marcelo Tavares', 'marcelo.tavares@email.com', 'marceloT123', 'Recrutador', '2025-05-12'),
-- ('Sofia Martins', 'sofia.martins@email.com', 'sofiaM2025', 'Estudante', '2025-06-15'),
-- ('Henrique Duarte', 'henrique.duarte@email.com', 'henriqueD2025', 'Recrutador', '2025-06-01'),
-- ('Gustavo Almeida', 'gustavo.almeida@email.com', 'gustavoApass', 'Estudante', '2025-06-17'),
-- ('Isabela Rocha', 'isabela.rocha@email.com', 'isabelaRpass', 'Recrutador', '2025-06-03'),
-- ('Beatriz Silva', 'beatriz.silva@email.com', 'biaSilva123', 'Estudante', '2025-06-19'),
-- ('Maurício Pires', 'mauricio.pires@email.com', 'mauricioP123', 'Recrutador', '2025-06-05'),
-- ('Natália Correia', 'natalia.correia@email.com', 'natCorreia20', 'Recrutador', '2025-06-07'),
-- ('Felipe Barros', 'felipe.barros@email.com', 'felipeB@2025', 'Recrutador', '2025-06-09'),
-- ('Camila Teixeira', 'camila.teixeira@email.com', 'camilaT2025', 'Recrutador', '2025-06-11'),
-- ('Renato Moreira', 'renato.moreira@email.com', 'renatoMpass', 'Recrutador', '2025-06-13');


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

-- INSERT INTO vaga(titulo, nome_empresa, descricao, tipo, requisitos, salario,data_publicacao, fk_id_usuario_recrutador) VALUES
-- ('Desenvolvedor Front-end', 'Tech Solutions', 'Responsável por desenvolver interfaces modernas e funcionais, garantindo a melhor experiência para o usuário. Atuará na construção e manutenção de aplicações web utilizando HTML, CSS, JavaScript e React, colaborando com a equipe para entregar soluções ágeis e de alta qualidade', 'Emprego', 'HTML, CSS, JavaScript., React', '5000.00', '2026-01-02', 11),
-- ('Analista de Dados', 'DataCorp', 'Responsável por coletar, organizar e interpretar grandes volumes de informações, transformando dados em insights estratégicos para apoiar a tomada de decisão. Atuará na criação de relatórios e dashboards com Power BI, além de desenvolver análises utilizando SQL e Python para otimizar processos e gerar valor para o negócio.', 'Emprego', 'SQL, Python, Power BI', '6500.00', '2026-01-05', 14),
-- ('Engenheiro de DevOps', 'CloudOps', 'Responsável por implementar e gerenciar pipelines de CI/CD, garantindo a automação e eficiência dos processos de desenvolvimento. Atuará na administração de ambientes em containers com Docker e Kubernetes, promovendo escalabilidade, segurança e alta disponibilidade das aplicações.', 'Emprego', 'CI/CD, Docker, Kubernetes', '10000.00', '2026-01-17', 16),
-- ('Desenvolvedor Back-end (Node.js)', 'Remote Solutions', 'Responsável por projetar e implementar soluções robustas no lado do servidor, garantindo desempenho, segurança e escalabilidade das aplicações. Atuará no desenvolvimento de APIs e serviços utilizando Node.js e Express, além de trabalhar com bancos de dados relacionais (SQL) e não relacionais (NoSQL) para atender às necessidades do negócio.', 'Emprego', 'Node.js, Express, SQL/NoSQL', '7000.00', '2026-02-01', 17),
-- ('Engenheiro de Machine Learning', 'AI Labs', 'Responsável por desenvolver e implementar modelos de aprendizado de máquina, aplicando técnicas avançadas para resolver problemas complexos e gerar valor estratégico. Atuará na criação e otimização de algoritmos utilizando Python e TensorFlow, além de aplicar práticas de MLOps para garantir escalabilidade, automação e confiabilidade em ambientes de produção.', 'Emprego', 'Python, TensorFlow, MLOps', '12000.00', '2026-02-11', 20),
-- ('Especialista em Segurança da Informação', 'SecurityTech', 'Responsável por identificar vulnerabilidades e garantir a proteção dos sistemas e dados da organização. Atuará na realização de testes de intrusão (pentest), monitoramento de eventos de segurança por meio de soluções SIEM e implementação de práticas de segurança em ambientes de nuvem, assegurando conformidade e resiliência contra ameaças.', 'Emprego', 'Pentest, SIEM, Cloud Security', '11000.00', '2026-02-28', 22),
-- ('Engenheiro de Dados', 'Tech Solutions', 'Responsável por projetar, desenvolver e otimizar pipelines de dados, garantindo a integração eficiente entre diferentes fontes e sistemas. Atuará na construção de processos de ETL, utilização de frameworks como Spark para processamento distribuído e orquestração de fluxos com Airflow, assegurando qualidade, escalabilidade e confiabilidade das informações.', 'Emprego', 'Spark, Airflow, ETL', '9000.00', '2026-03-06', 24),
-- ('UX/UI Designer', 'Creative Studio', 'Responsável por criar interfaces intuitivas e atraentes, alinhando estética e funcionalidade para oferecer a melhor experiência ao usuário. Atuará no desenvolvimento de protótipos e fluxos de navegação utilizando Figma, além de conduzir pesquisas com usuários para validar soluções e aprimorar produtos digitais.', 'Emprego', 'Figma, Prototipação, Pesquisa', '6500.00', '2026-03-14', 26),
-- ('Arquiteto de Software', 'Tech Architects', 'Responsável por definir e evoluir a arquitetura de sistemas complexos, garantindo escalabilidade, desempenho e segurança. Atuará na modelagem de soluções baseadas em microservices, utilização de plataformas em nuvem e aplicação de práticas de Domain-Driven Design (DDD) para alinhar tecnologia às necessidades do negócio.', 'Emprego', 'Microservices, Cloud, DDD', '15000.00', '2026-03-25', 27),
-- ('Estágio em Desenvolvimento Web', 'Remote Solutions', 'Oportunidade para estudantes interessados em iniciar carreira na área de desenvolvimento web. Atuará no apoio à criação e manutenção de páginas e aplicações, utilizando noções de HTML, CSS e JavaScript. Terá contato com boas práticas de programação e desenvolvimento, contribuindo para projetos reais e adquirindo experiência prática.', 'Estágio', 'HTML, CSS, JavaScript (noções)', '1200.00', '2026-04-04', 28),
-- ('Estágio em Suporte de TI', 'HelpDesk Co.', 'Oportunidade para estudantes interessados em iniciar carreira na área de tecnologia. Atuará no suporte a usuários, auxiliando na resolução de problemas relacionados a sistemas operacionais Windows, redes básicas e atendimento técnico. Terá contato direto com boas práticas de suporte e infraestrutura, adquirindo experiência prática em ambiente corporativo.', 'Estágio', 'Windows, redes básicas, atendimento ao usuário', '1000.00', '2026-04-15', 29),
-- ('Estágio em QA / Testes', 'Tech Solutions', 'Oportunidade para estudantes interessados em iniciar carreira na área de qualidade de software. Atuará na execução de testes manuais, elaboração de relatórios e identificação de falhas, contribuindo para a melhoria contínua dos sistemas. É essencial ter atenção a detalhes e disposição para aprender boas práticas de QA em ambiente corporativo.', 'Estágio', 'Testes manuais, relatórios, atenção a detalhes', '1300.00', '2026-04-27', 30);


CREATE TABLE candidatura (
    id_candidatura INT AUTO_INCREMENT PRIMARY KEY,
    data_candidatura DATE DEFAULT CURRENT TIMESTAMP,
    fk_id_usuario_estudante INT NOT NULL,
    fk_id_vaga INT NOT NULL,
    FOREIGN KEY (fk_id_usuario_estudante) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_id_vaga) REFERENCES vaga(id_vaga)
);

-- INSERT INTO candidatura(data_candidatura, fk_id_usuario_estudante, fk_id_vaga) VALUES
-- ('2026-01-28', 10, 1),
-- ('2026-01-15', 13, 2),
-- ('2026-02-03', 21, 3),
-- ('2026-02-20', 23, 4),
-- ('2026-03-01', 25, 5);

CREATE TABLE depoimento (
    id_depoimento INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(700) NOT NULL,
    data_depoimento DATE DEFAULT CURRENT TIMESTAMP,
    fk_id_usuario_estudante INT NOT NULL,
    FOREIGN KEY (fk_id_usuario_estudante) REFERENCES usuario(id_usuario)
);

-- INSERT INTO depoimento(texto, data_depoimento, fk_id_usuario_estudante) VALUES
-- ('Encontrei meu primeiro estágio em Front-end usando as vagas do site. Foi uma experiência transformadora — aprendi muito e fui efetivada depois de 6 meses.', '2024-08-12', 1),
-- ('Com a orientação das vagas direcionadas, consegui uma posição júnior em backend. O processo seletivo foi ágil e transparente.', '2025-01-22', 2),
-- ('Fiz contato com empresas na área de dados e, em menos de um mês, fui chamado para entrevista. Hoje trabalho como Analista de Dados.', '2024-11-05', 3),
-- ('Plataforma com ótimas vagas e filtros inteligentes — encontrei um emprego remoto em engenharia de software que mudou minha rotina.', '2024-10-30', 4),
-- ('O suporte e as dicas de currículo foram essenciais. Consegui um estágio em UX/UI e já estou trabalhando em projetos reais.', '2025-03-14', 5),
-- ('A curadoria de vagas para iniciantes fez toda a diferença. Passei de freelancer para CLT em uma empresa que admiro.', '2025-01-18', 6),
-- ('Usei as dicas de currículo e a plataforma para encontrar vagas alinhadas ao meu perfil. Em duas semanas, fui chamado para entrevista e hoje sou Dev Junior.', '2025-07-02', 7),
-- ('As vagas remotas facilitavam conciliar meus estudos. Consegui um estágio em Data Science e aprendi a trabalhar com projetos reais.', '2024-12-10', 8),
-- ('A plataforma tinha várias oportunidades para quem busca transição de carreira. Passei de suporte técnico para Analista de QA.', '2025-02-11', 9);
