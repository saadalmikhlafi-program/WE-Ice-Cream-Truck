import { redirect } from "next/navigation";

export default function RedirectToBookPage() {
  redirect("/book");
}
