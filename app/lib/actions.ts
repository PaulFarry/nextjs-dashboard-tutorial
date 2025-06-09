"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { openDatabase } from "./database";
import { redirect } from "next/navigation";
import { log } from "console";

const sql = openDatabase();

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = Math.round((Math.round(amount * 100) / 100) * 100); // Convert to cents

  const date = new Date().toISOString().split("T")[0];

  console.info("Creating invoice with data:", {
    customerId,
    amountInCents
  });

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
