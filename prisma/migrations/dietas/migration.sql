CREATE TABLE "refeicao" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataHora" TIMESTAMP NOT NULL,
    "dentroDieta" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    

    CONSTRAINT "refeicao_pkey" PRIMARY KEY ("id")
);