import db from "@/lib/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      // Updating landlord_id to NULL before deleting the user, i did so since i was getting error before
      await db.execute(
        "UPDATE properties SET landlord_id = NULL WHERE landlord_id = ?",
        [id]
      );
      const [result] = await db.execute("DELETE FROM users WHERE user_id = ?", [
        id,
      ]);

      // Checking if delete affected any rows
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete user" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
