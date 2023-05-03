-- CreateTable
CREATE TABLE "beta" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beta_pkey" PRIMARY KEY ("id","email")
);

-- CreateIndex
CREATE UNIQUE INDEX "beta_id_key" ON "beta"("id");

-- CreateIndex
CREATE UNIQUE INDEX "beta_email_key" ON "beta"("email");
