import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash da senha (Admin@123)
  const hashedPassword = await hash('Admin@123', 8);

  // Criar usuário admin
// Primeiro cria o usuário
const admin = await prisma.user.upsert({
  where: { email: 'admin@example.com' },
  update: {},
  create: {
    email: 'admin@example.com',
    name: 'Administrador',
    password: hashedPassword,
    birthDate: new Date('1990-01-01'),
    cpf: '12345678901',
  }
});

// Depois cria as permissões
await prisma.permissions.upsert({
  where: { userId: admin.id },
  update: {
    canAdopt: true,
    canSponsor: true,
    canAdmin: true
  },
  create: {
    userId: admin.id,
    canAdopt: true,
    canSponsor: true,
    canAdmin: true
  }
});
  console.log({ admin });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });