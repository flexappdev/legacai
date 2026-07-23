import { redirect } from "next/navigation";

export default function VaultRoot() {
  redirect("/vault/agent");
}
