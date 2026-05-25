# AgendaFácil - Acessando PostgreSQL via CMD

## 🚀 1. Subir o Docker
```bash
docker compose up -d
```

---

## ✅ 2. Verificar containers rodando
```bash
docker ps
```

Deve aparecer:
```txt
agendafacil-postgres
```

---

## 🐳 3. Entrar no container PostgreSQL
```bash
docker exec -it agendafacil-postgres bash
```

---

## 🗄️ 4. Entrar no banco PostgreSQL
```bash
psql -U admin -d agendafacil
```

---

# 📋 Comandos úteis PostgreSQL
## Ver tabelas

```sql
\dt
```

---

## Ver bancos existentes
```sql
\l
```

---

## Ver estrutura da tabela users
```sql
\d users
```

---

## Consultar usuários
```sql
SELECT * FROM users;
```

---

## Sair do PostgreSQL
```sql
\q
```

---

## Sair do container
```bash
exit
```

---

# ⚡ Acesso direto ao PostgreSQL
Sem entrar no bash do container:

```bash
docker exec -it agendafacil-postgres psql -U admin -d agendafacil
```
