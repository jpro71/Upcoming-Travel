export async function deleteTripDocument(id: number): Promise<void> {
  const response = await fetch(`/api/documents/delete/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? "Unable to delete document.");
  }
}